import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import Container from "../../../../components/shared/Container";
import { useForm } from "react-hook-form";
import showToast from "../../../../utilities/showToast/showToast";
import Loading from "../../../../components/shared/loading/Loading";

const MyBooksEdit = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetch book data
  const { data: bookData, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/all-books/${id}`);
      return res.data.data;
    },
  });
  console.log(bookData)
  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // Reset form when bookData arrives
  useEffect(() => {
    if (bookData) {
      reset({
        bookName: bookData.bookName,
        authorName: bookData.authorName,
        category: bookData.category,
        description: bookData.description,
        price: bookData.price,
        quantity: bookData.quantity,
        publish: bookData.publish,
      });
    }
  }, [bookData, reset]);

  // Mutation to update book
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.patch(
        `http://localhost:5000/all-books/${id}`,
        payload,
      );
      return res.data;
    },
    onSuccess: () => {
      showToast("success", "Book updated successfully");
      queryClient.invalidateQueries({ queryKey: ["book", id] });
    },
    onError: (error) => {
      showToast(
        "error",
        error.response?.data?.message || "Failed to update book",
      );
    },
  });

  const handleEditBook = async (data) => {
    const payload = {
      bookName: data.bookName,
      authorName: data.authorName,
      category: data.category,
      description: data.description,
      price: Number(data.price),
      quantity: Number(data.quantity),
      publish: data.publish,
    };
    await mutateAsync(payload);
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <Container>
      <div className="max-w-5xl mx-auto my-10">
        <title>Edit book</title>
        <div className="mb-10">
          <h1 className="heading_title">Edit book details </h1>
          <p className="heading_subtitle">
            Update the details of your book. You can edit the fields below to
            keep your book information up-to-date.
          </p>
        </div>
        <form onSubmit={handleSubmit(handleEditBook)}>
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Book Name */}
            <div className="space-y-2">
              <label className="label">Book Name</label>
              <input
                type="text"
                placeholder="Type book name"
                className={`input w-full ${errors.bookName ? "input-error" : ""}`}
                {...register("bookName", { required: "Book name is required" })}
              />
            </div>

            {/* Author Name */}
            <div className="space-y-2">
              <label className="label">Author Name</label>
              <input
                type="text"
                placeholder="Author name"
                className={`input w-full ${errors.authorName ? "input-error" : ""}`}
                {...register("authorName", {
                  required: "Author name is required",
                })}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="label">Category</label>
              <select
                className={`select w-full ${errors.category ? "input-error" : ""}`}
                {...register("category", { required: "Category is required" })}
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Romantic">Romantic</option>
                <option value="Drama">Drama</option>
                <option value="Fiction">Fiction</option>
              </select>
            </div>

            {/* Publish */}
            <div className="space-y-2">
              <label className="label">Publish Status</label>
              <select
                className={`select w-full ${errors.publish ? "input-error" : ""}`}
                {...register("publish", {
                  required: "Publish status is required",
                })}
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="Published">Published</option>
                <option value="Unpublished">Unpublished</option>
              </select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="label">Price</label>
              <input
                type="number"
                min={1}
                className={`input w-full ${errors.price ? "input-error" : ""}`}
                {...register("price", { required: "Price required", min: 1 })}
              />
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="label">Quantity</label>
              <input
                type="number"
                min={1}
                className={`input w-full ${errors.quantity ? "input-error" : ""}`}
                {...register("quantity", {
                  required: "Quantity required",
                  min: 1,
                })}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="label">Description</label>
              <textarea
                className={`textarea w-full ${errors.description ? "input-error" : ""}`}
                {...register("description", {
                  required: "Description required",
                })}
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button type="submit" className="btn bg-secondary w-full mt-4">
                {isPending ? "Updating..." : "Update Book"}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </Container>
  );
};

export default MyBooksEdit;
