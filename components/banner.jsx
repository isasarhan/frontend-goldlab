import React from "react";

const Banner = ({title}) => {
  return (
    <div className=" text-center p-md-5 p-5 mb-3" style={{ backgroundColor: "#26547C" }}>
      <h1 className="text-white "> {title}</h1>
    </div>
  );
};

export default Banner;
