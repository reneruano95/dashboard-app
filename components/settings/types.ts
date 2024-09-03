import { icons } from "lucide-react";

export type MenuItem = {
  icon: keyof typeof icons;
  label: string;
  labelMobile?: string;
};

export interface TabTriggerItemProps {
  icon: keyof typeof icons;
  label: string;
}
