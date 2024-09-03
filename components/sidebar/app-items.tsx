import Link from "next/link";
import { Fragment } from "react";

import { Icon } from "../global/icon";
import { Button } from "../ui/button";
import { sidebarApps } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface AppItemsProps {
  pathname: string;
  mainPath: string;
}

export const AppItems = ({ pathname, mainPath }: AppItemsProps) => {
  return (
    <div className="px-2 mt-2 flex flex-col gap-[1px]">
      {sidebarApps.map(({ label, children }) => (
        <Fragment key={label}>
          <h3 className="mb-1 text-xs font-semibold text-zinc-500">{label}</h3>
          {children.map(({ title, icon, href }) => {
            const isActive = pathname === `/${mainPath}${href}`;

            return (
              <Button
                key={title}
                variant="ghost"
                className="w-full justify-start py-1 px-2 h-fit hover:bg-neutral-300 dark:hover:bg-neutral-600 text-muted-foreground"
                asChild
              >
                <Link
                  href={`/${mainPath}${href}`}
                  className={cn(
                    "flex items-center",
                    isActive && "bg-neutral-300 dark:bg-neutral-600"
                  )}
                >
                  <Icon name={icon} className="mr-2 h-5 w-5 text-green-500" />
                  <span className="text-base">{title}</span>
                </Link>
              </Button>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
};
