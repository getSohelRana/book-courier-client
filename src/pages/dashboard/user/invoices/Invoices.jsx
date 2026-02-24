import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import Container from "../../../../components/shared/Container";
import Loading from "../../../../components/shared/loading/Loading";

const Invoices = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_api_url}/payment-history`,
          {
            params: { email: user.email },
          },
        );
        setPayments(res.data);
      } catch (error) {
        console.error("Failed to fetch payment history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user?.email]);
// console.log(payments)
  if (loading) return <Loading />;

  if (payments.length === 0)
    return (
      <Container>
        <div className="max-w-5xl mx-auto my-10 text-center text-gray-500">
          No payment history found.
        </div>
      </Container>
    );

  return (
    <Container>
      <div className="max-w-7xl mx-auto my-10 px-4">
        <title>Payment history</title>
        <h2 className="text-xl font-bold mb-4">Your Payment History</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Book Name</th>
                <th>Amount (TK)</th>
                <th>Currency</th>
                <th>Transaction ID</th>
                <th>Payment Status</th>
                <th>Tracking ID</th>
                <th>Paid At</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pmt, index) => (
                <tr key={pmt._id}>
                  <td>{index + 1}</td>
                  <td>{pmt.bookName || "N/A"}</td>
                  <td>{pmt.price}</td>
                  <td>{pmt.currency === 'usd' ? "BDT" : ""}</td>
                  <td>{pmt.transactionId}</td>
                  <td>
                    <span
                      className={`badge ${
                        pmt.paymentStatus === "paid"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {pmt.paymentStatus}
                    </span>
                  </td>
                  <td>{pmt.trackingId}</td>
                  <td>{new Date(pmt.paidAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default Invoices;
