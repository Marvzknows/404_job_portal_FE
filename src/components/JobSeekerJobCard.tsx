"use client";
import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, PhilippinePeso, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow, formatToPesos } from "@/helpers/helpers";
import { formattedLabel, WORK_SETUP_STYLES } from "@/types/JobListing";

type JobSeekerJobCardProps = {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  maxSalary?: number;
  minSalary?: number;
  location?: string;
  jobType: string;
  datePosted: string;
  workSetup: string;
  href: string;
  handleApply: (jobId: string, jobTitle: string, companyName: string) => void;
  isApplied?: boolean;
};

const JobSeekerJobCard = ({
  id,
  title,
  companyName,
  companyLogo,
  maxSalary,
  minSalary,
  location = "N/A",
  jobType,
  datePosted,
  workSetup,
  href,
  handleApply,
  isApplied = false,
}: JobSeekerJobCardProps) => {
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:border-violet-200 hover:shadow-md transition-all duration-200">
        <div className="flex items-start justify-between gap-3">
          <div className="flex gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border bg-gray-50">
              <Image
                src={companyLogo || "/company-placeholder.png"}
                alt={companyName}
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div>
              <h2 className="text-sm font-semibold text-foreground leading-snug">
                {title}
              </h2>
              <p className="text-xs text-muted-foreground">{companyName}</p>
            </div>
          </div>

          <button className="p-1.5 rounded-md hover:bg-violet-50 transition">
            <Bookmark className="w-4 h-4 text-violet-500" />
          </button>
        </div>

        {/* Meta */}
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
            Posted {formatDistanceToNow(new Date(datePosted))}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="text-xs font-medium bg-violet-50 text-violet-700 border-violet-200"
            >
              {formattedLabel[jobType as keyof typeof formattedLabel]}
            </Badge>

            <Badge
              variant="outline"
              className={`text-xs font-medium ${
                WORK_SETUP_STYLES[workSetup] ||
                "bg-gray-50 text-gray-700 border-gray-200"
              }`}
            >
              {formattedLabel[workSetup as keyof typeof formattedLabel]}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Link href={href}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>

            <Button
              onClick={() => handleApply(id, title, companyName)}
              size="sm"
              className="bg-violet-600 hover:bg-violet-700"
              disabled={isApplied}
            >
              {isApplied ? "Applied" : "Apply"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSeekerJobCard;
