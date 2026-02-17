import React from 'react';
import { useParams } from 'react-router';

const MyBooksEdit = () => {
  const {id} = useParams();
  console.log(id)
  return (
    <div>
      edit  my books
    </div>
  );
};

export default MyBooksEdit;