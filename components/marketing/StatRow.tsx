export type Stat = {
  value: string;
  label: string;
};

export default function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="font-heading text-4xl font-extrabold text-primary sm:text-5xl">
            {stat.value}
          </p>
          <p className="mt-1 font-body text-sm text-mid">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
