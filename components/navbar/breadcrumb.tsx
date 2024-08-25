import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export default function Breadcrumb() {
  const path = usePathname();
  const pathname = path
    ?.split("/")
    .filter((path) => path !== "")
    .slice(1);

  const breadcrumbs = pathname.map((path, index) => {
    const href = `/${pathname.slice(0, index + 1).join("/")}`;
    const label = path.charAt(0).toUpperCase() + path.slice(1);

    return {
      href,
      label: label,
      active: index === pathname.length - 1,
    };
  });

  return (
    <nav aria-label="breadcrumb" className="flex items-center">
      <ol className={cn("flex items-center text-lg")}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={cn(
              breadcrumb.active ? "text-primary" : "text-neutral-300",
              "hover:text-gray-600 dark:hover:text-neutral-300"
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-2 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
