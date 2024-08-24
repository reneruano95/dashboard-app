"use client";

import { RefObject } from "react";
import { useIsMounted, useMediaQuery } from "usehooks-ts";
import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Icon } from "../global/icon";
import { ModeToggle } from "../global/mode-toggle";
import { UserAvatar } from "./user-avatar";
import { useAuth } from "@/lib/hooks/use-auth";

interface NavbarProps {
  isCollapsed: boolean;
  isResetting: boolean;
  resetWidth: () => void;
  navbarRef: RefObject<HTMLDivElement>;
}

export const Navbar = ({
  isCollapsed,
  isResetting,
  resetWidth,
  navbarRef,
}: NavbarProps) => {
  const isMounted = useIsMounted();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div
      ref={navbarRef}
      className={cn(
        "absolute top-0 left-0 md:left-56 w-full md:w-[calc(100%-224px)] h-12",
        isResetting && "transition-all ease-in-out duration-300",
        "flex items-center",
        isCollapsed && isMobile && "bg-secondary",
        !isCollapsed && isMobile && "hidden"
      )}
    >
      <nav className="bg-transparent px-3 py-2 w-full flex items-center justify-between gap-2">
        {isCollapsed && isMounted() && (
          <MenuIcon
            onClick={resetWidth}
            role="button"
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          Breadcrumbs
          <div className="flex items-center gap-x-2">
            <Icon name="Bell" className="h-6 w-6 text-muted-foreground" />
            <ModeToggle />
            <UserAvatar />
          </div>
        </div>
      </nav>
    </div>
  );
};
