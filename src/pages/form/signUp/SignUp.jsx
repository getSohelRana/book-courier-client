import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router";

const SignUp = () => {
  const [togglePassword, setTogglePassword] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({ mode: "onChange", reValidateMode: "onChange" });
  const handleSignUp = (data) => {
    console.log(data);
  };
  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit(handleSignUp)}>
        <fieldset className="space-y-2">
          {/* name fields */}
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            className={`input w-full 
              ${errors.name ? "input-error" : ""}
              ${!errors.name && touchedFields.name ? "input-success" : ""}
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
          {errors.name && (
            <p className="text-error text-sm">{errors.name.message}</p>
          )}
          {/* email fields */}
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className={`input w-full 
              ${errors.email ? "input-error" : ""}
              ${!errors.email && touchedFields.email ? "input-success" : ""}
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
          {errors.email && (
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
                ${!errors.password && touchedFields.password ? "input-success" : ""}
              `}
              placeholder="Password"
              {...register("password", {
                required: "Password id required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                  message:
                    "Must include uppercase, lowercase, number & special character",
                },
              })}
            />
            {errors.password && (
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
            name="photoImg" // should match the register name
            className="file-input file-input-primary w-full"
            {...register("photoImg", { required: true })}
          />
          {errors.photoImg?.type === "required" && (
            <p className="text-red-400 text-sm mt-1">
              Please upload your profile image
            </p>
          )}
          <button className="btn  bg-secondary mt-3 w-full" type="submit">
            Sign Up
          </button>
        </fieldset>
      </form>

      <p className="text-center mt-4 text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary font-semibold hover:underline"
        >
          Sign In
        </Link>
      </p>

      <div className="divider">or</div>

      <button className="btn w-full mx-auto mt-3 bg-base-200">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5"
        />
        Sign up with Google
      </button>
    </div>
  );
};

export default SignUp;
