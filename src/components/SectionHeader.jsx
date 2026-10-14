const SectionHeader = ({ title, count, children }) => (
  <div className="mb-2 flex items-center justify-between">
    <h2 className="text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
      {title}
      <span className="ml-1.5 rounded-full bg-slate-900/5 px-1.5 py-0.5 text-[10px] tabular-nums dark:bg-white/10">
        {count}
      </span>
    </h2>
    <div className="flex items-center gap-1">{children}</div>
  </div>
);

export default SectionHeader;
