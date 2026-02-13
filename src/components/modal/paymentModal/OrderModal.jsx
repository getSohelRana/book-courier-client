import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import showToast from "../../../utilities/showToast/showToast";
import Loading from "../../shared/loading/Loading";
import ErrorPage from "../../../pages/ErrorPage";

const OrderModal = ({ closeModal, isOpen, book, refetchBook }) => {
  const { user } = useAuth();
  // console.log(book);
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post(
        `${import.meta.env.VITE_api_url}/orders`,
        payload,
      );
      return res.data;
    },

    onSuccess: (data) => {
      if (data.updated) {
        showToast("success", "Quantity updated successfully!");
      } else if (data.success) {
        showToast("success", "Order placed successfully!");
      }
      queryClient.invalidateQueries({ queryKey: ["orders", user?.email] });
      queryClient.invalidateQueries(["reviews", book._id]);
      reset();
      closeModal();
      refetchBook();
    },
  });
  const { _id, bookName, price, quantity } = book;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm({ mode: "onChange" });
  // handle book order
  const handleBookOrder = async (data) => {
    const orderData = {
      bookId: _id,
      bookName,
      price,
      quantity,
      customerName: user.displayName,
      customerEmail: user.email,
      phone: data.phone,
      address: data.address,

      rating: Number(data.rating),
      comment: data.comment,

      orderStatus: "pending",
      paymentStatus: "unpaid",
      createdAt: new Date(),
    };

    await mutateAsync(orderData);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={() => {}}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Info Before Purchase
            </DialogTitle>
            <form onSubmit={handleSubmit(handleBookOrder)}>
              <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* book title */}
                <div className="space-y-2">
                  <label className="label">Book title</label>
                  <input
                    type="text"
                    placeholder="Enter customer name"
                    defaultValue={bookName}
                    readOnly
                    className={`input w-full
                      ${errors.bookName ? "input-error" : ""}
                      ${!errors.bookName && dirtyFields.bookName ? "input-success" : ""}
                    `}
                    {...register("bookName", {
                      required: "Book name is required",
                    })}
                  />
                  {errors.bookName && (
                    <p className="text-error text-sm">
                      {errors.bookName.message}
                    </p>
                  )}
                </div>
                {/* customer name  */}
                <div className="space-y-2">
                  <label className="label">Name</label>
                  <input
                    type="text"
                    placeholder="Enter customer name"
                    defaultValue={user?.displayName}
                    readOnly
                    className={`input w-full
                      ${errors.name ? "input-error" : ""}
                      ${!errors.name && dirtyFields.name ? "input-success" : ""}
                    `}
                    {...register("name", {
                      required: "Customer name is required",
                    })}
                  />
                  {errors.name && (
                    <p className="text-error text-sm">{errors.name.message}</p>
                  )}
                </div>
                {/* customer email */}
                <div className="space-y-2">
                  <label className="label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`input w-full 
                      ${errors.email ? "input-error" : ""}
                      ${!errors.email && dirtyFields.email ? "input-success" : ""}
                    `}
                    placeholder="Enter email"
                    defaultValue={user?.email}
                    readOnly
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email?.message && (
                    <p className="text-sm text-error">{errors.email.message}</p>
                  )}
                </div>
                {/* customer phono number */}
                <div className="space-y-2">
                  <label className="label">Mobile no</label>
                  <input
                    type="tel"
                    min={1}
                    placeholder="Enter mobile no"
                    className={`input w-full
                      ${errors.phone ? "input-error" : ""}
                      ${!errors.phone && dirtyFields.phone ? "input-success" : ""}
                    `}
                    {...register("phone", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^(?:\+880|880|0)(17|16|15|18|19|13|14)\d{8}$/,
                        message: "Enter a valid BD mobile number",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-error text-sm">{errors.phone.message}</p>
                  )}
                </div>
                {/* Rating */}
                <div className="space-y-2">
                  <label className="label">Rating</label>
                  <select
                    defaultValue=""
                    className={`select w-full
                  ${errors.rating ? "input-error" : ""}
                  ${!errors.rating && dirtyFields.rating ? "input-success" : ""}
                `}
                    {...register("rating", {
                      required: "Rating is required",
                    })}
                  >
                    <option value="" disabled>
                      Select rating
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  {errors.rating && (
                    <p className="text-error text-sm">
                      {errors.rating.message}
                    </p>
                  )}
                </div>
                {/* customer address  */}
                <div className="space-y-2">
                  <label className="label">Address</label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    className={`input w-full
                  ${errors.address ? "input-error" : ""}
                  ${!errors.address && dirtyFields.address ? "input-success" : ""}
                `}
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                  {errors.address && (
                    <p className="text-error text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                {/* Book comment  */}
                <div className="md:col-span-2">
                  <label className="label">Write a comment</label>
                  <textarea
                    name="comment"
                    className={`textarea w-full ${errors.comment ? "input-error" : ""}
              ${!errors.comment && dirtyFields.comment ? "input-success" : ""}`}
                    placeholder="Write book comment"
                    {...register("comment", {
                      required: "Book comment required",
                    })}
                  ></textarea>
                  {errors.comment && (
                    <p className="text-error text-sm">
                      {errors.comment.message}
                    </p>
                  )}
                </div>
                {/* Submit button (full width) */}
                <div className="md:col-span-2">
                  <div className="flex mt-2 justify-around">
                    <button
                      type="submit"
                      className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      {isPending ? "Placing..." : "Place order"}
                    </button>
                    <button
                      type="button"
                      className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </fieldset>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default OrderModal;
