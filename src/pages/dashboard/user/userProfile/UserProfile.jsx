import React, { useState } from "react";
import useUserRole from "../../../../hooks/useUserRole";
import Loading from "../../../../components/shared/loading/Loading";
import { FaEdit } from "react-icons/fa";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { imgUpload } from "../../../../utilities/imgUpload/imgUpload";
import useAuth from "../../../../hooks/useAuth";
import showToast from "../../../../utilities/showToast/showToast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

const UserProfile = () => {
  const { user, updateUserProfile } = useAuth();
// console.log(user)
  const { userData, isLoading } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "onChange" });

  const handleUpdateProfile = async (data) => {
    try {
      const profileImg = data.profileImg[0];

      // image upload (must await)
      const photoURL = await imgUpload(profileImg);

      const updateProfileData = {
        displayName: data.name,
        photoURL: photoURL,
      };

      console.log(updateProfileData);

      //firebase profile update
      await updateUserProfile(updateProfileData);

      // save database
      const result = await axios.patch(
        `${import.meta.env.VITE_api_url}/users`,
        {
          email: user?.email,
          name: data.name,
          photoURL,
        },
      );

      // success toast
     if (result?.data?.modifiedCount > 0) {
       showToast(
         "success",
         `Welcome, ${data.name}! Your profile has been updated successfully 🎉`,
       );
     }

      reset();
      queryClient.invalidateQueries(["useSaveUser"]);
      closeModal();
    } catch (error) {
      console.log("PROFILE UPDATE ERROR:", error);
    }
  };
 const closeModal = () => {
  setIsOpen(false)
 }
  if (isLoading) return <Loading />;

  return (
    <div className="max-w-5xl mx-auto mt-6 md:mt-10 px-4">
      <h2 className="text-xl md:text-2xl font-bold my-6 md:my-10">
        My Profile
      </h2>

      {/* Profile Card */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-10 shadow-sm p-5 md:p-8 bg-base-300 rounded-2xl">
        {/* Left Section */}
        <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-center text-center sm:text-left">
          {/* Image */}
          <img
            className="border-4 border-primary rounded-full 
                       w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 
                       object-cover p-1"
            src={userData?.photoURL}
            alt={userData?.name}
          />

          {/* Info */}
          <div className="space-y-2 text-base sm:text-lg md:text-xl">
            <p className="text-primary font-semibold">Name: {userData?.name}</p>
            <p className="break-all">Email: {userData?.email}</p>
            <p>Role: {userData?.role}</p>
          </div>
        </div>

        {/* Edit Button */}
        <div className="flex justify-center md:justify-end">
          <button
            className="btn btn-primary w-full sm:w-auto"
            type="button"
            onClick={() => setIsOpen(true)}
          >
            Edit <FaEdit />
          </button>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* Overlay */}
        <div className="fixed inset-0 bg-black/40" />

        {/* Center */}
        <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4">
          <DialogPanel
            className="w-full max-w-md rounded-2xl bg-white 
                       p-5 sm:p-6 shadow-xl"
          >
            <DialogTitle className="text-lg md:text-xl font-semibold mb-4">
              Edit Profile
            </DialogTitle>

            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="space-y-4"
            >
              {/* Name */}
              <input
                type="text"
                placeholder="Enter your name"
                className={`input w-full
                  ${errors.name ? "input-error" : ""}
                  ${!errors.name && dirtyFields.name ? "input-success" : ""}
                `}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z]).+$/,
                    message: "Profile name must include a letter",
                  },
                })}
              />
              {errors.name && (
                <p className="text-error text-sm">{errors.name.message}</p>
              )}

              {/* Profile Image */}
              <div className="space-y-2">
                <label className="label">Profile image</label>
                <input
                  type="file"
                  className="file-input file-input-primary w-full"
                  {...register("profileImg", {
                    required: "Profile image is required",
                  })}
                />
                {errors.profileImg && (
                  <p className="text-error text-sm">
                    {errors.profileImg.message}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                <button
                  type="button"
                  className="btn btn-error w-full sm:w-auto"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary w-full sm:w-auto"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default UserProfile;
