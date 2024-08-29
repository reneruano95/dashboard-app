"use client";

import { useCallback } from "react";
import { icons } from "lucide-react";

import { useAuth } from "@/lib/hooks/use-auth";
import { Separator } from "../ui/separator";
import { getQueryClient } from "../providers/get-query-client";
import { useGetUser } from "@/lib/hooks/use-get-user";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ProfileIcon } from "../icons/profile-icon";
import { formatRole } from "@/lib/utils";
import { SidebarButton } from "./sidebar-button";

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

  const renderSidebarButton = useCallback(
    ({ icon, label }: { icon: keyof typeof icons; label: string }) => (
      <SidebarButton icon={icon} label={label} />
    ),
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
        {renderSidebarButton({
          icon: "User",
          label: "My account",
        })}
        {renderSidebarButton({
          icon: "SlidersHorizontal",
          label: "My settings",
        })}
        {renderSidebarButton({
          icon: "BellDot",
          label: "My notifications",
        })}
        {renderSidebarButton({
          icon: "Globe",
          label: "Language & region",
        })}
      </div>

      {/* {role === "agency_owner" && ( */}
      <>
        <Separator className="my-4" />
        <h3 className="mb-1 text-xs font-semibold text-zinc-500">Agency</h3>
        <div className="flex flex-col gap-[1px] text-muted-foreground">
          {renderSidebarButton({
            icon: "Settings",
            label: "Settings",
          })}
          {renderSidebarButton({
            icon: "Users",
            label: "Members",
          })}
          {renderSidebarButton({
            icon: "Building2",
            label: "Teamspaces",
          })}
          {renderSidebarButton({
            icon: "WalletCards",
            label: "Billing & Invoices",
          })}

          {renderSidebarButton({
            icon: "Workflow",
            label: "Integrations",
          })}
        </div>
      </>
      {/* )} */}
    </aside>
  );
};
