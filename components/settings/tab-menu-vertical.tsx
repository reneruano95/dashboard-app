import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileIcon } from "@/components/icons/profile-icon";
import { Icon } from "@/components/global/icon";
import { TabMenuContent } from "@/components/settings/tab-menu-content";
import {
  menuItemsAccount,
  menuItemsAgency,
} from "@/components/settings/menu-items";
import { useAuth } from "@/lib/hooks/use-auth";
import { useGetUser } from "@/lib/hooks/use-get-user";
import { formatRole } from "@/lib/utils";

export const TabMenuVertical = () => {
  const {
    userRole: { data: role },
    user: { data: user },
  } = useAuth();

  const userId = user?.id!;
  const { data: userFromDb } = useGetUser(userId);

  return (
    <Tabs defaultValue="My account" className="hidden md:flex w-full">
      <div className="flex flex-col w-56 bg-muted border-r py-3 px-2 gap-2">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-9 w-9 border-2 border-neutral-600">
            <AvatarImage src={userFromDb?.avatar_url} />
            <AvatarFallback>
              <ProfileIcon className="h-6 w-6 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-sm font-semibold text-wrap ">
              {userFromDb?.email}
            </h2>
            <div className="text-xs text-muted-foreground">
              {formatRole(role!)}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[1px] text-muted-foreground">
          <TabsList
            className="flex flex-col flex-1 justify-start h-fit p-0"
            aria-orientation="vertical"
          >
            <h3 className="mb-1 text-xs text-left font-semibold text-zinc-500 w-full">
              Account
            </h3>
            {menuItemsAccount.map(({ label, icon }) => (
              <TabsTrigger
                key={label}
                value={label}
                className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600
                data-[state=active]:bg-neutral-300 dark:data-[state=active]:bg-neutral-600"
              >
                <Icon name={icon} className="w-5 h-5" />
                <span>{label}</span>
              </TabsTrigger>
            ))}

            <Separator className="my-2" />
            <h3 className="mb-1 text-xs text-left font-semibold text-zinc-500 w-full">
              Agency
            </h3>
            {menuItemsAgency.map(({ icon, label }) => (
              <TabsTrigger
                key={label}
                value={label}
                className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <Icon name={icon} className="w-5 h-5" />
                <span>{label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>

      <TabMenuContent />
    </Tabs>
  );
};
