import React, { useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/shared/loading/Loading";
import { FaRegFileLines } from "react-icons/fa6";
import { LiaCartArrowDownSolid, LiaFileInvoiceDollarSolid, LiaHomeSolid } from "react-icons/lia";
import ThemeSwitcher from "../providers/ThemeSwitcher";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiBookAdd, BiBookReader } from "react-icons/bi";
import { PiAddressBook } from "react-icons/pi";
import { SlUser } from "react-icons/sl";
import siteLogo from "../assets/book_qourier_logo2.png"
import Container from "../components/shared/Container";
import { GoBook } from "react-icons/go";
import showToast from "../utilities/showToast/showToast";

const DashboardLayout = () => {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const { user, loading, setLoading, signOutUser } = useAuth();
  const { role, roleLoading } = useRole();
  // console.log(user);
  if (loading || roleLoading) return <Loading />;

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
    <div className="drawer lg:drawer-open">
      <title>{role}</title>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <div className=" bg-base-300 shadow-sm">
          <Container>
            <nav className="navbar w-full gap-3">
              <label
                htmlFor="my-drawer-4"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                {/* Sidebar toggle icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M9 4v16"></path>
                  <path d="M14 10l2 2l-2 2"></path>
                </svg>
              </label>
              <div className="flex-1 ">
                {/* show role base dashboard title */}
                <h2 className="text-[14px] sm:text-lg font-semibold capitalize">
                  {role} Dashboard
                </h2>
              </div>
              <div className="flex gap-2 ">
                {/* toggle theme */}
                <ThemeSwitcher></ThemeSwitcher>
                {/* search button */}
                <div className="join hidden min-[475px]:flex ">
                  <div>
                    <div>
                      <input
                        type="search"
                        className="input join-item w-30 sm:w-auto"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <div className="indicator">
                    <button className="btn join-item">Search</button>
                  </div>
                </div>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        className="object-cover"
                        alt={user?.displayName}
                        src={user?.photoURL}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <button className="btn btn-error" onClick={handleSignOut}>
                      Logout
                    </button>
                  </ul>
                </div>
              </div>
            </nav>
          </Container>
        </div>
        {/* page content goes here */}
        <div className="p-5">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-primary is-drawer-close:w-20 is-drawer-open:w-64">
          {/* Sidebar Brand */}
          <div className="w-full flex items-center px-5  py-[7.5px]  is-drawer-open:py-[5.5px] border-b border-base-200">
            <div className="flex items-center gap-2">
              <img
                src={siteLogo}
                alt="site_logo"
                className="is-drawer-open:w-40 is-drawer-close:hidden"
              />
              <span className="is-drawer-open:hidden">Book courier</span>
            </div>
          </div>
          {/* Sidebar content here */}
          <ul className="menu w-full grow gap-6 mt-9">
            {/* List item */}
            <li>
              <NavLink
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <LiaHomeSolid />
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              {/* user order link */}
              {user?.email && role === "user" && (
                <NavLink
                  to="user/orders"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right "
                  data-tip="Orders"
                >
                  <FaRegFileLines />
                  <span className="is-drawer-close:hidden">Orders</span>
                </NavLink>
              )}
              {/* admin link */}
              {user?.email && role === "admin" && (
                <NavLink
                  to="admin/all-users"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="All users"
                >
                  <HiOutlineUserGroup />
                  <span className="is-drawer-close:hidden">All users</span>
                </NavLink>
              )}
              {/* librarian link */}
              {user?.email && role === "librarian" && (
                <NavLink
                  to="librarian/add-book"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Add-book"
                >
                  <BiBookAdd />
                  <span className="is-drawer-close:hidden">Add-book</span>
                </NavLink>
              )}
            </li>
            {/* 2nd links item */}
            <li>
              {/* user link */}
              {user?.email && role === "user" && (
                <NavLink
                  to="user/invoices"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Orders"
                >
                  <LiaFileInvoiceDollarSolid />
                  <span className="is-drawer-close:hidden">invoices</span>
                </NavLink>
              )}
              {/* admin link */}
              {user?.email && role === "admin" && (
                <NavLink
                  to="admin/manage-books"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Manage-books"
                >
                  <PiAddressBook />
                  <span className="is-drawer-close:hidden">Manage-books</span>
                </NavLink>
              )}
              {/* librarian link */}
              {user?.email && role === "librarian" && (
                <NavLink
                  to="librarian/my-books"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My-book"
                >
                  <GoBook />
                  <span className="is-drawer-close:hidden">My-books</span>
                </NavLink>
              )}
            </li>
            {/* 3rd links item */}
            <li>
              {/* user link */}
              {user?.email && role === "user" && (
                <NavLink
                  to="user/profile"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Profile"
                >
                  <SlUser />
                  <span className="is-drawer-close:hidden">profile</span>
                </NavLink>
              )}
              {/* admin link */}
              {user?.email && role === "admin" && (
                <NavLink
                  to="admin/profile"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Profile"
                >
                  <SlUser />
                  <span className="is-drawer-close:hidden">Profile</span>
                </NavLink>
              )}
              {/* librarian link */}
              {user?.email && role === "librarian" && (
                <NavLink
                  to="librarian/my-orders"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My-orders"
                >
                  <LiaCartArrowDownSolid />
                  <span className="is-drawer-close:hidden">My-orders</span>
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
