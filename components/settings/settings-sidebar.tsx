"use client";

import { useCallback } from "react";

import { useAuth } from "@/lib/hooks/use-auth";
import { Separator } from "../ui/separator";
import { useGetUser } from "@/lib/hooks/use-get-user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ProfileIcon } from "../icons/profile-icon";
import { formatRole } from "@/lib/utils";
import { SidebarButton } from "./sidebar-button";
import { MenuItem, menuItemsAccount, menuItemsAgency } from "./menu-items";

export const SettingsSidebar = () => {
  const {
    userRole: { data: role },
    user: { data: user },
  } = useAuth();

  const userId = user?.id!;
  const { data: userFromDb } = useGetUser(userId);

  const renderSidebarButton = useCallback(
    ({ icon, label }: MenuItem) => <SidebarButton icon={icon} label={label} />,
    []
  );

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
            {formatRole(role!)}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[1px] text-muted-foreground">
        <h3 className="mb-1 text-xs font-semibold text-zinc-500">Account</h3>
        {menuItemsAccount.map(({ icon, label }) =>
          renderSidebarButton({ icon, label })
        )}
      </div>

      {/* {role === "agency_owner" && ( */}
      <>
        <Separator className="my-4" />
        <h3 className="mb-1 text-xs font-semibold text-zinc-500">Agency</h3>
        <div className="flex flex-col gap-[1px] text-muted-foreground">
          {menuItemsAgency.map(({ icon, label }) =>
            renderSidebarButton({ icon, label })
          )}
        </div>
      </>
      {/* )} */}
    </aside>
  );
};
