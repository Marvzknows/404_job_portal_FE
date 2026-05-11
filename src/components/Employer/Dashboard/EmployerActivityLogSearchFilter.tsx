import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterX } from "lucide-react";
import { useState } from "react";

const ACTION_OPTIONS = [
  {
    group: "Job Listings",
    items: [
      { value: "JOB_CREATED", label: "Job Created" },
      { value: "JOB_VIEWED", label: "Job Viewed" },
      { value: "JOB_UPDATED", label: "Job Updated" },
      { value: "JOB_DELETED", label: "Job Deleted" },
    ],
  },
  {
    group: "Applications",
    items: [
      { value: "JOB_ACCEPTED", label: "Accepted" },
      { value: "JOB_SHORTLISTEDJOB_REJECTED", label: "Rejected" },
      { value: "JOB_APPLIED", label: "Applied" },
      { value: "APPLICATION_WITHDRAWN", label: "Withdrawn" },
    ],
  },
  {
    group: "Account",
    items: [
      { value: "PROFILE_UPDATED", label: "Profile Updated" },
      { value: "PASSWORD_CHANGED", label: "Password Changed" },
    ],
  },
];

type Props = {
  handleFilterChange: (filterName: string, value: string) => void;
};

const EmployerActivityLogSearchFilter = ({ handleFilterChange }: Props) => {
  const [action, setAction] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const hasActiveFilters = action || dateFrom || dateTo;

  const handleReset = () => {
    setAction("");
    setDateFrom("");
    setDateTo("");
    handleFilterChange("action", "");
    handleFilterChange("date_from", "");
    handleFilterChange("date_to", "");
  };

  return (
    <div className="border border-border/60 rounded-xl p-4 bg-card">
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center">
        {/* Action filter */}
        <Select
          value={action}
          onValueChange={(value) => {
            const next = value === "all" ? "" : value;
            setAction(next);
            handleFilterChange("action", next);
          }}
        >
          <SelectTrigger className="h-9 w-full sm:w-52 rounded-lg text-sm">
            <SelectValue placeholder="All actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All actions</SelectItem>
            {ACTION_OPTIONS.map((group) => (
              <SelectGroup key={group.group}>
                <SelectLabel className="text-[11px] text-muted-foreground px-2">
                  {group.group}
                </SelectLabel>
                {group.items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        {/* Date range */}
        <div className="flex items-center gap-2 flex-1">
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              handleFilterChange("date_from", e.target.value);
            }}
            className="h-9 rounded-lg text-sm w-full"
          />
          <span className="text-xs text-muted-foreground shrink-0">to</span>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              handleFilterChange("date_to", e.target.value);
            }}
            className="h-9 rounded-lg text-sm w-full"
          />
        </div>

        {/* Clear button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-9 px-3 text-xs text-muted-foreground hover:text-foreground shrink-0"
          >
            <FilterX className="w-3.5 h-3.5 mr-1.5" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmployerActivityLogSearchFilter;
