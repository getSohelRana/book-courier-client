import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../shared/loading/Loading";
import Container from "../../shared/Container";
import { GoHeart } from "react-icons/go";

const CardDetails = () => {
  const { id } = useParams();

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

  if (isLoading) return <Loading></Loading>;

  return (
    <Container>
      <div className="max-w-4xl mx-auto my-10 px-4">
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
                <button
                  type="button"
                  className="btn bg-transparent border-none outline-0 shadow-none text-2xl"
                >
                  <GoHeart></GoHeart>
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
                  {quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              <div className="my-2">
                <button className="btn w-full text-white">Order Now</button>
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
      </div>
    </Container>
  );
};

export default CardDetails;
