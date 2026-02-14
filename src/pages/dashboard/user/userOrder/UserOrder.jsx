import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "../../../../components/shared/loading/Loading";
import ErrorPage from "../../../ErrorPage";
import Container from "../../../../components/shared/Container";

const UserOrder = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_api_url}/my-order`,
          { params: { email: user.email } },
        );
        setOrders(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const handleCancel = () => {
    console.log('btn clicked')
  }
  const handlePay = ( ) => {
    console.log('btn clicked')
  }

  if (loading) return <Loading></Loading>;
  if (error) return <ErrorPage></ErrorPage>;
  console.log(orders);
  return (
    <Container>
      <div className="max-w-5xl mx-auto my-10 px-4">
        <h2 className="text-xl font-bold mb-4">Your Orders</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  {/* book title */}
                  <td className="uppercase">{order.bookName}</td>
                  <td>
                    {order.updatedAt
                      ? new Date(order.updatedAt).toLocaleDateString()
                      : new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  {/* status */}
                  <td>
                    <span
                      className={`badge ${
                        {
                          pending: "badge-warning",
                          paid: "badge-success",
                          cancelled: "hidden",
                        }[order.orderStatus] || "badge-error"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>{Number(order.quantity) * Number(order.price)}</td>
                  <td className="space-x-2">
                    {order.orderStatus === "pending" && (
                      <>
                        <button
                        type="button"
                          className="btn btn-sm btn-error"
                          onClick={() => handleCancel(order._id)}
                        >
                          Cancel
                        </button>
                        <button
                        type="button"
                          className="btn btn-sm btn-primary"
                          onClick={() => handlePay(order._id)}
                        >
                          Pay Now
                        </button>
                      </>
                    )}
                    {order.orderStatus === "paid" && (
                      <span className="text-green-600 font-semibold">Paid</span>
                    )}
                    {order.status === "cancelled" && (
                      <span className="text-red-600 font-semibold">
                        Cancelled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id} className="border p-2 mb-2 rounded">
              <p>
                <strong>Book:</strong> {order.bookName}
              </p>
              <p>
                <strong>Price:</strong> ${order.price}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
            </li>
          ))}
        </ul> 
      )}*/}
      </div>
    </Container>
  );
};
export default UserOrder;
