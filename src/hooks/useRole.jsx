import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useRole = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null); // user identify
  const [roleLoading, setRoleLoading] = useState(true); // fetch user category

  useEffect(() => {
    if (!loading && user?.email) {
      setRoleLoading(true); // for fetch user

      axios
        .get(`users/role/${user.email}`)
        .then((res) => {
          console.log(res.data.role);
          setRole(res.data.role);
        })
        .catch(() => setRole(null))
        .finally(setRoleLoading(false));
    }
    // if user logged out
    if (!loading && !user?.email) {
      setRole(null);
      setRoleLoading(false);
    }
  }, [user, loading]);
  return { role, roleLoading };
};

export default useRole;
