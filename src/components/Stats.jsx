import { totalDistance } from "../utils/data";

const format = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const Stats = ({ countries, cities, travels }) => {
  const stats = [
    { label: "Countries", value: countries.length },
    { label: "Cities", value: cities.length },
    { label: "Travels", value: travels.length },
    { label: "Km", value: format.format(totalDistance(travels)) },
  ];

  return (
    <dl className="grid grid-cols-4 gap-2">
      {stats.map(({ label, value }) => (
        <div key={label} className="card px-3 py-2.5">
          <dt className="text-[10px] font-medium tracking-wider text-slate-500 uppercase dark:text-slate-400">
            {label}
          </dt>
          <dd className="text-xl font-semibold tabular-nums text-slate-900 dark:text-white">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default Stats;
