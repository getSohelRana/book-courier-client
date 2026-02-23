import React from "react";
import useAuth from "../../../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../../components/shared/loading/Loading";
import Container from "../../../../components/shared/Container";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from "sweetalert2";

const WishList = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // load wishlist data
  const { data: wishlists = [], isLoading } = useQuery({
    queryKey: ["wishlist-details", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_api_url}/wishlist-details?email=${user?.email}`,
      );
      return res.data;
    },
  });

  // console.log(wishlists);

  // wishlist delete mutation
  const { mutate: deleteWishlist, isPending } = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `${import.meta.env.VITE_api_url}/wishlist/${id}`,
      );
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["wishlist-details", user?.email],
      });
      Swal.fire({
        title: "Delete",
        text: "Wishlist item have been deleted delete successfully",
        icon: "Success",
      });
    },

    onError: () => {
      Swal.fire("Error!", "Delete failed!", "error");
    },
  });

  // delete wishlist items
  const handleDeleteWishlist = (id) => {
    // console.log("delete btn clicked", id);
    Swal.fire({
      title: "Are you sure?",
      text: "This wishlist will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#234c6a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteWishlist(id);
      }
    });
  };

  if (isLoading) return <Loading></Loading>;
  return (
    <Container>
      <div className="max-w-5xl mx-auto my-6 md:my-10">
        <title>My wishlist</title>
        <div>
          <h1 className="heading_title">Saved Books Collection</h1>
          <p className="heading_subtitle">
            Keep track of your favorite books and access them anytime.
          </p>
        </div>
        {/* Wishlist Items */}
        <div className="mt-10 space-y-4">
          {wishlists.length === 0 ? (
            <p className="text-gray-400">Your wishlist is empty.</p>
          ) : (
            wishlists.map((item) => (
              <div
                key={item._id}
                className="   md:flex gap-8 border border-primary rounded-xl p-4 shadow hover:shadow-lg transition bg-base-300"
              >
                {/* img */}
                <div>
                  <img
                    src={item.coverImg}
                    alt={item.bookName}
                    className="mx-auto md:w-40 h-48 object-cover rounded"
                  />
                </div>
                {/* content */}
                <div className="flex-1 mt-2">
                  <h3 className="font-semibold capitalize text-xl">
                    {item.bookName}
                  </h3>
                  <p className="text-sm text-gray-500">by {item.authorName}</p>
                  <p className="text-gray-600 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex gap-2 mt-3 text-secondary">
                    <p className="text-sm">Price: ৳ {item.price}</p>
                    <p className="text-sm">Category: {item.category}</p>
                    <p className="text-sm">Pages: {item.pages}</p>
                  </div>
                  <div className="divider"></div>
                  <div className=" flex  gap-3 items-center  text-xs text-gray-500">
                    <img
                      src={item.addedBy?.photo}
                      alt={item.addedBy?.name}
                      className="w-10 h-10 rounded-full"
                    />
                    Added by: {item.addedBy?.name}
                    <div>
                      <p>
                        Published:{" "}
                        {new Date(item.createdAt)
                          .toLocaleDateString("en-GB")
                          .replaceAll("/", "-")}
                      </p>
                    </div>
                  </div>
                </div>
                {/* delete btn */}
                <div className="place-self-end md:self-center">
                  <button
                    disabled={isPending}
                    onClick={() => handleDeleteWishlist(item._id)}
                    type="button"
                    className="text-3xl text-error cursor-pointer"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default WishList;
