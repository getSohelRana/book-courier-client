import React from 'react';

const Container = ({children}) => {
  return (
    <div className='max-w-screen-3xl mx-auto xl:px-20 md:px-10 px-2'>
      {children}
    </div>
  );
};

export default Container;