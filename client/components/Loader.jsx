import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 bg-white flex justify-center items-center z-50">
      <Image
        src="/assets/loader.svg"
        alt="Loader..."
        height={100}
        width={100}
      />
    </div>
  );
};

export default Loader;
