import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import BottomCtaBand from "@/components/marketing/BottomCtaBand";
import { blogPosts } from "@/lib/content/blog";

export const metadata: Metadata = {
  title: "Blog | NutriPath Canada",
  description:
    "Practical guidance on the KCAT and the KCAT Bootcamp for internationally educated dietitians, from NutriPath.",
};

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      {/* Hero */}
      <section className="bg-offwhite py-16 sm:py-24">
        <div className="container-page">
          <p className="font-body text-sm font-semibold uppercase tracking-wide text-primary">
            Our blog
          </p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold text-charcoal sm:text-5xl">
            Insights for your KCAT journey.
          </h1>
          <p className="mt-4 max-w-xl font-body text-lg leading-relaxed text-mid">
            Practical guidance from NutriPath, for internationally educated
            dietitians navigating the KCAT and the path to registration.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-page">
          {/* Featured post */}
          {featured && (
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid overflow-hidden rounded-3xl border border-[#E5E7E0] bg-white shadow-sm transition-all duration-300 hover:shadow-xl lg:grid-cols-2"
              >
                <div className="relative min-h-[260px]">
                  <Image
                    src={featured.thumbnail}
                    alt={featured.thumbnailAlt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-4 p-8 sm:p-10">
                  <span className="inline-flex w-fit items-center rounded-full bg-sage px-2.5 py-1 font-body text-xs font-semibold text-primary">
                    Featured &middot; {featured.category}
                  </span>
                  <h2 className="font-heading text-2xl font-bold leading-snug text-charcoal transition-colors group-hover:text-primary sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="font-body text-base leading-relaxed text-mid">
                    {featured.summary}
                  </p>
                  <div className="mt-auto flex items-center gap-2 font-body text-sm text-mid">
                    <span className="font-semibold text-charcoal">
                      {featured.author}
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{featured.publishedAt}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{featured.readingTime}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Remaining posts */}
          {rest.length > 0 && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, index) => (
                <Reveal key={post.slug} delay={index * 80}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#E5E7E0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={post.thumbnail}
                        alt={post.thumbnailAlt}
                        fill
                        sizes="(min-width: 1024px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <span className="inline-flex w-fit items-center rounded-full bg-sage px-2.5 py-1 font-body text-xs font-semibold text-primary">
                        {post.category}
                      </span>
                      <h3 className="font-heading text-lg font-bold leading-snug text-charcoal transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="line-clamp-2 flex-1 font-body text-sm leading-relaxed text-mid">
                        {post.summary}
                      </p>
                      <div className="flex items-center gap-2 font-body text-xs text-mid">
                        <span className="font-semibold text-charcoal">
                          {post.author}
                        </span>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.publishedAt}</span>
                        <span aria-hidden="true">&middot;</span>
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <BottomCtaBand />
    </>
  );
}
