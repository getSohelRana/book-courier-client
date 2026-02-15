import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "./useAuth";

const useUserRole = () => {
  const { user } = useAuth();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_api_url}/users/role/${user.email}`,
      );
      return res.data;
    },
  });

  return {
    userData: data,
    isLoading,
    isError,
    refetch,
  };
};

export default useUserRole;
