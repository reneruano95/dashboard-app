import { memo } from "react";
import { icons } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconProps {
  name: keyof typeof icons;
  className?: string;
  strokeWidth?: number;
}

export const Icon = memo(({ name, className, strokeWidth }: IconProps) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.error(`Icon ${name} not found`);
    return null;
  }

  return (
    <IconComponent
      className={cn("w-4 h-4", className)}
      strokeWidth={strokeWidth}
    />
  );
});

Icon.displayName = "Icon";
