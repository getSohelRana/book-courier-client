import {
  useMutation,
  useQuery,
  useQueryClient
} from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import Container from "../../../../components/shared/Container";
import Loading from "../../../../components/shared/loading/Loading";
import useAuth from "../../../../hooks/useAuth";

const MyOrders = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  // console.log(user);
  const { data: myOrder = [], isLoading } = useQuery({
    queryKey: ["my-order", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_api_url}/my-order`, {
        params: { email: user.email },
      });
      return res.data;
    },
  });
  // console.log(myOrder);

  // delete order mutation
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

  // handle librarian order
  const handleCancelOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be cancelled!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#234c6a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrderMutation.mutate(id);
      }
    });
  };
  if (isLoading) return <Loading></Loading>;
  return (
    <Container>
      <div className="max-w-5xl mx-auto my-10 px-4">
        <h2 className="text-xl font-bold mb-4">Your Orders {myOrder.length}</h2>
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
              {myOrder.map((order, index) => (
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
                        }[order.orderStatus] || "badge-error"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td>{Number(order.quantity) * Number(order.price)}</td>
                  <td className="flex gap-1 items-center">
                    {order.orderStatus === "pending" ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-error"
                        onClick={() => handleCancelOrder(order._id)}
                      >
                        Cancel
                      </button>
                    ) : (
                      <span
                        className={`badge ${
                          {
                            paid: "badge-success",
                          }[order.orderStatus] || "badge-error"
                        }`}
                      >
                        {order.orderStatus}
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

export default MyOrders;
