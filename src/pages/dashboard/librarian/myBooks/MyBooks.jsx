import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import axios from "axios";
import Loading from "../../../../components/shared/loading/Loading";
import Container from "../../../../components/shared/Container";
import { Link } from "react-router";
import { FaEdit } from "react-icons/fa";

const MyBooks = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["my-books", user?.email],
    enabled: !!user?.email, //after user loading fetch enable
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_api_url}/my-books?email=${user.email}`,
      );
      return res.data.data;
    },
  });

  // invalidate only when user changes
  useEffect(() => {
    if (user?.email) {
      queryClient.invalidateQueries({ queryKey: ["my-books", user.email] });
    }
  }, [user?.email, queryClient]);

  if (isLoading) return <Loading />;

  return (
    <Container>
      <div className="max-w-5xl mx-auto mt-6 md:mt-10">
        <title>My books</title>{" "}
        <div className="mb-10">
          <h1 className="heading_title">
            My Added Books:{" "}
            <span className="text-secondary">{books.length}</span>
          </h1>
          <p className="heading_subtitle">
            Manage and update the books you have added to the library
            collection.
          </p>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Img</th>
                  <th>Book Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  // book row
                  <tr key={book._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={book.coverImg} alt={book.bookName} />
                        </div>
                      </div>
                    </td>
                    <td className="capitalize">{book.bookName}</td>
                    <th>
                      <Link
                        to={`/dashboard/my-books/${book._id}`}
                        type="button"
                        className="btn btn-sm btn-primary"
                      >
                        Edit <FaEdit />
                      </Link>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default MyBooks;
