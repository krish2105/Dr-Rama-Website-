import { notFound } from "next/navigation";

// Any unknown path under a language renders the branded not-found page (inside the normal header and footer).
export default function CatchAll() {
  notFound();
}
