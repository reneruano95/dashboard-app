import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabMenuContent } from "./tab-menu-content";
import { menuItemsAccount } from "./menu-items";
import { ScrollArea } from "../ui/scroll-area";

export const TabMenuHorizontal = () => {
  return (
    <Tabs defaultValue="My account" className="md:hidden">
      <TabsList className="m-4 mb-2 flex h-fit">
        {menuItemsAccount.map(({ labelMobile }) => (
          <TabsTrigger
            key={labelMobile}
            value={labelMobile!}
            className="h-fit flex text-sm py-1 px-2"
          >
            {labelMobile}
          </TabsTrigger>
        ))}
      </TabsList>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <TabMenuContent />
      </ScrollArea>
    </Tabs>
  );
};
