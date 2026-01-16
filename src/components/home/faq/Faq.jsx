import React, { useEffect, useState } from "react";

const Faq = () => {
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    fetch("/faqs.json")
      .then((res) => res.json())
      .then((data) => setFaqs(data));
  }, []);

  return (
    <div className="">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="heading_title">Frequently Asked Questions</h1>
        <p className="heading_subtitle">
          Everything you need to know about Book Courier’s library book delivery
          service.
        </p>
      </div>
      {/* Frequently Asked Questions*/}

      <div className="max-w-6xl mx-auto mt-15 space-y-3">
        {faqs.map((faq, idx) => (
          <div key={idx} className="collapse collapse-plus bg-white border border-base-200">
            <input type="radio" name="my-accordion-3" defaultChecked={idx === 0} />
            <div className="collapse-title font-semibold text-primary">
              {faq.question}
            </div>
            <div className="collapse-content text-sm">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
