const API_URL = "/api/content";
const ADMIN_CREDENTIALS_KEY = "portfolio-admin-credentials";
const ADMIN_SESSION_KEY = "portfolio-admin-session";
const SYNC_PREFIXES = [
  "portfolio-",
  "overview-",
  "academics-",
  "analytics-",
  "resume-",
  "coding-analytics-",
  "clubs-",
  "contact-",
];
const PRIVATE_KEYS = new Set([ADMIN_SESSION_KEY, ADMIN_CREDENTIALS_KEY]);

type RemoteContent = Record<string, string>;

function shouldSyncKey(key: string) {
  return (
    !PRIVATE_KEYS.has(key) &&
    SYNC_PREFIXES.some((prefix) => key.startsWith(prefix))
  );
}

function getAdminCredentials() {
  try {
    const raw = window.sessionStorage.getItem(ADMIN_CREDENTIALS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function saveRemoteKey(key: string, value?: string, remove = false) {
  if (!shouldSyncKey(key)) {
    return;
  }

  const credentials = getAdminCredentials();

  if (!credentials?.username || !credentials?.password) {
    return;
  }

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...credentials,
        key,
        value,
        remove,
      }),
    });
  } catch {
    // Keep the local save even when the remote API is unavailable locally.
  }
}

export function storeAdminCredentials(username: string, password: string) {
  window.sessionStorage.setItem(
    ADMIN_CREDENTIALS_KEY,
    JSON.stringify({ username, password }),
  );
}

export function clearAdminCredentials() {
  window.sessionStorage.removeItem(ADMIN_CREDENTIALS_KEY);
}

export async function initializeRemoteStorage() {
  if (!window.localStorage || window.localStorage.__remotePortfolioPatched) {
    return;
  }

  try {
    const response = await fetch(API_URL, { cache: "no-store" });

    if (response.ok) {
      const data = (await response.json()) as { content?: RemoteContent };
      Object.entries(data.content || {}).forEach(([key, value]) => {
        if (shouldSyncKey(key) && typeof value === "string") {
          window.localStorage.setItem(key, value);
        }
      });
    }
  } catch {
    // The app still works with local browser storage during local development.
  }

  const originalSetItem = Storage.prototype.setItem;
  const originalRemoveItem = Storage.prototype.removeItem;

  Storage.prototype.setItem = function setItem(key: string, value: string) {
    originalSetItem.call(this, key, value);

    if (this === window.localStorage) {
      void saveRemoteKey(key, value);
    }
  };

  Storage.prototype.removeItem = function removeItem(key: string) {
    originalRemoveItem.call(this, key);

    if (this === window.localStorage) {
      void saveRemoteKey(key, undefined, true);
    }
  };

  window.localStorage.__remotePortfolioPatched = true;
}
