import React, { useEffect, useState } from "react";

const WhyChooseBookCourier = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    fetch("/whyChooseData.json")
      .then((res) => res.json())
      .then((data) => setContents(data));
  }, []);

  return (
    <div className="px-4 py-10">
      {/* Heading */}
      <div>
        <h1 className="heading_title">Why Choose Book Courier</h1>
        <p className="heading_subtitle">
          Request books from nearby libraries and get them picked up or delivered directly to your doorstep.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-15">
        {contents.map((content, id) => (
          <div
            key={id}
            className="card  bg-white shadow-lg rounded-lg overflow-hidden flex flex-col "
          >
            {/* Image */}
            <figure className="flex justify-center mt-4">
              <img
                src={content.icon}
                alt={content.title}
                className="w-18 h-18 object-cover"
              />
            </figure>

            {/* Card Body */}
            <div className="card-body text-center flex flex-col flex-1 justify-between">
              <div>
                <h2 className="font-bold text-lg text-primary">{content.title}</h2>
                <p className="text-gray-600 mt-2">{content.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseBookCourier;
