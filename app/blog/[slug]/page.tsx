import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/ui/Reveal";
import BlogPostBody from "@/components/marketing/blog/BlogPostBody";
import BottomCtaBand from "@/components/marketing/BottomCtaBand";
import { blogPosts } from "@/lib/content/blog";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | NutriPath Blog`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.summary,
            author: { "@type": "Organization", name: post.author },
            datePublished: post.publishedAt,
          }),
        }}
      />

      <section className="bg-offwhite py-16 sm:py-24">
        <div className="container-page mx-auto max-w-2xl">
          <p className="font-body text-sm text-mid">
            <Link href="/blog" className="underline hover:text-primary">
              Blog
            </Link>{" "}
            / {post.category}
          </p>
          <span className="mt-5 inline-flex w-fit items-center rounded-full bg-sage px-2.5 py-1 font-body text-xs font-semibold text-primary">
            {post.category}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-extrabold leading-snug text-charcoal sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-5 flex items-center gap-2 font-body text-sm text-mid">
            <span className="font-semibold text-charcoal">{post.author}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{post.publishedAt}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container-page mx-auto max-w-2xl">
          <Reveal>
            <BlogPostBody sections={post.body} />
          </Reveal>

          <Reveal className="mt-14 rounded-3xl border-2 border-primary bg-white p-8 text-center">
            <p className="font-heading text-xl font-bold text-charcoal">
              Ready to put this into practice?
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-mid">
              The KCAT Bootcamp walks through exactly this kind of
              preparation live, with a registered dietitian.
            </p>
            <a
              href="/kcat-bootcamp"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-forest"
            >
              Explore the KCAT Bootcamp
            </a>
          </Reveal>
        </div>
      </section>

      <BottomCtaBand />
    </>
  );
}
