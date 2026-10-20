import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getJson } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { CaseHead } from "@/components/ui/CaseHead";
import { DevTodo } from "@/components/ui/DevTodo";
import { SITE } from "@/lib/site";

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
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 md:py-14">
      <CaseHead as="h1" title={d.title} />
      <p className="mt-4 inline-block rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold text-accentink">{d._status}</p>
      <div className="prose-clinic mt-8">
        {d.sections.map((s) => (
          <section key={s.h}>
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
