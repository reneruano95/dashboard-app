import { memo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const PagesItemsSkeleton = memo(({}) => {
  return (
    <div className="px-2 mt-2 h-fit flex flex-col gap-[2px]" aria-busy="true">
      <h3 className="mb-1 text-xs font-semibold text-zinc-500">Pages</h3>
      <Skeleton className="w-full h-8 rounded-sm bg-neutral-300 dark:bg-neutral-600" />
      <Skeleton className="w-full h-8 rounded-sm bg-neutral-300 dark:bg-neutral-600" />
      <Skeleton className="w-full h-8 rounded-sm bg-neutral-300 dark:bg-neutral-600" />
      <Skeleton className="w-full h-8 rounded-sm bg-neutral-300 dark:bg-neutral-600" />
    </div>
  );
});

PagesItemsSkeleton.displayName = "PagesItemsSkeleton";
