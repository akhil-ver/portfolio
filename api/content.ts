const CONTENT_KEY = "portfolio-content-v1";

type PortfolioContent = Record<string, string>;

function getKvConfig() {
  const url =
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    "";
  const token =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    "";

  return { url, token };
}

function isAuthorized(username: unknown, password: unknown) {
  const adminUsername =
    process.env.ADMIN_USERNAME ||
    process.env.VITE_ADMIN_USERNAME ||
    "akhilv.verma07@gmail.com";
  const adminPassword =
    process.env.ADMIN_PASSWORD ||
    process.env.VITE_ADMIN_PASSWORD ||
    "Akhil@123";

  return username === adminUsername && password === adminPassword;
}

async function kvCommand(command: unknown[]) {
  const { url, token } = getKvConfig();

  if (!url || !token) {
    throw new Error("KV storage is not configured.");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) {
    throw new Error(`KV request failed with status ${response.status}.`);
  }

  return response.json();
}

async function readContent(): Promise<PortfolioContent> {
  const data = await kvCommand(["GET", CONTENT_KEY]);
  const result = data?.result;

  if (!result) {
    return {};
  }

  if (typeof result === "string") {
    return JSON.parse(result);
  }

  return result;
}

async function writeContent(content: PortfolioContent) {
  await kvCommand(["SET", CONTENT_KEY, JSON.stringify(content)]);
}

export default async function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store");

  try {
    if (req.method === "GET") {
      const content = await readContent();
      res.status(200).json({ content });
      return;
    }

    if (req.method === "POST") {
      const { username, password, key, value, remove } = req.body || {};

      if (!isAuthorized(username, password)) {
        res.status(401).json({ error: "Unauthorized admin credentials." });
        return;
      }

      if (typeof key !== "string" || !key) {
        res.status(400).json({ error: "A storage key is required." });
        return;
      }

      const content = await readContent();

      if (remove) {
        delete content[key];
      } else if (typeof value === "string") {
        content[key] = value;
      } else {
        res.status(400).json({ error: "A string value is required." });
        return;
      }

      await writeContent(content);
      res.status(200).json({ ok: true });
      return;
    }

    res.setHeader("Allow", "GET, POST");
    res.status(405).json({ error: "Method not allowed." });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    res.status(500).json({ error: message });
  }
}
