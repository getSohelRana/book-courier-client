import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useRole = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (!loading && user?.email) {
        setRoleLoading(true);
        try {
          const email = encodeURIComponent(user.email);
          const res = await axios.get(
            `${import.meta.env.VITE_api_url}/users/role/${email}`,
          );
          setRole(res.data?.role ?? null);
        } catch (error) {
          console.error("Error fetching role:", error);
          setRole(null);
        } finally {
          setRoleLoading(false);
        }
      } else if (!loading && !user?.email) {
        setRole(null);
        setRoleLoading(false);
      }
    };

    fetchRole();
  }, [user, loading]);

  return { role, roleLoading };
};

export default useRole;
