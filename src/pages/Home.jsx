import React from "react";
import Navbar from "../components/shared/header/Navbar";
import Container from "../components/shared/Container";


const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Container>
          {/* Carousel */}
         
        </Container>
      </main>

      {/* Footer */}
      <footer>
        
      </footer>
    </div>
  );
};

export default Home;
