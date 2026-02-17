import React from "react";
import Container from "../../../components/shared/Container";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../components/shared/loading/Loading";
import { FaCreditCard } from "react-icons/fa";

const Payment = () => {
  const { id } = useParams();

  //payment details
  const {
    data: payment,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payment", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_api_url}/payment/${id}`,
      );
      return res.data;
    },
  });

  // Stripe checkout handler
  const handlePayment = async () => {
    if (!payment) return;

    try {
      const paymentInfo = {
        price: payment.price,
        orderId: payment._id,
        bookName: payment.bookName,
        customerEmail: payment.customerEmail,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_api_url}/create-checkout-session`,
        paymentInfo,
      );

      // Redirect to Stripe Checkout
      window.location.href = res.data.url;
    } catch (error) {
      // console.error("Payment failed:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };
  

  // Loading state
  if (isLoading) return <Loading />;

  // Error state
  if (isError || !payment) {
    return (
      <Container>
        <div className="text-center mt-20">
          <p className="text-red-600 font-semibold">
            Failed to load payment details.
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-xl mx-auto my-10">
        <div className="card bg-base-300 shadow-lg text-center">
          <div className="card-body">
            <h2 className="text-xl font-semibold mb-4">
              You are about to purchase:{" "}
              <span className="text-secondary">{payment.bookName}</span>
            </h2>

            <div className="flex justify-center gap-8 mb-4">
              <p className="text-success font-medium">
                Price: ${payment.price}
              </p>
              <p className="text-error font-medium">
                Status: {payment.paymentStatus}
              </p>
            </div>

            <p className="mb-6">
              Complete your payment securely to place your order successfully.
            </p>

            <div className="card-actions justify-center">
              <button
                type="button"
                onClick={handlePayment}
                className="btn btn-primary gap-3 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
              >
                <FaCreditCard className="text-lg animate-bounce" />
                Secure Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Payment;
