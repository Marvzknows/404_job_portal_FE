import Link from "next/link";
import { Briefcase, Clock, MapPin, PhilippinePeso, User2 } from "lucide-react";

type JobCardProps = {
  title: string;
  maxSalary?: number;
  minSalary?: number;
  location?: string;
  jobType: string;
  datePosted: string;
  totalApplicants: number;
  href: string; // new prop for the link
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
    <Link href={href} className="block">
      <div className="bg-white rounded-lg border border-violet-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2 items-center">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>

          {minSalary && maxSalary && (
            <div className="flex items-center gap-1">
              <PhilippinePeso className="w-4 h-4" />
              <span>
                {minSalary.toLocaleString()} - {maxSalary.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{jobType}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Posted {datePosted}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
          <User2 className="w-4 h-4" />
          <span>
            <span className="font-semibold">{totalApplicants}</span> applicants
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
