const Section = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
    <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-violet-100 text-violet-600">
        {icon}
      </span>
      <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
    </div>
    <div className="px-5 py-4">{children}</div>
  </div>
);

export default Section;
