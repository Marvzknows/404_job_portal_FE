import Link from "next/link";
import { Briefcase, Clock, MapPin, PhilippinePeso, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatSalary, formatToPesos } from "@/helpers/helpers";

type JobCardProps = {
  title: string;
  maxSalary?: number;
  minSalary?: number;
  location?: string;
  jobType: string;
  datePosted: string;
  totalApplicants: number;
  href: string;
};

const JobCard = ({
  title,
  maxSalary,
  minSalary,
  location = "Remote",
  jobType,
  datePosted,
  totalApplicants,
  href,
}: JobCardProps) => {
  return (
    <Link href={href} className="block group">
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:border-violet-200 hover:shadow-md transition-all duration-200">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-sm font-semibold text-foreground leading-snug">
            {title}
          </h2>
          <Badge
            variant="outline"
            className="shrink-0 text-xs font-medium bg-violet-50 text-violet-700 border-violet-200"
          >
            {jobType}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-violet-400" />
            {location}
          </span>

          {minSalary && maxSalary && (
            <span className="flex items-center gap-1">
              <PhilippinePeso className="w-3.5 h-3.5 text-violet-400" />
              {formatToPesos(minSalary)} – {formatToPesos(maxSalary)}
            </span>
          )}

          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-violet-400" />
            Posted {datePosted}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <User2 className="w-3.5 h-3.5 text-violet-400" />
            <span className="font-semibold text-foreground">
              {totalApplicants}
            </span>
            &nbsp;applicants
          </span>

          <span className="text-xs text-violet-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View listing →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
