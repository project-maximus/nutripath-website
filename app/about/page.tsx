import type { Metadata } from "next";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import Reveal from "@/components/ui/Reveal";
import {
  AccessibilityIcon,
  CheckBadgeIcon,
  ChatIcon,
  UsersIcon,
  LeafIcon,
  LinkedInIcon,
  InstagramIcon,
  TrophyIcon,
} from "@/components/ui/icons";
import BottomCtaBand from "@/components/marketing/BottomCtaBand";

export const metadata: Metadata = {
  title: "About | NutriPath Canada",
  description:
    "NutriPath was built by a registered dietitian who sat the CDRE twice and decided future candidates deserved better. Meet the team and the mission behind the platform.",
};

const team = [
  {
    name: "Berin Arikan, MPH, RD",
    role: "CEO & Founder",
    bio: "Took the CDRE twice and built NutriPath so other candidates wouldn't have to navigate it alone. Leads product, content, and the mission to make exam prep accessible by design.",
  },
  {
    name: "Sylvia Sun",
    role: "RD Content Developer",
    bio: "Registered dietitian focused on building CDRE and KCAT content that's accurate, current, and genuinely useful on exam day.",
  },
  {
    name: "Kristine Brigino",
    role: "RD Content Developer",
    bio: "Registered dietitian who reviews and develops practice content so every question reflects what the real exam actually tests.",
  },
  {
    name: "Mirey",
    role: "Brand Ambassador",
    bio: "Helps NutriPath stay connected to the candidates and communities it's built for.",
  },
];

const stats = [
  { value: "26", label: "RDs per 100,000 Canadians" },
  { value: "70%", label: "of Ontarians without dietitian access in primary care" },
  { value: "775", label: "CDRE/KCAT candidates per year" },
  { value: "SDG 3·4·8·10", label: "Aligned with the UN Sustainable Development Goals" },
];

const values = [
  {
    icon: AccessibilityIcon,
    title: "Accessibility First",
    body: "Built toward WCAG 2.1 AA from day one — not retrofitted after launch.",
  },
  {
    icon: CheckBadgeIcon,
    title: "RD-Created Content",
    body: "Every piece of content is built or reviewed by registered dietitians who've sat the exams themselves.",
  },
  {
    icon: ChatIcon,
    title: "Honest Communication",
    body: "No fabricated pass rates, no guarantees. Just clear information about what preparation can realistically do.",
  },
  {
    icon: UsersIcon,
    title: "Community Over Competition",
    body: "We'd rather see every candidate succeed than compete over who studied the ‘right’ way.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[842px] items-center overflow-hidden py-16 sm:min-h-[1002px] sm:py-24 lg:min-h-[587px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-bright/30 blur-3xl" />
          <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-16 left-1/3 h-72 w-72 rounded-full bg-sage blur-3xl" />
        </div>

        <div className="container-page text-center">
          <Pill tone="glass" icon="leaf" className="mx-auto">
            About NutriPath
          </Pill>
          <h1 className="mx-auto mt-5 max-w-2xl font-heading text-5xl font-extrabold text-charcoal sm:text-6xl">
            Built from lived experience.
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed text-mid">
            NutriPath exists because someone who sat the CDRE twice, spent
            over $1,200 on prep that felt scattered and inaccessible,
            decided future candidates deserved better.
          </p>
        </div>
      </section>

      {/* Founder story */}
      <section className="py-20 sm:py-28">
        <Reveal className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-md lg:mx-0">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl shadow-xl">
              <Image
                src="/images/illustrations/Berin-Founder.jpg"
                alt="Berin Arikan, MPH, RD, founder of NutriPath, writing in a notebook beside her laptop while wearing a NutriPath t-shirt"
                fill
                sizes="(min-width: 1024px) 448px, 100vw"
                className="object-cover object-[78%_center]"
              />
            </div>
            <div className="absolute -bottom-6 left-4 max-w-[80%] rounded-2xl bg-white p-4 shadow-lg sm:left-8">
              <p className="font-body text-sm text-charcoal">
                &ldquo;Took the CDRE twice. Built this so you don&rsquo;t
                have to go through it alone.&rdquo;
              </p>
            </div>
          </div>

          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-wide text-primary">
              Founder & CEO
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Berin Arikan, MPH, RD
            </h2>
            <div className="mt-5 flex flex-col gap-4 font-body text-base leading-relaxed text-mid">
              <p>
                I sat the CDRE twice. The first time, I didn&rsquo;t pass
                — not because I didn&rsquo;t know the material, but because
                nothing about how I was studying matched how I actually
                learn. I&rsquo;m neurodiverse, and every resource I found
                assumed everyone processes information the same way.
              </p>
              <p>
                I spent over $1,200 on prep materials that felt scattered
                and inaccessible, weren&rsquo;t designed with accessibility
                in mind, and never explained why I was getting questions
                wrong — only that I was.
              </p>
              <p>
                The second time, I built my own system: multiple formats,
                flexible pacing, and a habit of asking why instead of just
                drilling more questions. I passed. And I couldn&rsquo;t
                stop thinking about everyone else still stuck where
                I&rsquo;d been.
              </p>
              <p className="font-medium text-charcoal">
                NutriPath is that system — created by registered
                dietitians, designed for accessibility from day one, and
                built on the belief that your career shouldn&rsquo;t be
                decided by how well the prep resources worked for someone
                else&rsquo;s brain.
              </p>
            </div>
          </div>

          <Reveal className="relative mt-12 overflow-hidden rounded-3xl bg-gradient-to-br from-sage via-white to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 lg:col-span-2 lg:mt-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-bright/30 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 left-1/4 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
            />

            <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:items-center">
              <div className="relative flex-shrink-0">
                <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-4 border-white shadow-lg sm:h-36 sm:w-36">
                  <Image
                    src="/images/illustrations/Berin_SICIEEIL.jpeg"
                    alt="Berin Arikan holding a $10,000 Impact Award cheque at the SICIEEIL LevelUP Pitch Competition 2026"
                    fill
                    sizes="144px"
                    className="object-cover object-top"
                  />
                </div>
                <span className="absolute -bottom-3 -right-3 flex h-12 w-12 items-center justify-center rounded-full bg-bright text-white shadow-md ring-4 ring-white">
                  <TrophyIcon className="h-6 w-6" />
                </span>
              </div>

              <div className="text-center sm:text-left">
                <p className="inline-flex items-center gap-1.5 font-body text-sm font-semibold uppercase tracking-wide text-primary">
                  <LeafIcon className="h-3.5 w-3.5" />
                  Proud Member of SICIEEIL
                </p>
                <p className="mt-1.5 font-heading text-2xl font-extrabold text-charcoal">
                  Winner — $10,000 Impact Award
                </p>
                <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-mid">
                  LevelUP Graduation &amp; Pitch Competition 2026, hosted by
                  the Sam Ibrahim Centre for Inclusive Excellence in
                  Entrepreneurship, Innovation &amp; Leadership at UTSC.
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                  <a
                    href="https://www.linkedin.com/posts/sicieeil_pitchcompetition-innovation-startups-activity-7465422301233299456-qdOo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-body text-sm font-semibold text-charcoal shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-md"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                    View on LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com/p/DY2KoCvkSX1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-body text-sm font-semibold text-charcoal shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-md"
                  >
                    <InstagramIcon className="h-4 w-4" />
                    View on Instagram
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Reveal>
      </section>

      {/* Team */}
      <section className="bg-offwhite py-20 sm:py-28">
        <div className="container-page">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Reveal>
                <p className="font-body text-sm font-semibold uppercase tracking-wide text-primary">
                  The team
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold text-charcoal sm:text-4xl">
                  Built by people who&rsquo;ve lived this.
                </h2>
                <p className="mt-3 font-body text-lg text-mid">
                  Registered dietitians and advocates who understand
                  exactly what the journey to registration feels like.
                </p>
              </Reveal>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {team.map((member, index) => (
                  <Reveal key={member.name} delay={index * 80}>
                    <div className="flex h-full flex-col items-center rounded-3xl bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage font-heading text-base font-bold text-primary">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </span>
                      <h3 className="mt-3 font-heading text-base font-bold text-charcoal">
                        {member.name}
                      </h3>
                      <p className="mt-1 font-body text-xs font-semibold uppercase tracking-wide text-primary">
                        {member.role}
                      </p>
                      <p className="mt-2.5 font-body text-sm leading-relaxed text-mid">
                        {member.bio}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal className="mx-auto w-full max-w-md lg:mx-0">
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="/images/illustrations/team.jpg"
                  alt="Three members of the NutriPath team standing together outdoors, wearing NutriPath t-shirts"
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & impact */}
      <section className="py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              Why this matters.
            </h2>
            <p className="mt-3 font-body text-lg text-mid">
              Canada has a real access gap — and the path to becoming an
              RD shouldn&rsquo;t be harder than it needs to be.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 80}>
                <div className="flex h-full flex-col items-center rounded-3xl border border-[#E5E7E0] bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <p className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-body text-sm text-mid">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-offwhite py-20 sm:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
              What we stand for.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.title} delay={index * 80}>
                  <div className="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-heading text-lg font-bold text-charcoal">
                      {value.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed text-mid">
                      {value.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <Reveal className="container-page mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold text-charcoal sm:text-4xl">
            Ready to start your CDRE prep?
          </h2>
          <p className="mt-3 font-body text-lg text-mid">
            Join the founding cohort, or explore the platform first.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-5">
            <Button href="https://app.nutripath.ca" external>
              Join the Founding Cohort
            </Button>
            <Button href="/cdre-prep" variant="secondary">
              Explore CDRE Prep
            </Button>
          </div>
        </Reveal>
      </section>

      <BottomCtaBand />
    </>
  );
}
