import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";

const GoogleLogIn = () => {
  const { loginWithGoogle, setLoading } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const redirectTo = location.state?.from?.pathname || "/";
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const res = await loginWithGoogle();
      console.log(res.user);
			navigate(redirectTo , {replace : true})
    } catch (error) {
      const errorMessages = {
        "auth/popup-closed-by-user": "Popup closed before completing sign in",
        "auth/cancelled-popup-request": "Popup cancelled",
        "auth/network-request-failed": "Network error. Check connection",
      };
      const message = errorMessages[error.code] || "Login failed. Try again";
      console.log(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <button
			type="button"
        className="btn w-full mx-auto mt-3 bg-base-200"
        onClick={handleGoogleLogin}
      >
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

export default GoogleLogIn;
