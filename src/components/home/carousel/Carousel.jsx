import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router";
//import slider img
import slider1 from "../../../assets/slide1.jpg";
import slider2 from "../../../assets/slide2.jpg";
import slider3 from "../../../assets/slide3.jpg";
import slider4 from "../../../assets/slide4.jpg";
import slider5 from "../../../assets/slide5.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { IoBookOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import {
  MdAddCall,
  MdDirectionsRun,
  MdOutlineInstallDesktop,
  MdOutlineLockReset,
} from "react-icons/md";
import { GiArchiveResearch } from "react-icons/gi";
import { PiBookOpenTextThin, PiSealQuestion } from "react-icons/pi";
import { FaGraduationCap } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { GoSignIn } from "react-icons/go";

const slides = [
  {
    image: slider1,
    title: "Library Now at Your Doorstep!",
    desc: "Search, order, and receive books at home — all from one platform.",
    button: { text: "Browse Books", link: "/all-books" },
    points: [
      { icon: <IoBookOutline />, text: "Thousands of books in one place" },
      { icon: <BsCart3 />, text: "Easy online ordering" },
      { icon: <TbTruckDelivery />, text: "Fast home delivery" },
    ],
  },
   {
    image: slider2,
    title: "Get Your Books in 3 Easy Steps!",
    desc: "Simple, fast, and hassle-free book delivery.",
    button: { text: "Browse Books", link: "/all-books" },
    points: [
      { icon: <GiArchiveResearch />, text: "Choose books from the library" },
      { icon: <MdOutlineInstallDesktop />, text: "Place your order online" },
      { icon: <TbTruckDelivery />, text: "Receive books at your doorstep" },
    ],
  },
  {
    image: slider3,
    title: "A Smart Solution for Students & Readers!",
    desc: "Everything you need for learning and reading.",
    button: { text: "Browse Books", link: "/all-books" },
    points: [
      { icon: <FaGraduationCap />, text: "Textbooks & reference books" },
      {
        icon: <PiBookOpenTextThin />,
        text: "Novels, stories & research books",
      },
      { icon: <TbTruckDelivery />, text: "Flexible Book Exchange System" },
    ],
  },
  {
    image: slider4,
    title: "Save Time, Grow Knowledge",
    desc: "More reading, less hassle.",
    button: { text: "Join Now", link: "/register" },
    points: [
      { icon: <MdDirectionsRun />, text: "No need to visit the library" },
      { icon: <FaSackDollar />, text: "Affordable pricing" },
      { icon: <MdOutlineLockReset />, text: "Safe & on-time delivery" },
    ],
  },
  {
    image: slider5,
    title: "Start Your Reading Journey Today",
    desc: "Digital library + home delivery = smart reading.",
    button: { text: "Sign Up", link: "/register" },
    points: [
      { icon: <MdAddCall />, text: "24/7 customer support" },
      { icon: <GoSignIn />, text: "Quick sign-up process" },
      { icon: <PiSealQuestion />, text: "We’re always ready to help" },
    ],
  },
];

const Carousel = () => {
  return (
    <div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="">
              <div className="relative h-[calc(100vh-60px)] md:h-[calc(100vh-68px)]  lg:h-[calc(100vh-80px)]  overflow-hidden shadow-lg">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full object-cover h-full"
                />
                {/* overly */}
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/10" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-3">
                  <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-secondary">
                    {slide.title}
                  </h2>

                  <p className="text-white/90 max-w-3xl text-2xl  lg:text-3xl">{slide.desc}</p>

                  <ul className="text-white/70 space-y-1">
                    {slide.points.map((p, i) => (
                      <li
                        key={i}
                        className="flex gap-2 items-center justify-center"
                      >
                        {p.icon} {p.text}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={slide.button.link}
                    className="bg-secondary px-5 py-2 rounded-3xl"
                  >
                    {slide.button.text}
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
