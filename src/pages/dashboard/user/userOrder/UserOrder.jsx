import axios from "axios";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/shared/loading/Loading";
import ErrorPage from "../../../ErrorPage";
import Container from "../../../../components/shared/Container";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const UserOrder = () => {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { data: orders = [], isPending } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_api_url}/my-order`, {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  const deleteOrderMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `${import.meta.env.VITE_api_url}/orders/${id}`,
      );
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["orders", user?.email]);

      Swal.fire({
        title: "Cancelled!",
        text: "Order cancelled successfully",
        icon: "success",
      });
    },

    onError: () => {
      Swal.fire("Error!", "Delete failed!", "error");
    },
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be cancelled!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrderMutation.mutate(id);
      }
    });
  };

  const handlePay = (id) => {
    console.log("payment clicked", id);
  };

  return (
    <Container>
      <div className="max-w-5xl mx-auto my-10 px-4">
        <h2 className="text-xl font-bold mb-4">Your Orders {orders.length}</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Book Title</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
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
      </div>
    </Container>
  );
};
export default UserOrder;
