"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { Icon } from "../global/icon";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { getQueryClient } from "../providers/get-query-client";
import { useGetUser } from "@/lib/hooks/use-get-user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ProfileIcon } from "../icons/profile-icon";

export const SettingsSidebar = () => {
  const queryClient = getQueryClient();
  const {
    userRole: { data: role },
    user: { data: user },
  } = useAuth();

  if (!user) {
    queryClient.refetchQueries({
      queryKey: ["user"],
      type: "inactive",
      exact: true,
    });
  }

  const userId = user?.id!;
  const { data: userFromDb } = useGetUser(userId);

  return (
    <aside className=" hidden md:block w-56 bg-muted border-r py-3 px-2">
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
            {role
              ?.replace("_", " ")
              .split(" ")
              .map((word) => word[0].toUpperCase() + word.slice(1))
              .join(" ")}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[1px] text-muted-foreground">
        <h3 className="mb-1 text-xs font-semibold text-zinc-500">Account</h3>
        <Button
          variant="ghost"
          className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
        >
          <Icon name="CircleUser" className="w-5 h-5" />
          <span>My account</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
        >
          <Icon name="SlidersHorizontal" className="w-5 h-5" />
          <span>My settings</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
        >
          <Icon name="BellDot" className="w-5 h-5" />
          <span>My notifications</span>
        </Button>

        <Button
          variant="ghost"
          className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
        >
          <Icon name="Globe" className="w-5 h-5" />
          <span>Language & region</span>
        </Button>
      </div>

      {role === "agency_owner" && (
        <>
          <Separator className="my-4" />
          <h3 className="mb-1 text-xs font-semibold text-zinc-500">Agency</h3>
          <div className="flex flex-col gap-[1px] text-muted-foreground">
            <Button
              variant="ghost"
              className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            >
              <Icon name="Settings" className="w-5 h-5" />
              <span>Settings</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            >
              <Icon name="Users" className="w-5 h-5" />
              <span>Members</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            >
              <Icon name="Building2" className="w-5 h-5" />
              <span>Teamspaces</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            >
              <Icon name="WalletCards" className="w-5 h-5" />
              <span>Billing</span>
            </Button>

            <Button
              variant="ghost"
              className="w-full h-fit flex gap-2 justify-start text-sm py-1 px-3 hover:bg-neutral-300 dark:hover:bg-neutral-600"
            >
              <Icon name="Workflow" className="w-5 h-5" />
              <span>Integrations</span>
            </Button>
          </div>
        </>
      )}
    </aside>
  );
};
