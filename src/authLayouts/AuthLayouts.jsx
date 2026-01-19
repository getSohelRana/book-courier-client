import React, { useEffect } from "react";
import { Outlet, useNavigation } from "react-router";
import TopNav from "../components/shared/header/TopNav";
import Container from "../components/shared/Container";
import Loading from "../components/shared/loading/Loading";

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

      <main>
        <Container>
          {navigation.state === "loading" ? <Loading /> : <Outlet />}
        </Container>
      </main>
    </div>
  );
};

export default AuthLayouts;
