"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type NavigateButtonProps = {
  href: string;
  label: string;
  icon?: ReactNode;
  className?: string;
};

const NavigateButton = ({
  href,
  label,
  icon,
  className,
}: NavigateButtonProps) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(href)}
      className={cn("cursor-pointer", className)}
    >
      {icon}
      {label}
    </Button>
  );
};

export default NavigateButton;
