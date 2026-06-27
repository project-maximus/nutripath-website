import EmailCaptureForm from "@/components/ui/EmailCaptureForm";
import { LeafIcon } from "@/components/ui/icons";

export default function BottomCtaBand() {
  return (
    <section id="waitlist" className="bg-forest py-20 sm:py-28">
      <div className="container-page">
        <h2 className="sr-only">Join the founding cohort or waitlist</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-primary bg-white/5 p-8">
            <h3 className="flex items-center gap-2 font-heading text-lg font-bold text-white">
              <LeafIcon className="h-4 w-4 flex-shrink-0" />
              Founding Cohort — September 2026 CDRE Pilot
            </h3>
            <p className="flex-1 font-body text-sm leading-relaxed text-white/70">
              Be among the first 25 members. Founding pricing. Direct input
              into the platform. Your name in the story.
            </p>
            <a
              href="https://app.nutripath.ca"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-center font-body text-sm font-semibold text-primary transition-colors hover:bg-sage"
            >
              Secure your founding spot →
            </a>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border-2 border-primary bg-white/5 p-8">
            <h3 className="font-heading text-lg font-bold text-white">
              KCAT Bootcamp — Mid–End July 2026
            </h3>
            <p className="font-body text-sm leading-relaxed text-white/70">
              Focused KCAT prep. Live sessions, community, mock KCAT, and a
              1-hour live session on how to answer practice questions,
              held at the end of the bootcamp.
            </p>
            <EmailCaptureForm
              ctaLabel="Join the KCAT waitlist"
              variant="dark"
              className="mt-auto"
            />
          </div>

          <div className="flex flex-col gap-4 rounded-2xl bg-white/5 p-8">
            <h3 className="font-heading text-lg font-bold text-white">
              Stay in the loop
            </h3>
            <p className="font-body text-sm leading-relaxed text-white/70">
              Get updates, early access, and launch-week founding member
              pricing delivered to your inbox.
            </p>
            <EmailCaptureForm
              ctaLabel="Join the email list"
              variant="dark"
              className="mt-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
