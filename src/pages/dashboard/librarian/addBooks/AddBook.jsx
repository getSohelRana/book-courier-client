import React from "react";
import Container from "../../../../components/shared/Container";
import { useForm } from "react-hook-form";
import { imgUpload } from "../../../../utilities/imgUpload/imgUpload";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import showToast from "../../../../utilities/showToast/showToast";
import ErrorPage from '../../../ErrorPage'


const AddBook = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { isPending, isError, mutateAsync } = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post(
        `${import.meta.env.VITE_api_url}/all-books`,
        payload,
      );
      return res.data;
    },

    onSuccess: () => {
      showToast("success", "Book added successfully");
      queryClient.invalidateQueries({ queryKey: ["all-books"] });
      reset();
    },

    onError: (error) => {
      showToast("error", error.response?.data?.message || "Failed to add book");
    },
  });

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm({ mode: "onChange" });

  const handleAddBook = async (data) => {
    const {
      authorName,
      bookName,
      category,
      description,
      pages,
      price,
      publish,
      quantity,
    } = data;
    try {
      const coverImg = data.coverImg[0];
      // console.log(coverImg);
      const photoURL = await imgUpload(coverImg);

      const bookData = {
        authorName,
        bookName,
        category,
        description,
        pages: Number(pages),
        price: Number(price),
        publish,
        quantity: Number(quantity),
        coverImg: photoURL,
        addedBy: {
          name: user?.displayName,
          photo: user?.photoURL,
          email: user?.email,
        },
        createdAt: new Date(),
      };
      await mutateAsync(bookData);
      reset();
    } catch (error) {
      showToast("error", "Image upload failed");
    } 
  };
  if(isError) return <ErrorPage></ErrorPage>
  return (
    <Container>
      <div className="max-w-5xl mx-auto mt-10">
        <title>Librarian | Add Book</title>

        {/* Header */}
        <div className="mb-10">
          <h1 className="heading_title">Add New Book</h1>
          <p className="heading_subtitle">
            Fill in the details below to add a book to the library collection.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleAddBook)}>
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Book name  */}
            <div className="space-y-2">
              <label className="label">Book name</label>
              <input
                type="text"
                placeholder="Type book name"
                className={`input w-full
                  ${errors.bookName ? "input-error" : ""}
                  ${!errors.bookName && dirtyFields.bookName ? "input-success" : ""}
                `}
                {...register("bookName", {
                  required: "Book name is required",
                  minLength: {
                    value: 2,
                    message: "Book name must be at least 2 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z]).+$/,
                    message: "Book name must include at least one letter",
                  },
                })}
              />
              {errors.bookName && (
                <p className="text-error text-sm">{errors.bookName.message}</p>
              )}
            </div>

            {/* Author name */}
            <div className="space-y-2">
              <label className="label">Author name</label>
              <input
                type="text"
                placeholder="Author name"
                className={`input w-full
                  ${errors.authorName ? "input-error" : ""}
                  ${!errors.authorName && dirtyFields.authorName ? "input-success" : ""}
                `}
                {...register("authorName", {
                  required: "Author name is required",
                  minLength: {
                    value: 4,
                    message: "Author name must be at least 4 characters",
                  },
                })}
              />
              {errors.authorName && (
                <p className="text-error text-sm">
                  {errors.authorName.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="label">Book category</label>
              <select
                defaultValue=""
                className={`select w-full
                  ${errors.category ? "input-error" : ""}
                  ${!errors.category && dirtyFields.category ? "input-success" : ""}
                `}
                {...register("category", { required: "Category is required" })}
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="Romantic">Romantic</option>
                <option value="Drama">Drama</option>
                <option value="Fiction">Fiction</option>
                <option value="Programming">Programming</option>
                <option value="Others">Others</option>
              </select>
              {errors.category && (
                <p className="text-error text-sm">{errors.category.message}</p>
              )}
            </div>

            {/* Pages */}
            <div className="space-y-2">
              <label className="label">Pages</label>
              <input
                type="number"
                min={20}
                placeholder="Minimum 20"
                className={`input w-full
                  ${errors.pages ? "input-error" : ""}
                  ${!errors.pages && dirtyFields.pages ? "input-success" : ""}
                `}
                {...register("pages", {
                  required: "Page number is required",
                  min: {
                    value: 20,
                    message: "Page number must be at least 20",
                  },
                })}
              />
              {errors.pages && (
                <p className="text-error text-sm">{errors.pages.message}</p>
              )}
            </div>

            {/* Publish status */}
            <div className="space-y-2">
              <label className="label">Publish status</label>
              <select
                defaultValue=""
                className={`select w-full
                  ${errors.publish ? "input-error" : ""}
                  ${!errors.publish && dirtyFields.publish ? "input-success" : ""}
                `}
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
              {errors.publish && (
                <p className="text-error text-sm">{errors.publish.message}</p>
              )}
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label className="label">Book price</label>
              <input
                type="number"
                min={1}
                placeholder="Enter price"
                className={`input w-full
                  ${errors.price ? "input-error" : ""}
                  ${!errors.price && dirtyFields.price ? "input-success" : ""}
                `}
                {...register("price", {
                  required: "Book price is required",
                  min: {
                    value: 1,
                    message: "Book price must be at least 1 tk",
                  },
                })}
              />
              {errors.price && (
                <p className="text-error text-sm">{errors.price.message}</p>
              )}
            </div>

            {/* Cover image (full width) */}
            <div className=" space-y-2">
              <label className="label">Book cover image</label>
              <input
                name="coverImg"
                type="file"
                className="file-input file-input-primary w-full"
                {...register("coverImg", {
                  required: "Book cover image is required",
                })}
              />
              {errors.coverImg && (
                <p className="text-error text-sm mt-1">
                  {errors.coverImg.message}
                </p>
              )}
            </div>
            {/* book quantity*/}
            <div className="space-y-2">
              <label className="label">Book Quantity</label>
              <input
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                className={`input w-full
                  ${errors.quantity ? "input-error" : ""}
                  ${!errors.quantity && dirtyFields.quantity ? "input-success" : ""}
                `}
                {...register("quantity", {
                  required: "Book quantity is required",
                  min: {
                    value: 1,
                    message: "Book quantity must be at least 1 item",
                  },
                })}
              />
              {errors.quantity && (
                <p className="text-error text-sm">{errors.quantity.message}</p>
              )}
            </div>
            {/* Book description  */}
            <div className="md:col-span-2">
              <label className="label">Write book description</label>
              <textarea
                name="description"
                className={`textarea w-full ${errors.description ? "input-error" : ""}
              ${!errors.description && dirtyFields.description ? "input-success" : ""}`}
                placeholder="Write book description"
                {...register("description", {
                  required: "Book description required",
                })}
              ></textarea>
              {errors.description && (
                <p className="text-error text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            {/* Submit button (full width) */}
            <div className="md:col-span-2">
              <button type="submit" className="btn bg-secondary w-full mt-4">
                {isPending ? "Adding Book to Library..." : "Add book"}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </Container>
  );
};

export default AddBook;
