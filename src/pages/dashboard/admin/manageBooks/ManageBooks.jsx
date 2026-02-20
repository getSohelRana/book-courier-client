import React from "react";
import Container from "../../../../components/shared/Container";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import Loading from "../../../../components/shared/loading/Loading";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // load all books data
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["book-collection", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_api_url}/book-collection`,
        {
          params: { email: user.email },
        },
      );
      return res.data.data;
    },
  });
  // console.log(books);

  // delete mutation
  const { mutate: deleteBookData } = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(
        `${import.meta.env.VITE_api_url}/books/${id}`,
      );
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["book-collection", user?.email]);
      Swal.fire({
        title: "Deleted!",
        text: "The book and all related orders have been deleted successfully.",
        icon: "success",
      });
    },

    onError: () => {
      Swal.fire("Error!", "Delete failed!", "error");
    },
  });

  // handle delete book
  const handleDeleteBook = (id) => {
    // console.log("delete btn clicked", id);
    Swal.fire({
      title: "Are you sure?",
      text: "This book will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#234c6a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBookData(id);
      }
    });
  };

  // publish status change mutation
 const { mutate: changePublishStatus, isPending: updatingStatus } = useMutation(
   {
     mutationFn: async ({ id, publish }) => {
       const res = await axios.patch(
         `${import.meta.env.VITE_api_url}/book-publish/${id}`,
         { publish },
       );
       return res.data;
     },

     onSuccess: () => {
       queryClient.invalidateQueries({
         queryKey: ["book-collection", user?.email],
       });

       Swal.fire("Updated!", "Publish status updated successfully.", "success");
     },

     onError: () => {
       Swal.fire("Error!", "Status update failed!", "error");
     },
   },
 );

  if (isLoading) return <Loading></Loading>;
  return (
    <Container>
      <div className="max-w-5xl mx-auto my-6 md:my-10 ">
        <title>Manage books</title>
        <div className="mb-10">
          <h1 className="heading_title">Book Management Panel</h1>
          <p className="heading_subtitle">
            Manage all added books efficiently. Change publish status to control
            visibility or delete books along with their related records.
          </p>
        </div>
        <div className="sm:max-w-xl mx-auto bg-secondary/10 text-secondary px-5 py-2 rounded-full font-semibold shadow-sm text-center">
          <h1>Librarian added total : {books.length} books</h1>
        </div>
        <div className="overflow-x-auto mt-10 md:mt-15">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Librarian info</th>
                <th>Book name</th>
                <th>Category</th>
                <th>Change Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, idx) => (
                <tr key={book._id}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={book.addedBy?.photo}
                            alt={book.addedBy?.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{book.addedBy?.name}</div>
                        <div className="text-sm opacity-50">
                          {book.addedBy?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="capitalize">{book.bookName}</td>
                  <td>
                    <div className="badge bg-secondary/20 flex items-center">
                      {book.category}
                    </div>
                  </td>
                  <td>
                    <select
                      value={book.publish}
                      disabled={updatingStatus}
                      onChange={(e) =>
                        changePublishStatus({
                          id: book._id,
                          publish: e.target.value,
                        })
                      }
                      className="select w-full"
                    >
                      <option value="Published">Published</option>
                      <option value="Unpublished">Unpublished</option>
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDeleteBook(book._id)}
                      className="btn bg-transparent shadow-none border-0 text-2xl text-error"
                    >
                      <RiDeleteBin6Line />
                    </button>
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

export default ManageBooks;
