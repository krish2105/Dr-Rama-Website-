import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import aboutEn from "../../content/en/about.json";
import aboutHi from "../../content/hi/about.json";

export type About = typeof aboutEn;

export function getAbout(locale: string): About {
  return locale === "hi" ? (aboutHi as About) : aboutEn;
}


export type Post = { slug: string; title: string; description: string; date: string; status: string; body: string };

const BLOG_DIR = (locale: string) => path.join(process.cwd(), "content", "blog", locale === "hi" ? "hi" : "en");

export function getPosts(locale: string): Post[] {
  const dir = BLOG_DIR(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return {
        slug: f.replace(/\.mdx$/, ""),
        title: String(data.title),
        description: String(data.description ?? ""),
        date: String(data.date ?? ""),
        status: String(data.status ?? ""),
        body: content,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(locale: string, slug: string): Post | undefined {
  return getPosts(locale).find((p) => p.slug === slug);
}

export function getJson<T>(locale: string, name: "faq" | "privacy"): T {
  const file = path.join(process.cwd(), "content", locale === "hi" ? "hi" : "en", `${name}.json`);
  return JSON.parse(fs.readFileSync(file, "utf8")) as T;
}
