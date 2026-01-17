import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-base-100">
        <span className="w-25 h-25 loading loading-ring loading-10xl"></span>
      </div>
    </div>
  );
};

export default Loading;
