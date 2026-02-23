import React from 'react';
import { Link } from 'react-router';

const Card = ({ allBook }) => {
  // console.log(allBook)
  const { _id, bookName, coverImg, price, category } = allBook || {};
  return (
    <Link to={`/book-details/${_id}`}>
      <div className="card bg-base-300 image-full shadow-sm">
        <figure>
          <img
          className='w-full h-100 object-cover'
            src={coverImg}
            alt={bookName}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title uppercase">{bookName}</h2>
          <div className='flex gap-2 items-center '>
            <p>Price : {price}</p>
            <p>Category : {category}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;