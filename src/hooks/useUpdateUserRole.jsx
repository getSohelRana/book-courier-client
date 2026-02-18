import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";

const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  const { mutate: updateRole } = useMutation({
    mutationFn: async ({ id, role }) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_api_url}/users/role/${id}`,
        {
          role,
        },
      );
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Make admin",
        text: "User role updated!",
        icon: "success",
        confirmButtonColor: "#234c6a",
      });
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: () => {
      Swal.fire("Error!", "Make admin failed!", "error");
    },
  });
  return { updateRole };
};

export default useUpdateUserRole;
