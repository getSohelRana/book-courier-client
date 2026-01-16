import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <img
        src="https://i.ibb.co.com/kVFfLqNJ/error-404.gif"
        loading="lazy"
        className="max-w-md mx-auto rounded-full object-cover h-80 w-80"
        alt="error-404"
      />
      <p className="mt-4 text-lg text-error">
        Oops! The page you are looking for doesn’t exist.
      </p>
      <Link to="/" className="btn bg-[#234c6a] mt-6">
         <FaHome></FaHome> Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
