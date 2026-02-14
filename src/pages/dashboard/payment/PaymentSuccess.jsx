import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import Container from "../../../components/shared/Container";
import axios from "axios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const updatePayment = async () => {
      if (!sessionId) return;

      try {
        const res = await axios.patch(
          `${import.meta.env.VITE_api_url}/payment-success`,
          {
            session_id: sessionId,
          },
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
