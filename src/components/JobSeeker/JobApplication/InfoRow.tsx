const InfoRow = ({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 text-slate-400 shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-violet-600 hover:underline break-all"
        >
          {value}
        </a>
      ) : (
        <p className="text-sm text-slate-700 wrap-break-words">{value}</p>
      )}
    </div>
  </div>
);

export default InfoRow;
