import React from "react";
import { Outlet, useNavigation } from "react-router";
import Loading from "../components/shared/loading/Loading";
import Navbar from "../components/shared/header/Navbar";
import Footer from "../components/shared/footer/Footer";
const MainLayouts = () => {
  const { state } = useNavigation();
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>
      {/* Main Content */}
      <main>
        {state === "loading" ? <Loading></Loading> : <Outlet></Outlet>}
      </main>

      {/* Footer */}
      <footer>
      <Footer></Footer>
      </footer>
    </div>
  );
};

export default MainLayouts;
