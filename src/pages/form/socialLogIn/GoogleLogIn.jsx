import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import showToast from "../../../utilities/showToast/showToast";
import useSaveUser from "../../../hooks/useSaveUser";

const GoogleLogIn = () => {
  const { loginWithGoogle, loading, setLoading } = useAuth();
  const { saveUserToDB } = useSaveUser();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.from?.pathname || "/";
  // const isLogInPage = location.pathname === "/auth/login";
  const isSignUpPage = location.pathname === "/auth/signup";
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginWithGoogle();
      const user = res.user;
      // console.log(user);
      // save user DB
      const result = await saveUserToDB({
        name: user.displayName || "Unknown",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
      // console.log(result)
      //success toast
      if (result?.insertedId) {
        showToast("success", `Welcome back, ${user.displayName || "User"}! 🎉`);
      }
      // showToast("success", `Welcome, ${user.displayName || "User"}!`);

      navigate(redirectTo, { replace: true });
    } catch (error) {
      const errorMessages = {
        "auth/popup-closed-by-user": "Popup closed before completing sign in",
        "auth/cancelled-popup-request": "Popup cancelled",
        "auth/network-request-failed": "Network error. Check connection",
      };
      const message = errorMessages[error.code] || "Login failed. Try again";
      // console.log(message);
      showToast("error", `${message}`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
        type="button"
        disabled={loading}
        className="btn w-full mx-auto mt-3 bg-base-200"
        onClick={handleGoogleLogin}
        aria-label="Continue with Google"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5"
        />
        {isSignUpPage ? "Sign up with Google" : "Continue with Google"}
      </button>
    </div>
  );
};

export default GoogleLogIn;
