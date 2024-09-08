import Link from "next/link";
import { Fragment, useMemo } from "react";

import { Icon } from "@/components/global/icon";
import { Button } from "@/components/ui/button";
import { PagesItemsSkeleton } from "./skeletons";
import { sidebarPages } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/hooks/users/use-user";

interface PagesItemsProps {
  pathname: string;
  mainPath: string;
}

export const PagesItems = ({ pathname, mainPath }: PagesItemsProps) => {
  const {
    userRole: { data: role, isLoading, isFetching },
  } = useUser();

  const filteredPages = useMemo(() => {
    return sidebarPages.map(({ label, children }) => ({
      label,
      children: children.filter(({ roles }) => roles.includes(role!)),
    }));
  }, [role]);

  if (isLoading || isFetching) {
    return <PagesItemsSkeleton />;
  }

  return (
    <>
      <div className="px-2 mt-2 flex flex-col gap-[1px]">
        {filteredPages.map(({ label, children }) => (
          <Fragment key={label}>
            <h3 className="mb-1 text-xs font-semibold text-zinc-500">
              {label}
            </h3>
            {children.map(({ title, icon, href }) => {
              const isActive = pathname === `/${mainPath}${href}`;

              return (
                <Button
                  key={title}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start py-1 px-2 h-fit hover:bg-neutral-300 dark:hover:bg-neutral-600 text-muted-foreground"
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
