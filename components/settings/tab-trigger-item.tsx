import { TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@/components/global/icon";
import { TabTriggerItemProps } from "./types";

export const TabTriggerItem = ({ icon, label }: TabTriggerItemProps) => {
  return (
    <TabsTrigger
      key={label}
      value={label}
      className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600 data-[state=active]:bg-neutral-300 dark:data-[state=active]:bg-neutral-600"
    >
      <Icon name={icon} className="w-5 h-5" />
      <span>{label}</span>
    </TabsTrigger>
  );
};
