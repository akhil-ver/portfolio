import * as React from "react";

const ADMIN_STORAGE_KEY = "portfolio-admin-session";
const DEFAULT_ADMIN_USERNAME =
  import.meta.env.VITE_ADMIN_USERNAME || "akhilv.verma07@gmail.com";
const DEFAULT_ADMIN_PASSWORD =
  import.meta.env.VITE_ADMIN_PASSWORD || "Akhil@123";

type AdminContextValue = {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const AdminContext = React.createContext<AdminContextValue | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const saved = window.localStorage.getItem(ADMIN_STORAGE_KEY);
    setIsAdmin(saved === "true");
  }, []);

  const login = React.useCallback((username: string, password: string) => {
    const isValid =
      username === DEFAULT_ADMIN_USERNAME && password === DEFAULT_ADMIN_PASSWORD;

    if (isValid) {
      window.localStorage.setItem(ADMIN_STORAGE_KEY, "true");
      setIsAdmin(true);
    }

    return isValid;
  }, []);

  const logout = React.useCallback(() => {
    window.localStorage.removeItem(ADMIN_STORAGE_KEY);
    setIsAdmin(false);
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = React.useContext(AdminContext);

  if (!context) {
    throw new Error("useAdmin must be used inside AdminProvider");
  }

  return context;
}

export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAdmin();

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}
