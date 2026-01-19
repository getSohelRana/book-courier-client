import React from "react";
import Container from "../Container";
import { Link, useLocation } from "react-router";
import top_siteLogo from "../../../assets/book_qourier_logo2.png";
import { MdOutlineAddIcCall } from "react-icons/md";

const TopNav = () => {
  const location = useLocation();

  const isLogInPage = location.pathname === "/auth/login";
  const isSignUpPage = location.pathname === "/auth/signup";

  return (
    <div className="bg-primary shadow-sm">
      <Container>
        <div className="navbar">
          <div className="flex-1">
            <Link to="/">
              <img
                src={top_siteLogo}
                className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 object-cover"
                alt="site logo"
              />
            </Link>
          </div>

          <div className="flex gap-5 items-center">
            <Link to="tel:+1-555-555-5555" className="flex gap-1 items-center">
              <MdOutlineAddIcCall />
              +1-555-555-5555
            </Link>

            {isLogInPage && <Link to="/auth/signup" className="btn btn-outline">Sign Up</Link>}
            {isSignUpPage && <Link to="/auth/login" className="btn btn-outline">Log In</Link>}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopNav;
