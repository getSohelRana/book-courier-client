import React, { useState } from "react";
import Container from "../Container";
import { Link, NavLink } from "react-router";
import siteLogo from "../../../assets/book_qourier_logo2.png";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import ThemeSwitcher from "../../../providers/ThemeSwitcher";

const Navbar = () => {
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

  return (
    <div className="bg-primary relative overflow-hidden">
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
            <a className="">Button</a>
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
