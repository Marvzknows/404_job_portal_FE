import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  handleFilterChange: (filterName: string, value: string) => void;
};
const EmployerActivityLogSearchFilter = ({ handleFilterChange }: Props) => {
  return (
    <div className="bg-white border border-violet-100 rounded-xl p-4 shadow">
      <div className="grid grid-cols-1 md:grid-cols-[5fr_1fr] gap-4 items-center">
        {/* Filters */}
        <div className="flex gap-2 w-full">
          <Select
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="h-11 w-full rounded-lg">
              <SelectValue placeholder="Application status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="viewed">Viewed</SelectItem>
              <SelectItem value="withdrawn">Withdrawn</SelectItem>
              <SelectItem value="shortlisted">Shortlisted</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default EmployerActivityLogSearchFilter;
