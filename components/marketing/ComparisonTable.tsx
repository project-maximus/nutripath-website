export type ComparisonRow = {
  feature: string;
  nutripath: boolean | string;
  alternatives: boolean | string;
};

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="font-heading text-lg font-bold text-primary" aria-label="Yes">
        ✓
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="font-heading text-lg font-bold text-mid" aria-label="No">
        ✗
      </span>
    );
  }
  return <span className="font-body text-sm text-charcoal">{value}</span>;
}

export default function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  return (
    <>
      {/* Mobile / tablet: stacked cards (a 3-column table doesn't fit a phone screen) */}
      <div className="flex flex-col gap-3 sm:hidden">
        {rows.map((row) => (
          <div
            key={row.feature}
            className="rounded-2xl border border-[#E5E7E0] p-4"
          >
            <p className="font-heading text-sm font-bold text-charcoal">
              {row.feature}
            </p>
            <div className="mt-3 flex gap-3">
              <div className="flex-1 rounded-xl bg-sage p-3">
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-primary">
                  NutriPath
                </p>
                <div className="mt-1">
                  <Cell value={row.nutripath} />
                </div>
              </div>
              <div className="flex-1 rounded-xl bg-offwhite p-3">
                <p className="font-body text-xs font-semibold uppercase tracking-wide text-mid">
                  Alternatives
                </p>
                <div className="mt-1">
                  <Cell value={row.alternatives} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: full table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-[#E5E7E0] sm:block">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E5E7E0]">
              <th scope="col" className="px-6 py-4 font-heading text-sm font-bold text-charcoal">
                Feature
              </th>
              <th scope="col" className="bg-sage px-6 py-4 font-heading text-sm font-bold text-primary">
                NutriPath
              </th>
              <th scope="col" className="px-6 py-4 font-heading text-sm font-bold text-charcoal">
                Existing Alternatives
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className="border-b border-[#E5E7E0] last:border-0">
                <th scope="row" className="px-6 py-4 font-body text-sm font-medium text-charcoal">
                  {row.feature}
                </th>
                <td className="bg-sage/60 px-6 py-4">
                  <Cell value={row.nutripath} />
                </td>
                <td className="px-6 py-4">
                  <Cell value={row.alternatives} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
