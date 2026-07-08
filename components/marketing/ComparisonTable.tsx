export type ComparisonPlan = {
  name: string;
  designedFor: string;
  exam: string;
  format: string;
  price: string;
  notForYouIf: string;
};

const ROWS: { key: keyof Omit<ComparisonPlan, "name">; label: string }[] = [
  { key: "designedFor", label: "Designed for" },
  { key: "exam", label: "Exam" },
  { key: "format", label: "Format" },
  { key: "price", label: "Price + plan" },
  { key: "notForYouIf", label: "NOT for you if…" },
];

export default function ComparisonTable({ plans }: { plans: ComparisonPlan[] }) {
  return (
    <>
      {/* Mobile / tablet: one card per plan (a wide table doesn't fit a phone screen) */}
      <div className="flex flex-col gap-4 lg:hidden">
        {plans.map((plan) => (
          <div key={plan.name} className="rounded-2xl border border-[#E5E7E0] bg-white p-5">
            <p className="font-heading text-base font-bold text-charcoal">
              {plan.name}
            </p>
            <dl className="mt-3 flex flex-col gap-3">
              {ROWS.map((row) => (
                <div key={row.key}>
                  <dt className="font-body text-xs font-semibold uppercase tracking-wide text-primary">
                    {row.label}
                  </dt>
                  <dd className="mt-0.5 font-body text-sm text-charcoal">
                    {plan[row.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Desktop: full table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-[#E5E7E0] lg:block">
        <table className="w-full min-w-[860px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E5E7E0] bg-offwhite">
              <th scope="col" className="px-6 py-4 font-heading text-sm font-bold text-charcoal">
                &nbsp;
              </th>
              {plans.map((plan) => (
                <th
                  key={plan.name}
                  scope="col"
                  className="px-6 py-4 font-heading text-sm font-bold text-charcoal"
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.key} className="border-b border-[#E5E7E0] last:border-0">
                <th
                  scope="row"
                  className="whitespace-nowrap bg-offwhite/60 px-6 py-4 font-body text-sm font-semibold text-charcoal"
                >
                  {row.label}
                </th>
                {plans.map((plan) => (
                  <td
                    key={plan.name}
                    className="px-6 py-4 font-body text-sm leading-relaxed text-mid"
                  >
                    {plan[row.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
