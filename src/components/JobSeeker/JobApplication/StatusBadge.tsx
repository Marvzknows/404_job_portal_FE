import { formatLabel } from "@/helpers/helpers";
import { Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const statusConfig: Record<
  string,
  { label: string; icon: React.ReactNode; className: string }
> = {
  pending: {
    label: "Pending",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  reviewed: {
    label: "Reviewed",
    icon: <Clock className="w-3.5 h-3.5" />,
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  accepted: {
    label: "Accepted",
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  rejected: {
    label: "Rejected",
    icon: <XCircle className="w-3.5 h-3.5" />,
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

const StatusBadge = ({ status }: { status: string }) => {
  const cfg = statusConfig[status] ?? {
    label: formatLabel(status),
    icon: null,
    className: "bg-slate-50 text-slate-600 border-slate-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${cfg.className}`}
    >
      {cfg.icon}
      {cfg.label}
    </span>
  );
};

export default StatusBadge;
