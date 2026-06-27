import type { BlogSection } from "@/lib/content/blog";

export default function BlogPostBody({ sections }: { sections: BlogSection[] }) {
  return (
    <div className="flex flex-col gap-5">
      {sections.map((section, index) => {
        if (section.type === "paragraph") {
          return (
            <p key={index} className="font-body text-base leading-relaxed text-mid">
              {section.text}
            </p>
          );
        }
        if (section.type === "heading") {
          return (
            <h2
              key={index}
              className="mt-4 font-heading text-2xl font-bold text-charcoal"
            >
              {section.text}
            </h2>
          );
        }
        if (section.type === "subheading") {
          return (
            <h3
              key={index}
              className="mt-2 font-heading text-lg font-bold text-charcoal"
            >
              {section.text}
            </h3>
          );
        }
        return (
          <ul key={index} className="flex flex-col gap-2.5">
            {section.items.map((item) => (
              <li key={item.label ?? item.text} className="flex gap-2.5">
                <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                <p className="font-body text-base leading-relaxed text-mid">
                  {item.label && (
                    <span className="font-semibold text-charcoal">
                      {item.label}:{" "}
                    </span>
                  )}
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        );
      })}
    </div>
  );
}
