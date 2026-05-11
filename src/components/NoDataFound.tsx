import { CircleOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  title: string;
  subTitle?: string;
  showButton?: boolean;
  showButtonText?: string;
  showButtonHref?: string;
};

const NoDataFound = ({
  title,
  subTitle,
  showButton = false,
  showButtonText,
  showButtonHref = "#",
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
        <CircleOff className="w-8 h-8 text-muted-foreground" />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">{title}</h3>
        {subTitle && (
          <p className="text-sm text-muted-foreground max-w-xs">{subTitle}</p>
        )}
      </div>

      {showButton && (
        <Button asChild>
          <Link href={showButtonHref}>{showButtonText}</Link>
        </Button>
      )}
    </div>
  );
};

export default NoDataFound;
