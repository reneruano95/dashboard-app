import Link from "next/link";
import { Fragment } from "react";

import { Icon } from "../global/icon";
import { Button } from "../ui/button";
import { sidebarPages } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/use-auth";
import { Skeleton } from "../ui/skeleton";

interface PagesItemsProps {
  pathname: string;
  mainPath: string;
}

export const PagesItems = ({ pathname, mainPath }: PagesItemsProps) => {
  const {
    userRole: { data: role, isLoading, isFetching },
  } = useAuth();

  if (isLoading || isFetching) {
    return (
      <div className="px-2 mt-2 h-48" aria-busy="true">
        <Skeleton className="w-full h-full rounded-sm bg-neutral-300 dark:bg-neutral-600" />
      </div>
    );
  }

  return (
    <>
      <div className="px-2 mt-2">
        {sidebarPages.map(({ label, children }) => (
          <Fragment key={label}>
            <h3 className="mb-1 text-xs font-semibold text-zinc-500">
              {label}
            </h3>
            {children.map(({ title, icon, href, roles }) => {
              const isActive = pathname === `/${mainPath}${href}`;
              const hasAccess = roles.includes(role!);

              if (!hasAccess) return null;

              return (
                <Button
                  key={title}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start py-1 px-2 h-fit hover:bg-neutral-300 dark:hover:bg-neutral-600 text-muted-foreground",
                    !hasAccess && "cursor-not-allowed"
                  )}
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
    </>
  );
};
