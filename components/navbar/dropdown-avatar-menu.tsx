import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileIcon } from "@/components/icons/profile-icon";
import { useAuth } from "@/lib/hooks/use-auth";
import { useGetUser } from "@/lib/hooks/use-get-user";
import { getQueryClient } from "@/components/providers/get-query-client";
import { Icon } from "@/components/global/icon";

export const DropdownAvatarMenu = () => {
  const queryClient = getQueryClient();
  const {
    user: { data: user },
    logout,
  } = useAuth();

  const handleSignOut = async () => {
    return await logout.mutateAsync();
  };

  if (!user) {
    queryClient.refetchQueries({
      queryKey: ["user"],
      type: "inactive",
      exact: true,
    });
  }

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
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-8 w-8 border-2 border-red-600">
            <AvatarImage src={userFromDb?.avatar_url} />
            <AvatarFallback>
              <ProfileIcon className="h-6 w-6 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 text-muted-foreground">
          <DropdownMenuLabel className="flex flex-col">
            <span className="text-primary">{userFromDb?.full_name}</span>
            <span className="text-xs">{userFromDb?.email}</span>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icon name="CircleUser" className="mr-2 h-4 w-4" />
            <span>My account</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon name="Settings" className="mr-2 h-4 w-4" />
            <span>My settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:cursor-pointer hover:text-destructive"
            onClick={handleSignOut}
            role="button"
          >
            <div className="w-full flex items-center justify-start">
              <Icon name="LogOut" className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
