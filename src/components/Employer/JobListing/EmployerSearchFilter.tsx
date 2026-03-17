import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

type Props = {
  handleSearchChange: (value: string) => void;
  search: string;
  handleFilterChange: (filterName: string, value: string) => void;
};

const EmployerSearchFilter = ({
  handleSearchChange,
  search,
  handleFilterChange,
}: Props) => {
  return (
    <div className="bg-white border border-violet-100 rounded-xl p-4 shadow">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 items-center">
        {/* Search bar */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search job title, keyword..."
            className="pl-10 h-11 rounded-lg border-gray-200 focus:border-violet-500 focus:ring-violet-500 w-full"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 w-full">
          <Select
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger className="h-11 w-full rounded-lg">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">All</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => handleFilterChange("job_type", value)}
          >
            <SelectTrigger className="h-11 w-full rounded-lg">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">All</SelectItem>
              <SelectItem value="full_time">Full-time</SelectItem>
              <SelectItem value="part_time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default EmployerSearchFilter;
