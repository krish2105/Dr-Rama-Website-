import { isDev } from "@/lib/site";

/** Visible in development only. Production never renders a placeholder fact. */
export function DevTodo({ children }: { children: React.ReactNode }) {
  if (!isDev) return null;
  return (
    <div className="dev-todo" role="note">
      <strong>TODO (dev only): </strong>
      {children}
    </div>
  );
}
