import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../components/shared/loading/Loading";
import Container from "../components/shared/Container";
import Card from "../components/allBooks/card/card";

const AllBooks = () => {
  const { data: allBooks = [], isLoading } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_api_url}/all-books`);
      return res.data.data;
    },
  });
  console.log(allBooks);
  if (isLoading) return <Loading></Loading>;
  return (
    <Container>
      <div className="my-10">
        <h1 className="heading_title ">
          Currently {allBooks.length} Book Found{" "}
        </h1>
      </div>
      {allBooks && allBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {allBooks.map((allBook) => <Card key={allBook._id} allBook={allBook}></Card>)}
        </div>
      ) : null}
    </Container>
  );
};

export default AllBooks;
