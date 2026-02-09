import React, { useState } from "react";
import Container from "../Container";
import { Link, NavLink } from "react-router";
import siteLogo from "../../../assets/book_qourier_logo2.png";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import ThemeSwitcher from "../../../providers/ThemeSwitcher";
import useAuth from "../../../hooks/useAuth";
import userIcon from "../../../assets/user.png";
import { PiUser } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboardCustomize, MdOutlineNotificationsActive } from "react-icons/md";
import { LiaSignOutAltSolid } from "react-icons/lia";
import showToast from "../../../utilities/showToast/showToast";

const Navbar = () => {
  const { user, signOutUser, setLoading } = useAuth();
  // console.log(user);
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const links = (
    <>
      <li>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-books" onClick={closeMenu}>
          All Books
        </NavLink>
      </li>
    </>
  );

  const handleSignOut = async () => {
    const userName = user?.displayName || "User";
    setLoading(true);

    try {
      await signOutUser();
      showToast("success", `${userName} logged out successfully`);
    } catch (error) {
      console.error(error);
      showToast("error", "Failed to log out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary relative">
      <Container>
        <div className="navbar justify-between ">
          <div className="navbar-start -ml-8 sm:ml-2">
            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-ghost text-3xl lg:hidden ml-3 sm:-ml-5"
            >
              {isOpen ? (
                <RxCross2 className="text-red-600" />
              ) : (
                <RxHamburgerMenu className="text-white" />
              )}
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={siteLogo}
                alt="site_logo"
                className="
                  h-10 
                  w-auto
                  sm:h-12
                  md:h-14
                  lg:h-16
                  object-contain
                "
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>

          {/* Right */}
          <div className="navbar-end gap-2">
            {/* ThemeSwitcher  */}
            <ThemeSwitcher></ThemeSwitcher>
            {/* current user profile */}
            {user ? (
              <>
                <div className="dropdown dropdown-bottom dropdown-left">
                  <div
                    tabIndex={0}
                    role="button"
                    className="m-1 border-2 border-primary rounded-full"
                  >
                    <img
                      className="w-10 h-10 object-cover rounded-full border-2 border-base-200"
                      src={user?.photoURL || userIcon}
                      alt="user_icon"
                    />
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-base-200 rounded-box z-50 w-35 lg:w-62 p-2 shadow-sm gap-2 space-y-2 "
                  >
                    <li>
                      <Link to="" className="flex gap-2 items-center ">
                        <PiUser></PiUser> My profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dashboard"
                        className="flex gap-2 items-center "
                      >
                        <MdOutlineDashboardCustomize />
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="" className="flex gap-2 items-center ">
                        <IoSettingsOutline /> Settings
                      </Link>
                    </li>
                    <li>
                      <Link to="" className="flex gap-2 items-center">
                        <MdOutlineNotificationsActive /> Notifications
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="bg-error text-white w-full flex gap-2 text-lg px-0"
                      >
                        <LiaSignOutAltSolid size={19} /> Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <ul className="flex">
                  <li>
                    <Link
                      to="/auth/signup"
                      className="btn btn-dash btn-secondary font-normal"
                    >
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </Container>

      {/* Mobile Slide Menu */}
      <div
        className={`fixed lg:top-17 left-0 h-screen w-64 bg-base-200 z-50 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <ul className="menu p-4 text-base-content lg:hidden">{links}</ul>
      </div>
    </div>
  );
};

export default Navbar;
