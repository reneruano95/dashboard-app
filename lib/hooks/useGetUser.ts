import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../queries/users";

export function useGetUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => await getUserDetails(id),
    //The query will not execute until the userId exists
    enabled: !!id,
  });
}
