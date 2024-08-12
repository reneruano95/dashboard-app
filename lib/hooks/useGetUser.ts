import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../actions/users";

export function useGetUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => await getUserDetails(id),
  });
}
