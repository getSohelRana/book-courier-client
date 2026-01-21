import React, { useEffect } from "react";
import { Outlet, useNavigation } from "react-router";
import TopNav from "../components/shared/header/TopNav";
import Container from "../components/shared/Container";
import Loading from "../components/shared/loading/Loading";
import FormCarousel from "../components/formCarousel/FormCarousel";

const AuthLayouts = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return (
    <div>
      <header>
        <TopNav />
      </header>

      <main className="min-h-[calc(100vh-80px)] flex items-center">
        <Container>
          {navigation.state === "loading" ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
              <div className="">
                <Outlet />
              </div>
              <div>
                <FormCarousel />
              </div>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
};

export default AuthLayouts;
