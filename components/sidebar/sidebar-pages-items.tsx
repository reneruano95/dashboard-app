import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icon } from "../global/icon";
import { Button } from "../ui/button";
import { sidebarPages } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/use-auth";

export const SidebarPagesItems = () => {
  const pathname = usePathname();

  const {
    userRole: { data: role },
  } = useAuth();

  const agencyId = pathname.split("/")[1];

  return (
    <>
      {sidebarPages.map(({ label, children }) => (
        <div className="px-2 mt-2" key={label}>
          <h3 className="mb-1 text-xs font-semibold text-zinc-500">{label}</h3>
          {children.map(({ title, icon, href, roles }) => {
            const isActive = pathname === `/${agencyId}${href}`;
            const hasAccess = roles.includes(role!);

            if (!hasAccess) {
              return null;
            }

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
                  href={`/${agencyId}${href}`}
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
        </div>
      ))}
    </>
  );
};
