import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FieldRow = ({
  icon,
  label,
  value,
  editing,
  name,
  onChange,
  type = "text",
  multiline = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  editing: boolean;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: string;
  multiline?: boolean;
}) => (
  <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
    <div className="mt-1 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 text-gray-500">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      {editing ? (
        multiline ? (
          <Textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={3}
            className="text-sm text-gray-800 resize-none"
          />
        ) : (
          <Input
            name={name}
            value={value}
            onChange={onChange}
            type={type}
            className="text-sm text-gray-800"
          />
        )
      ) : (
        <p className="text-sm text-gray-800 wrap-break-word">
          {value || <span className="text-gray-400 italic">Not provided</span>}
        </p>
      )}
    </div>
  </div>
);

export default FieldRow;
