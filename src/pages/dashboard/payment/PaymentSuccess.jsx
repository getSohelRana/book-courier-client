import React, { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import axios from "axios";
import Container from "../../../components/shared/Container";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const called = useRef(false); // ✅ prevent double call

  useEffect(() => {
    if (!sessionId || called.current) return;

    called.current = true;

    const updatePayment = async () => {
      try {
        const res = await axios.patch(
          `${import.meta.env.VITE_api_url}/payment-success`,
          { session_id: sessionId },
        );

        console.log("Payment updated:", res.data);
      } catch (err) {
        console.error(err);
      }
    };

    updatePayment();
  }, [sessionId]);

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        {/* Icon */}
        <div className="mb-6 text-green-500 text-8xl animate-pulse">
          <IoCheckmarkDoneCircleOutline />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4 text-success">
          Payment Successfully Done
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Thank you! Your payment has been successfully processed. You can now
          track your order and view all your payments in your Payment History.
        </p>

        {/* Action Button */}
        <Link
          to="/dashboard/user/invoices"
          className="btn btn-primary px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
        >
          Go to Payment History
        </Link>
      </div>
    </Container>
  );
};

export default PaymentSuccess;
