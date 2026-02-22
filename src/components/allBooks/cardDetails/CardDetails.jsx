import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../shared/loading/Loading";
import Container from "../../shared/Container";
import { GoHeart } from "react-icons/go";
import { useState } from "react";
import OrderModal from "../../modal/paymentModal/OrderModal";
import { FaHeart, FaStar } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import showToast from "../../../utilities/showToast/showToast";

const CardDetails = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  let [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  // book detail query
  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book-details", id],
    queryFn: async () => {
      const res = await axios(
        `${import.meta.env.VITE_api_url}/book-details/${id}`,
      );
      return res.data.data;
    },
  });
  // console.log(book)

  /* WISHLIST QUERY  */

  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_api_url}/wishlist-details?email=${user.email}`,
      );
      return res.data;
    },
  });

  const isWishlisted = wishlist.some(
    (item) => item.bookId?.toString() === book?._id?.toString(),
  );

  const {
    bookName,
    authorName,
    category,
    description,
    pages,
    price,
    quantity,
    coverImg,
    addedBy,
    createdAt,
  } = book;
  const closeModal = () => {
    setIsOpen(false);
  };

  // reviews query
  const { data: reviews = [], isLoading: reviewLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_api_url}/orders/${id}`);
      return res.data.data;
    },
  });
  // console.log(reviews)

  // add to wishlist

  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post(
        `${import.meta.env.VITE_api_url}/wishlist`,
        payload,
      );
      return res.data;
    },

    onSuccess: (data) => {
      if (data.insertedId) {
        showToast("success", "Added to wishlist");
        queryClient.invalidateQueries(["wishlist", user?.email]);
      }
    },

    onError: (error) => {
      showToast("error", error.response?.data?.message || "Failed to add book");
    },
  });

  const handleWishlist = async () => {
    try {
      const wishlistData = {
        bookId: book._id,
        bookName,
        authorName,
        category,
        description,
        pages: Number(pages),
        price: Number(price),
        quantity: Number(quantity),
        coverImg,
        addedBy,
        createdAt,
        userEmail: user?.email,
      };
      console.log("wishlist btn clicked", id, wishlistData);
      await mutateAsync(wishlistData);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <Container>
      <div className="max-w-5xl mx-auto my-10 px-4">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="h-auto w-full rounded-2xl overflow-hidden">
            <img
              src={coverImg}
              alt={bookName}
              className="w-full h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col">
            {/* Content */}
            <div className="p-4 flex flex-col grow">
              <h2 className="text-xl sm:text-3xl capitalize text-primary font-bold mb-1">
                {bookName}
              </h2>
              <div className="flex justify-between gap-2 items-center  border-b border-primary">
                <p className="text-sm text-secondary capitalize">
                  by {authorName}
                </p>
                {/* wishlist button */}
                <button
                  disabled={isPending}
                  onClick={handleWishlist}
                  type="button"
                  className={`btn bg-transparent border-none outline-0 shadow-none text-2xl ${isWishlisted ? "text-red-500" : "text-gray-300"}`}
                >
                  <FaHeart />
                </button>
              </div>
              <p className="text-xl text-gray-600 mb-2 line-clamp-3 mt-3">
                {description}
              </p>

              <div className="flex justify-between text-sm mb-2 mt-4">
                <span className="bg-base-200 text-white px-2 py-1 rounded">
                  {category}
                </span>
                <span className="bg-base-200 text-white px-2 py-1 rounded">
                  {pages} pages
                </span>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <p className="text-lg font-semibold text-secondary">
                  ৳ {price}
                </p>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    quantity > 0
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {quantity} {quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              {/* action button */}
              <div className="my-2">
                <button
                  onClick={() => setIsOpen(true)}
                  className="btn w-full text-white"
                  disabled={quantity === 0}
                >
                  Order Now
                </button>

                <OrderModal
                  book={book}
                  closeModal={closeModal}
                  isOpen={isOpen}
                  refetchBook={() =>
                    queryClient.invalidateQueries(["book-details", id])
                  }
                />
              </div>

              <div className=" flex  gap-3 items-center  text-xs text-gray-400 mt-3 border-t pt-2">
                <img
                  src={addedBy?.photo}
                  alt={addedBy?.name}
                  className="w-10 h-10 rounded-full"
                />
                Added by: {addedBy?.name}
                <div>
                  <p>
                    Published:{" "}
                    {new Date(createdAt)
                      .toLocaleDateString("en-GB")
                      .replaceAll("/", "-")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-4">
            Ratings & Reviews ({reviews.length})
          </h3>

          {reviewLoading ? (
            <p>Loading reviews...</p>
          ) : reviews.length === 0 ? (
            <p className="text-gray-400">No reviews yet</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="border border-primary rounded-xl p-4 shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{review.customerName}</h4>

                    {/* Rating stars */}
                    <span className="flex gap-1 items-center text-secondary">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </span>
                  </div>

                  <p className="text-gray-600 mt-2">{review.comment}</p>

                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CardDetails;
