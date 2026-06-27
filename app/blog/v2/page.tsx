import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import EmailCaptureForm from "@/components/ui/EmailCaptureForm";
import BottomCtaBand from "@/components/marketing/BottomCtaBand";
import { blogPosts } from "@/lib/content/blog";
import { ClipboardCheckIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Blog | NutriPath Canada",
  description:
    "Practical guidance on the KCAT and the KCAT Bootcamp for internationally educated dietitians, from NutriPath.",
  robots: { index: false, follow: false },
};

export default function BlogV2Page() {
  return (
    <>
      {/* Hero */}
      <section className="bg-offwhite py-16 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: image + intro */}
          <div className="flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sage">
              <Image
                src="/images/illustrations/blog_hero.png"
                alt="A notebook reading 'KCAT Your Journey Starts Here' with a checklist: Understand the Process, Prepare Effectively, Register with Confidence, Build Your Career — beside a pen, coffee, and plants"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <p className="mt-8 font-body text-sm font-semibold uppercase tracking-wide text-primary">
              Our blog
            </p>
            <h1 className="mt-3 font-heading text-4xl font-extrabold text-charcoal sm:text-5xl">
              Insights for your KCAT journey.
            </h1>
            <p className="mt-4 max-w-md font-body text-lg leading-relaxed text-mid">
              Practical guidance from NutriPath, for internationally
              educated dietitians navigating the KCAT and the path to
              registration.
            </p>
          </div>

          {/* Right: latest posts + subscribe */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-wide text-primary">
                Latest posts
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {blogPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group flex items-start gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-sage text-primary">
                        <ClipboardCheckIcon className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block font-heading text-base font-bold text-charcoal transition-colors group-hover:text-primary">
                          {post.title}
                        </span>
                        <span className="mt-1 block font-body text-xs text-mid">
                          {post.publishedAt} &middot; {post.readingTime}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-6">
              <h2 className="font-heading text-lg font-bold text-charcoal">
                Stay in the loop
              </h2>
              <p className="mt-1.5 font-body text-sm text-mid">
                Get notified when we publish something new for KCAT and
                CDRE candidates.
              </p>
              <EmailCaptureForm ctaLabel="Subscribe" className="mt-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Full post list */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              All posts
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {blogPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 80}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col gap-3 rounded-3xl border border-[#E5E7E0] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="inline-flex w-fit items-center rounded-full bg-sage px-2.5 py-1 font-body text-xs font-semibold text-primary">
                    {post.category}
                  </span>
                  <h3 className="font-heading text-lg font-bold leading-snug text-charcoal transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-mid">
                    {post.summary}
                  </p>
                  <div className="mt-auto flex items-center gap-2 font-body text-xs text-mid">
                    <span className="font-semibold text-charcoal">
                      {post.author}
                    </span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.publishedAt}</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readingTime}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BottomCtaBand />
    </>
  );
}
