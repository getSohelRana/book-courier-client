import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import Container from "../../../components/shared/Container";

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

  return <Container>Payment Successful ✅</Container>;
};

export default PaymentSuccess;
