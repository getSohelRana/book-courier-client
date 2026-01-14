import React from "react";
import Navbar from "../components/shared/header/Navbar";
import Container from "../components/shared/Container";
import Carousel from "../components/home/carousel/Carousel";
import CoverageMap from "../components/home/coverageMap/CoverageMap";


const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Carousel */}
          <Carousel></Carousel>
        <Container>
          {/* coverage map */}
          <CoverageMap></CoverageMap>
        </Container>
      </main>

      {/* Footer */}
      <footer>
        
      </footer>
    </div>
  );
};

export default Home;
