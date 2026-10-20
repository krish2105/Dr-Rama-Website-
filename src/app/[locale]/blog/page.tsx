import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { pageMeta } from "@/lib/meta";
import { getPosts } from "@/lib/content";
import Image from "next/image";
import { CaseHead } from "@/components/ui/CaseHead";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return pageMeta(locale, "/blog", t("title"), { description: t("lead") });
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getPosts(locale);
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 md:py-14">
      <CaseHead as="h1" title={t("title")} />
      <p className="mt-6 text-lg text-muted">{t("lead")}</p>
      {posts.length === 0 ? <div className="mt-8 text-center"><Image src="/art/empty-clipboard.webp" alt="" width={104} height={104} className="mx-auto mb-3 h-24 w-24" /><p>{t("none")}</p></div> : (
        <ul className="mt-8 space-y-5">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="card block p-6 transition-transform hover:-translate-y-0.5">
                {p.status === "DRAFT" ? <span className="mb-2 inline-block rounded-full bg-accent/15 px-3 py-0.5 text-xs font-semibold text-accentink">{t("draftTag")}</span> : null}
                <h2 className="text-2xl font-semibold text-primary">{p.title}</h2>
                <p className="mt-2 text-muted">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
