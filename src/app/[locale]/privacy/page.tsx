import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getJson } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { CaseHead } from "@/components/ui/CaseHead";
import { DevTodo } from "@/components/ui/DevTodo";
import { SITE } from "@/lib/site";
import { JumpTo } from "@/components/layout/JumpTo";

type Priv = { title: string; _status: string; sections: { h: string; p: string[] }[] };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMeta(locale, "/privacy", getJson<Priv>(locale, "privacy").title);
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const d = getJson<Priv>(locale, "privacy");
  const t = await getTranslations({ locale, namespace: "privacy" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 md:py-14">
      <CaseHead as="h1" title={d.title} />
      <JumpTo label={nav("jump")} items={d.sections.map((s, i) => ({ id: `p${i}`, label: s.h }))} />
      <div className="prose-clinic mt-8">
        {d.sections.map((s, i) => (
          <section key={s.h} id={`p${i}`} className="scroll-mt-24">
            <h2>{s.h}</h2>
            {s.p.map((x) => (x === "TODO_RETENTION" ? <DevTodo key={x}>{t("retentionTodo")}</DevTodo> : <p key={x}>{x}</p>))}
          </section>
        ))}
        <p>
          {t("contactLine")}{" "}
          <a href={`mailto:${SITE.email.value}`}>{SITE.email.value}</a>
        </p>
      </div>
    </div>
  );
}
