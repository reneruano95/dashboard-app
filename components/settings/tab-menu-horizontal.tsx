import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabMenuContent } from "./tab-menu-content";
import { menuItemsAccount } from "./menu-items";
import { ScrollArea } from "../ui/scroll-area";

export const TabMenuHorizontal = () => {
  return (
    <Tabs defaultValue="My account" className="md:hidden">
      <div className="bg-muted px-3 py-2 flex justify-start">
        <TabsList className="flex h-fit gap-[1px] bg-transparent p-0">
          {menuItemsAccount.map(({ labelMobile, label }) => (
            <TabsTrigger
              key={labelMobile}
              value={label}
              className="h-fit flex text-sm py-1 px-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 data-[state=active]:bg-neutral-300 dark:data-[state=active]:bg-neutral-600"
            >
              {labelMobile}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <TabMenuContent />
      </ScrollArea>
    </Tabs>
  );
};
