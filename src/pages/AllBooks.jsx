import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Loading from "../components/shared/loading/Loading";
import Container from "../components/shared/Container";
import Card from "../components/allBooks/card/card";
import { FaSearch } from "react-icons/fa";

const AllBooks = () => {
  const [search, setSearch] = useState("");

  // load book data
  const { data: allBooks = [], isLoading } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_api_url}/all-books`);
      return res.data.data;
    },
  });
  // console.log(allBooks);
  // search data load
  const { data: searchData = [], isFetching } = useQuery({
    queryKey: ["search", search],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_api_url}/search?search=${search}`,
      );
      return res.data.data;
    },
    enabled: !!search,
  });

  // console.log(searchData);

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value.trim();
    console.log(search);
    setSearch(search);
    e.target.reset();
  };

  const booksToShow = search ? searchData : allBooks;

  if (isLoading) return <Loading></Loading>;
  return (
    <Container>
      <div className="my-10">
        <title>All books</title>
        <h1 className="heading_title ">
          Currently {booksToShow.length} Book Found{" "}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">

        {/* Sort */}
        <select className="select w-full md:w-52">
          <option disabled>Sort By</option>
          <option value="desc">Price: High → Low</option>
          <option value="asc">Price: Low → High</option>
        </select>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-1">
          <div className="relative w-full md:w-64">
            <input
              type="search"
              name="search"
              placeholder="Type a book name..."
              className="input w-full pl-10 focus:outline-0 focus:border-primary"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
      </div>

      {/* search loading spinner */}
      {isFetching && <Loading></Loading>}

      {booksToShow && booksToShow.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {booksToShow.map((allBook) => (
            <Card key={allBook._id} allBook={allBook}></Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center">Recently no book added</p>
      )}
    </Container>
  );
};

export default AllBooks;
