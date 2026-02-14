import React from "react";
import Container from "../../../components/shared/Container";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../components/shared/loading/Loading";
import { FaCreditCard } from "react-icons/fa";

const Payment = () => {
  const { id } = useParams();

  const { data: payment, isLoading } = useQuery({
    queryKey: ["payment", id],
    enabled: !!id,

    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_api_url}/payment/${id}`,
      );
      return res.data;
    },
  });
  const handlePayment = async () => {
    try {
      const paymentInfo = {
        price: payment.price,
        bookId: payment.bookId,
        bookName: payment.bookName,
        customerEmail: payment.customerEmail,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_api_url}/create-checkout-session`,
        paymentInfo,
      );

      //redirect to Stripe Checkout
      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(payment);
  if (isLoading) return <Loading></Loading>;

  return (
    <Container>
      <div className="max-w-xl mx-auto my-10">
        <div className="card bg-base-300 shadow-sm text-center">
          <div className="card-body">
            <h2 className="text-xl font-semibold">
              You are about to purchase:
              <span className="text-secondary"> {payment.bookName}</span>
            </h2>
            <div className="flex items-center">
              <p className="text-success">Price: {payment.price}</p>
              <p className="text-error">Status: {payment.paymentStatus}</p>
            </div>
            <p>
              Complete your payment securely to place your order successfully.
            </p>
            <div className="justify-center card-actions mt-5">
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
