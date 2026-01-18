import React from "react";
import Navbar from "../components/shared/header/Navbar";
import Container from "../components/shared/Container";
import Carousel from "../components/home/carousel/Carousel";
import CoverageMap from "../components/home/coverageMap/CoverageMap";
import WhyChoose from "../components/home/whyChooseBookCourier/WhyChooseBookCourier";
import Reviews from "../components/home/reviews/Reviews";
import Faq from "../components/home/faq/Faq";

const Home = () => {
  return (
    <div>
      {/* Carousel */}
      <Carousel></Carousel>
      <Container>
        {/* coverage map */}
        <CoverageMap></CoverageMap>
        {/* whyChoose */}
        <WhyChoose></WhyChoose>
        {/* reviews */}
        <Reviews></Reviews>
        {/* Frequently Asked Questions */}
        <Faq></Faq>
      </Container>
    </div>
  );
};

export default Home;
