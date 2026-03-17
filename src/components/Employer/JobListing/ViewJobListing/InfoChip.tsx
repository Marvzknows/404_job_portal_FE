import { formattedLabel } from "@/types/JobListing";

type Props = {
  icon: React.ElementType;
  label: string;
};

const InfoChip = ({ icon: Icon, label }: Props) => {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-gray-50 border border-gray-100 rounded-full px-3 py-1.5">
      <Icon className="w-3.5 h-3.5 text-violet-400" />
      {formattedLabel[label as keyof typeof formattedLabel] || label}
    </span>
  );
};

export default InfoChip;
