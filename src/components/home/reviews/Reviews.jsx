import React, { useEffect, useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Loading from "../../shared/loading/Loading";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setReviews(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-15 ">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="heading_title">What Clients Say</h1>
        <p className="heading_subtitle">
          Real experiences from readers who trust, use and love our service.
        </p>
      </div>

      {/* ===== Loading ===== */}
      {loading && <Loading></Loading>}

      {/* Slider */}
      <Swiper
        pagination={{ dynamicBullets: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        spaceBetween={24}
        modules={[Pagination, Autoplay]}
        className="w-full"
      >
        {reviews.map((review, id) => (
          <SwiperSlide key={id}>
            <div
              className="relative bg-base-300 rounded-2xl p-6 shadow-md flex 
              flex-col min-h-80 md:min-h-87.5 
              mt-15 mb-7 hover:border 
              hover:border-primary 
              transition-all duration-300"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-primary text-3xl mb-4" />

              {/* Comment */}
              <p className="text-primary leading-relaxed mb-6">
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
                  <p className="text-sm text-base-200">
                    {review.role} , {review.city}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-300 text-sm" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Date */}
              <span className="absolute top-6 right-6 text-xs text-base-200">
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
