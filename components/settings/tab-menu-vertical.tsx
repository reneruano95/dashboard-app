import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { ProfileIcon } from "@/components/icons/profile-icon";
import { useUser } from "@/lib/hooks/users/use-user";
import { TabMenuContent } from "@/components/settings/tab-menu-content";
import {
  menuItemsAccount,
  menuItemsAgency,
} from "@/components/settings/menu-items";

import { formatRole } from "@/lib/utils";
import { TabTriggerItem } from "./tab-trigger-item";

export const TabMenuVertical = () => {
  const {
    userRole: { data: role },
    user: { data: user },
  } = useUser();

  return (
    <Tabs defaultValue="My account" className="hidden md:flex w-full">
      <div className="flex flex-col w-56 bg-muted border-r py-3 px-2 gap-2">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-9 w-9 border-2 border-neutral-600">
            <AvatarImage src={user?.avatar_url} />
            <AvatarFallback>
              <ProfileIcon className="h-6 w-6 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-sm font-semibold text-wrap ">{user?.email}</h2>
            <div className="text-xs text-muted-foreground">
              {formatRole(role!)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[1px] text-muted-foreground">
          <TabsList
            className="flex flex-col flex-1 gap-[1px] justify-start h-fit p-0"
            aria-orientation="vertical"
          >
            <h3 className="mb-1 text-xs text-left font-semibold text-zinc-500 w-full">
              Account
            </h3>
            {menuItemsAccount.map(({ label, icon }) => (
              <TabTriggerItem key={label} icon={icon} label={label} />
            ))}

            <Separator className="my-2" />
            <h3 className="mb-1 text-xs text-left font-semibold text-zinc-500 w-full">
              Agency
            </h3>
            {menuItemsAgency.map(({ icon, label }) => (
              <TabTriggerItem key={label} icon={icon} label={label} />
            ))}
          </TabsList>
        </div>
      </div>

      <TabMenuContent />
    </Tabs>
  );
};
