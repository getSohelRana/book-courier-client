import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const SignIn = () => {
  const { loading, setLoading, signInUser } = useAuth();
  const [togglePassword, setTogglePassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.form?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm({ mode: "onChange" });
  const handleSignIn = async (data) => {
    setLoading(true)
    try{
      const res = await signInUser(data.email , data.password);
      const user = res.user;
      console.log(user)
      reset()
      navigate(redirectTo);
    }catch (error){
      const errorMessages = {
        "auth/wrong-password": "Incorrect password",
        "auth/user-not-found": "No account found with this email",
        "auth/invalid-credential": "Invalid email or password",
      };
      const message = errorMessages[error.code] ||"Login failed. Try again";
      console.log(message)

    }finally{
      setLoading(false)
    }
  };
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-10">
        <h1 className="heading_title">Login to Your Account</h1>
        <p className="heading_subtitle">
          Smart and secure book delivery starts here.
        </p>
      </div>
      <form onSubmit={handleSubmit(handleSignIn)}>
        <fieldset className="space-y-2">
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
                required: "Password id required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
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

          <button className="btn  bg-secondary mt-3 w-full" type="submit">
            {loading ? "Login..." : "Sign In"}
          </button>
        </fieldset>
      </form>

      <p className="text-center mt-4 text-sm">
        Don't have an account? Please{" "}
        <Link
          to="/auth/signup"
          className="text-primary font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </p>

      <div className="divider">or</div>

      <button className="btn w-full mx-auto mt-3 bg-base-200">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5"
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
