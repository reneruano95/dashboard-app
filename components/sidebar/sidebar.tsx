"use client";

import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { Icon } from "../global/icon";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useDialog } from "@/lib/hooks/use-dialog";

export const Sidebar = () => {
  const pathname = usePathname();
  const dialog = useDialog();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? "100%" : "224px";
      navbarRef.current.style.setProperty(
        "width",
        isMobile ? "0" : "calc(100% - 224px)"
      );
      navbarRef.current.style.setProperty("left", isMobile ? "100%" : "224px");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-56 flex-col",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        <div className="w-full relative h-12 flex items-center bg-neutral-200  dark:bg-neutral-700">
          <div
            onClick={collapse}
            role="button"
            className={cn(
              "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition",
              isMobile && "opacity-100"
            )}
          >
            <Icon name="ChevronsLeft" className="h-6 w-6" />
          </div>
        </div>

        <ul className="flex flex-col p-2 gap-[1px] border-b">
          <li className="group/native flex items-center gap-2 transition-all cursor-pointer text-muted-foreground py-1 px-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm">
            <Icon name="Search" className="w-5 h-5" />
            <span>Search</span>
          </li>
          <li className="group/native flex items-center gap-2 transition-all cursor-pointer text-muted-foreground py-1 px-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm">
            <Icon name="House" className="w-5 h-5" />
            <span>Home</span>
          </li>
          <li className="group/native flex items-center gap-2 transition-all cursor-pointer text-muted-foreground py-1 px-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm">
            <Icon name="Inbox" className="w-5 h-5" />
            <span>Inbox</span>
          </li>
          <li
            onClick={dialog.onOpen}
            className="group/native flex items-center gap-2 transition-all cursor-pointer text-muted-foreground py-1 px-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm"
          >
            <Icon name="Settings" className="w-5 h-5" />
            <span>Settings</span>
          </li>
        </ul>

        <div className="px-2 mt-2">
          <h3 className="mb-1 text-xs font-semibold text-zinc-500">Pages</h3>
          <nav className="gap-1">
            <Button
              variant="ghost"
              className="w-full justify-start py-1 px-2 h-fit hover:bg-neutral-300 dark:hover:bg-neutral-600 text-muted-foreground"
            >
              <Icon
                name="NotebookTabs"
                className="mr-2 h-5 w-5 text-green-500"
              />
              <span className="text-base">Estimates</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start py-1 px-2 h-fit hover:bg-neutral-300 dark:hover:bg-neutral-600 text-muted-foreground"
            >
              <Icon
                name="NotebookTabs"
                className="mr-2 h-5 w-5 text-green-500"
              />
              <span className="text-base">Invoices</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start py-1 px-2 h-fit hover:bg-neutral-300 dark:hover:bg-neutral-600 text-muted-foreground"
            >
              <Icon name="Users" className="mr-2 h-5 w-5 text-green-500" />
              <span className="text-base">Customers</span>
            </Button>
          </nav>
        </div>

        <div className="px-2 mt-2">
          <h3 className="mb-1 text-xs font-semibold text-zinc-500">Apps</h3>
          <nav className="gap-1">
            <Button
              variant="ghost"
              className="w-full justify-start py-1 px-2 h-fit hover:bg-neutral-300 dark:hover:bg-neutral-600 text-muted-foreground"
            >
              <Icon name="ListTodo" className="mr-2 h-5 w-5 text-green-500" />
              <span className="text-base">To-dos</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start py-1 px-2 h-fit hover:bg-neutral-300 dark:hover:bg-neutral-600 text-muted-foreground"
            >
              <Icon name="Kanban" className="mr-2 h-5 w-5 text-green-500" />
              <span className="text-base">KanBan</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start py-1 px-2 h-fit hover:bg-neutral-300 dark:hover:bg-neutral-600 text-muted-foreground"
            >
              <Icon name="Workflow" className="mr-2 h-5 w-5 text-green-500" />
              <span className="text-base">Automation</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start py-1 px-2 h-fit hover:bg-neutral-300 dark:hover:bg-neutral-600 text-muted-foreground"
            >
              <Icon name="Calendar" className="mr-2 h-5 w-5 text-green-500" />
              <span className="text-base">Calendar</span>
            </Button>
          </nav>
        </div>

        <div className="opacity-0 group-hover/sidebar:opacity-100 transition absolute h-full w-1 bg-primary/10 right-0 top-0" />
      </aside>

      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-224px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="h-6 w-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
};
