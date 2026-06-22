import Accordion, { type AccordionItem } from "@/components/ui/Accordion";
import Reveal from "@/components/ui/Reveal";

export default function FaqSection({ items }: { items: AccordionItem[] }) {
  return (
    <section className="bg-offwhite py-20 sm:py-28">
      <div className="container-page">
        <Reveal className="grid gap-10 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-2">
            <h2 className="font-heading text-4xl font-bold text-charcoal">
              FAQs
            </h2>
            <p className="mt-4 font-body text-lg text-mid">
              Everything you need to know about NutriPath.
            </p>
            <p className="mt-6 hidden font-body text-base text-mid md:block">
              Can&rsquo;t find what you&rsquo;re looking for? Reach out to
              our{" "}
              <a
                href="mailto:nutripathcanada@gmail.com"
                className="font-semibold text-primary hover:underline"
              >
                support team
              </a>{" "}
              for assistance.
            </p>
          </div>

          <div className="md:col-span-3">
            <Accordion items={items} variant="flat" revealAnswer />
          </div>

          <p className="font-body text-base text-mid md:hidden">
            Can&rsquo;t find what you&rsquo;re looking for? Contact our{" "}
            <a
              href="mailto:nutripathcanada@gmail.com"
              className="font-semibold text-primary hover:underline"
            >
              support team
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
