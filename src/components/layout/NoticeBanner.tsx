"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import data from "../../../content/notices.json";
import { istNow } from "@/lib/slots";

type Notice = { id: string; textEn: string; textHi: string; from: string; to: string };
const pad = (n: number) => String(n).padStart(2, "0");

/** Floating notice under the header (closures, holiday hours). Content in content/notices.json. Dismiss lasts for the visit. */
export function NoticeBanner() {
  const locale = useLocale();
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const t = istNow();
    const today = `${t.y}-${pad(t.m)}-${pad(t.d)}`;
    const n = (data.notices as Notice[]).find((x) => x.from <= today && today <= x.to);
    let dismissed = false;
    try { dismissed = !!n && sessionStorage.getItem(`notice-${n.id}`) === "1"; } catch {}
    // Reading the clock and sessionStorage is browser-only, so it has to happen after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNotice(n && !dismissed ? n : null);
  }, []);

  if (!notice) return null;
  return (
    <div
      role="status"
      className="fixed inset-x-3 top-[4.6rem] z-[45] mx-auto flex max-w-2xl items-center gap-3 rounded-2xl border border-[#c9b98f] bg-[#f6ead7] bg-cover bg-center px-5 py-4 text-[#13203f] shadow-[var(--shadow-float)]"
      style={{ backgroundImage: "url(/art/notice-banner.webp)" }}
    >
      <p className="flex-1 text-center text-sm font-semibold">{locale === "hi" ? notice.textHi : notice.textEn}</p>
      <button
        type="button"
        aria-label={locale === "hi" ? "बंद करें" : "Dismiss"}
        onClick={() => { try { sessionStorage.setItem(`notice-${notice.id}`, "1"); } catch {} setNotice(null); }}
        className="press grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/70 text-lg"
      >
        ×
      </button>
    </div>
  );
}
