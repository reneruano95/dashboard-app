import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { ProfileIcon } from "../icons/profile-icon";
import { useAuth } from "@/lib/hooks/use-auth";
import { useGetUser } from "@/lib/hooks/use-get-user";
import { getQueryClient } from "../providers/get-query-client";

export const UserAvatar = () => {
  const queryClient = getQueryClient();
  const {
    user: { data: user },
  } = useAuth();

  queryClient.refetchQueries({
    queryKey: ["user"],
    type: "inactive",
    exact: true,
  });

  const userId = user?.id!;
  const { data: userFromDb, error, isLoading, isFetching } = useGetUser(userId);

  if (error) {
    console.error("Error fetching user:", error);
  }

  if (isLoading || isFetching) {
    return (
      <Skeleton className="h-8 w-8 rounded-full border-2 border-red-600 bg-neutral-300 dark:bg-neutral-600" />
    );
  }

  return (
    <div className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8 border-2 border-red-600">
        <AvatarImage src={userFromDb?.avatar_url} />
        <AvatarFallback>
          <ProfileIcon className="h-6 w-6 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};
