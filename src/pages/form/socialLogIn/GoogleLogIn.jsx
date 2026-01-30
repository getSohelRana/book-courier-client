import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import showToast from "../../../utilities/showToast/showToast";

const GoogleLogIn = () => {
  const { loginWithGoogle, loading, setLoading } = useAuth();
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
      showToast("success", `Welcome, ${user.displayName || "User"}!`);

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
