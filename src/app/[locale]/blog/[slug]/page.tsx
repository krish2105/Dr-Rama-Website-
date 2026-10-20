import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getPost, getPosts } from "@/lib/content";
import { CaseHead } from "@/components/ui/CaseHead";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => getPosts(locale).map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};
  const other = locale === "en" ? "hi" : "en";
  return {
    title: post.title,
    description: post.description,
    robots: post.status === "DRAFT" ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: `/${locale}/blog/${slug}`,
      languages: getPost(other, slug) ? { [locale]: `/${locale}/blog/${slug}`, [other]: `/${other}/blog/${slug}` } : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();
  const t = await getTranslations({ locale, namespace: "blog" });
  const c = await getTranslations({ locale, namespace: "common" });
  return (
    <article className="mx-auto max-w-2xl px-4 py-10 sm:px-6 md:py-14">
      <Link href="/blog" className="inline-flex min-h-12 items-center text-primary underline">← {t("back")}</Link>
      {post.status === "DRAFT" ? <p className="mt-2 inline-block rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold text-accentink">{c("draft")}</p> : null}
      <CaseHead as="h1" title={post.title} className="mt-3" />
      <div className="prose-clinic mt-8">
        <MDXRemote source={post.body} />
      </div>
    </article>
  );
}
