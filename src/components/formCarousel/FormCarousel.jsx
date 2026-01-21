import React, { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const FormCarousel = () => {
  const [slides, setSlide] = useState([]);
  useEffect(() => {
    fetch("/formSlider.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setSlide(data);
      });
  }, []);
  return (
    <div>
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        spaceBetween={24}
        modules={[Autoplay]}
        className="w-full"
      >
        {slides.map((slide, id) => (
          <SwiperSlide key={id}>
            <div
              className="relative 
                rounded-2xl 
                overflow-hidden 
                shadow-lg 
                max-w-150
                mx-auto
                min-h-72 
                sm:min-h-80 
                md:min-h-96
                group
                m-5
              "
            >
              <img
                src={slide.photoUrl}
                alt={slide.title}
                className="
                  w-full max-h-90
                  object-cover
                  transition-transform 
                  duration-500 
                  group-hover:scale-105
                "
              />
              {/* Content */}
              <div
                className="p-2 sm:p-6 md:p-8  text-center bg-base-300"
              >
                <h3 className="text-lg sm:text-xl md:text-3xl font-semibold text-primary">
                  {slide.title}
                </h3>

                <p className="text-sm sm:text-text-base text-secondary leading-relaxed">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FormCarousel;
