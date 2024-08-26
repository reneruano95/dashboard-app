import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { cn } from "@/lib/utils";

export default function Breadcrumb() {
  const pathname = usePathname();
  const path = pathname
    ?.split("/")
    .filter((path) => path !== "")
    .slice(1);

  const breadcrumbs = useMemo(() => {
    return (
      path?.map((p, i) => {
        const href = pathname;
        const label = p.charAt(0).toUpperCase() + p.slice(1);

        return {
          href,
          label,
          active: i === path.length - 1,
        };
      }) || []
    );
  }, [path, pathname]);

  return (
    <nav aria-label="breadcrumb" className="flex items-center">
      <ol className={cn("flex items-center text-lg")}>
        {breadcrumbs.length === 0 ? (
          <li className="text-primary">Home</li>
        ) : null}
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.label}
            aria-current={breadcrumb.active ? "page" : undefined}
            className={cn(
              breadcrumb.active ? "text-primary" : "text-neutral-300",
              "hover:text-gray-600 dark:hover:text-neutral-300"
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-1 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
