"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ElementRef, useCallback, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { Icon } from "../global/icon";
import { cn } from "@/lib/utils";
import { useDialog } from "@/lib/hooks/use-dialog";
import { Navbar } from "../navbar/navbar";
import { PagesItems } from "./pages-items";
import { AppItems } from "./app-items";

export const Sidebar = () => {
  const pathname = usePathname();
  const dialog = useDialog();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);

  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const mainPath = pathname.split("/")[1];

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

  const resetWidth = useCallback(() => {
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
  }, [isMobile]);

  const collapse = useCallback(() => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), 300);
    }
  }, [isMobile]);

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-0 md:w-56 flex-col",
          isResetting && "transition-all ease-in-out duration-300"
        )}
        aria-expanded={!isCollapsed}
        aria-controls="navbar"
      >
        <div className="w-full relative h-12 flex items-center bg-neutral-200  dark:bg-neutral-700">
          <div
            onClick={collapse}
            role="button"
            className={cn(
              "h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-100 md:opacity-0 group-hover/sidebar:opacity-100 transition "
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
          <li className="group/native ">
            <Link
              href={mainPath === "dashboard" ? "/" : `/${mainPath}`}
              className="flex items-center gap-2 transition-all cursor-pointer text-muted-foreground py-1 px-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm"
            >
              <Icon name="House" className="w-5 h-5" />
              <span>Home</span>
            </Link>
          </li>
          <li className="group/native flex items-center gap-2 transition-all cursor-pointer text-muted-foreground py-1 px-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm">
            <Icon name="Inbox" className="w-5 h-5" />
            <span>Inbox</span>
          </li>
          <li
            onClick={dialog.onOpen}
            role="button"
            className="group/native flex items-center gap-2 transition-all cursor-pointer text-muted-foreground py-1 px-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm"
            aria-label="Open Settings"
          >
            <Icon name="Settings" className="w-5 h-5" />
            <span>Settings</span>
          </li>
        </ul>

        <PagesItems pathname={pathname} mainPath={mainPath} />
        <AppItems pathname={pathname} mainPath={mainPath} />

        <div
          onClick={collapse}
          className="opacity-0 group-hover/sidebar:opacity-100 transition absolute h-full w-1 bg-primary/10 right-0 top-0"
          aria-hidden="true"
        />
      </aside>

      <Navbar
        id="navbar"
        isCollapsed={isCollapsed}
        isResetting={isResetting}
        navbarRef={navbarRef}
        resetWidth={resetWidth}
      />
    </>
  );
};
