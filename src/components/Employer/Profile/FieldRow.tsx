export type FieldRowProps = {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  editing: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  multiline?: boolean;
  type?: string;
  error?: string;
};
const FieldRow = ({
  icon,
  label,
  value,
  editing,
  name,
  onChange,
  type = "text",
  multiline = false,
  error,
}: FieldRowProps) => {
  return (
    <div className="py-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-500">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground mb-1">
            {label}
          </p>
          {editing ? (
            multiline ? (
              <div className="flex flex-col">
                <textarea
                  name={name}
                  value={value}
                  onChange={onChange}
                  rows={3}
                  className="w-full rounded-lg border border-violet-200 bg-violet-50/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 resize-none transition"
                />
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
              </div>
            ) : (
              <div className="flex flex-col">
                <input
                  name={name}
                  value={value}
                  onChange={onChange}
                  type={type ?? "text"}
                  className="w-full rounded-lg border border-violet-200 bg-violet-50/30 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400 transition"
                />
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
              </div>
            )
          ) : (
            <p className="text-sm text-foreground break-all">
              {value || (
                <span className="italic text-muted-foreground">Not set</span>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FieldRow;
