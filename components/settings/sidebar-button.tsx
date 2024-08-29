import { Button } from "../ui/button";
import { Icon } from "../global/icon";
import { MenuItem } from "./menu-items";

interface SidebarButtonProps extends MenuItem {}

export const SidebarButton = ({ icon, label }: SidebarButtonProps) => (
  <Button
    variant="ghost"
    className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
  >
    <Icon name={icon} className="w-5 h-5" />
    <span>{label}</span>
  </Button>
);
