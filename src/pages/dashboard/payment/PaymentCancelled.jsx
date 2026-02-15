import React from "react";
import Container from "../../../components/shared/Container";
import { Link } from "react-router";
import { RxCross2 } from "react-icons/rx";

const PaymentCancelled = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        {/* Icon */}
        <div className="mb-6 text-red-500 text-8xl animate-pulse">
          <RxCross2 />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4">Payment Cancelled</h2>

        {/* Message */}
        <p className="text-gray-600 mb-6 max-w-md">
          Your payment was not completed. If you wish to try again, you can go
          back to your orders page and attempt the payment once more.
        </p>

        {/* Action Button */}
        <Link
          to="/dashboard/user/orders"
          className="btn btn-primary px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
        >
          Back to Orders
        </Link>
      </div>
    </Container>
  );
};

export default PaymentCancelled;
