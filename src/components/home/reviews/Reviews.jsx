import React, { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReviews(data);
      });
  }, []);

  return (
    <section className="py-16">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="heading_title">What Clients Say</h1>
        <p className="heading_subtitle">
          Real experiences from readers who trust, use and love our service.
        </p>
      </div>

      {/* Slider */}
      <Swiper
        pagination={{ dynamicBullets: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        spaceBetween={24}
        modules={[Pagination, Autoplay]}
        className="w-full"
      >
        {reviews.map((review, id) => (
          <SwiperSlide key={id}>
            <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-base-200 flex flex-col h-full mt-15">
              {/* Quote Icon */}
              <FaQuoteLeft className="text-primary text-3xl mb-4" />

              {/* Comment */}
              <p className="text-base-content/80 leading-relaxed mb-6">
                {review.comment}
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={review.photo_url}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />

                <div className="">
                  <h4 className="font-semibold text-primary">{review.name}</h4>
                  <p className="text-sm text-base-content/60">
                    {review.role} , {review.city}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Date */}
              <span className="absolute top-6 right-6 text-xs text-base-content/40">
                {review.date}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;
