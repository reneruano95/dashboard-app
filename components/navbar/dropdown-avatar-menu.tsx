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
import { useUser } from "@/lib/hooks/users/use-user";
import { useAuthActions } from "@/lib/hooks/auth/use-auth-actions";

import { getQueryClient } from "@/components/providers/get-query-client";
import { Icon } from "@/components/global/icon";

export const DropdownAvatarMenu = () => {
  const queryClient = getQueryClient();
  const { logout } = useAuthActions();
  const {
    user: { data: user },
  } = useUser();

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

  return (
    <div className="flex items-center gap-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="h-8 w-8 border-2 border-red-600">
            <AvatarImage src={user?.avatar_url} />
            <AvatarFallback>
              <ProfileIcon className="h-6 w-6 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 text-muted-foreground">
          <DropdownMenuLabel className="flex flex-col">
            <span className="text-primary">{user?.full_name}</span>
            <span className="text-xs">{user?.email}</span>
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
