import { LucideProps, User } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type EmployerDashboardCardProps = {
  label: string;
  value: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
const EmployerDashboardCard = ({
  label,
  value,
  icon,
}: EmployerDashboardCardProps) => {
  const Icon = icon;

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="bg-violet-500 p-3 rounded-xl">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboardCard;
