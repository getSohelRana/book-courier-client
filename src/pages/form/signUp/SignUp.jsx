import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import GoogleLogIn from "../socialLogIn/GoogleLogIn";
import showToast from "../../../utilities/showToast/showToast";
import LoadingDots from "../../../components/shared/loading/LoadingDots";
import axios from "axios";
import useSaveUser from "../../../hooks/useSaveUser";

const SignUp = () => {
  const {saveUserToDB} = useSaveUser()
  const [togglePassword, setTogglePassword] = useState(false);
  const { createUser, loading, setLoading, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm({ mode: "onChange" });

  const handleSignUp = async (data) => {
    setLoading(true);

    try {
      const profileImg = data.profileImg[0];
      // console.log(profileImg)

      // prepare form data for imgBB
      const formData = new FormData();
      formData.append("image", profileImg);

      // img upload to imgBB
      const img_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_host_key}`;
      const imgRes = await axios.post(img_api_url, formData);
      const photoURL = imgRes.data.data.url;
      // console.log("after img upload", photoURL);

      // create new user
      const res = await createUser(data.email, data.password);
      const user = res.user;
      // console.log("User created:", user);

      // update firebase user profile
      const userProfile = {
        displayName: data.name,
        photoURL,
      };
      await updateUserProfile(userProfile);

      // save user DB
     const result = await saveUserToDB({
       name: data.name,
       email: data.email,
       photoURL,
     });
      //success toast
     if (result?.insertedId) {
       showToast(
         "success",
         `Welcome, ${data.name}! Your account has been created successfully 🎉`,
       );
     }

      // Reset & redirect
      reset();
      navigate(redirectTo, { replace: true });
    } catch (error) {
        if (axios.isAxiosError(error)) {
          showToast("error", error.response?.data?.message || "Server error");
          return;
        }
      const errorMessages = {
        "auth/email-already-in-use":
          "This email is already registered. Please log in instead.",
        "auth/invalid-email":
          "Invalid email address. Please enter a valid one.",
        "auth/weak-password": "Password should be at least 6 characters.",
      };

      const message =
        errorMessages[error.code] ||
        "Something went wrong. Please try again later.";

      // console.log(message);
      showToast("error", `${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-10">
        <h1 className="heading_title">Welcome to Book Courier</h1>
        <p className="heading_subtitle">
          Create your account to explore, borrow, and get books delivered to
          your doorstep.
        </p>
      </div>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <fieldset className="space-y-2">
          {/* name fields */}
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className={`input w-full 
              ${errors.name ? "input-error" : ""}
              ${!errors.name && dirtyFields.name ? "input-success" : ""}
            `}
            placeholder="Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 4,
                message: "Name must be at least 4 characters",
              },
            })}
          />
          {errors.name?.message && (
            <p className="text-error text-sm">{errors.name.message}</p>
          )}
          {/* email fields */}
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className={`input w-full 
              ${errors.email ? "input-error" : ""}
              ${!errors.email && dirtyFields.email ? "input-success" : ""}
            `}
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email?.message && (
            <p className="text-sm text-error">{errors.email.message}</p>
          )}
          {/* password */}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={togglePassword ? "text" : "password"}
              name="password"
              className={`input w-full 
                ${errors.password ? "input-error" : ""}
                ${!errors.password && dirtyFields.password ? "input-success" : ""}
              `}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  message:
                    "Must include uppercase, lowercase, number & special character",
                },
              })}
            />
            {errors.password?.message && (
              <p className="text-sm text-error">{errors.password.message}</p>
            )}
            <button
              onClick={() => setTogglePassword(!togglePassword)}
              type="button"
              className="btn absolute top-0 right-0 z-1"
            >
              {togglePassword ? (
                <IoEyeOutline size={20} />
              ) : (
                <IoEyeOffOutline size={20} />
              )}
            </button>
          </div>
          {/* profile image */}
          <label className="label">Profile image</label> <br />
          <input
            type="file"
            name="profileImg" // should match the register name
            className="file-input file-input-primary w-full"
            {...register("profileImg", { required: true })}
          />
          {errors.profileImg?.type === "required" && (
            <p className="text-red-400 text-sm mt-1">
              Please upload your profile image
            </p>
          )}
          <button className="btn  bg-secondary mt-3 w-full" type="submit">
            {loading ? <LoadingDots></LoadingDots> : "Sign Up"}
          </button>
        </fieldset>
      </form>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="text-primary font-semibold hover:underline"
        >
          Sign In
        </Link>
      </p>
      <div className="divider">or</div>
      {/* social log in */}
      <GoogleLogIn></GoogleLogIn>
    </div>
  );
};

export default SignUp;
