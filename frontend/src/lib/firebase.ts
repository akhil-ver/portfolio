export const db = null;
export const auth = null;
export const googleProvider = null;

export const signInWithGoogle = async () => {
  throw new Error("Firebase is no longer configured in this portfolio.");
};

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null,
) {
  const message = error instanceof Error ? error.message : String(error);
  throw new Error(
    JSON.stringify({
      error: message,
      operationType,
      path,
      note: "Firebase support has been removed from this portfolio.",
    }),
  );
}
