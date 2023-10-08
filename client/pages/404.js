import { useRouter } from "next/router";
import React from "react";

const PageNotFoundPage = () => {
  const router = useRouter();
  return (
    <section className="flex items-center justify-center min-h-[90dvh]">
      <div className="flex-col space-y-4 text-center">
        <h3 className="text-4xl font-semibold uppercase">
          404! Page not found
        </h3>
        <div className="text-gray-500">
          Oops! It looks like you've stumbled upon a lost page
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-600 px-4 py-3 text-white font-medium rounded-sm  hover:scale-105 cursor-pointer"
            onClick={() => router.push("/")}
          >
            Visit Homepage
          </button>
        </div>
      </div>
    </section>
  );
};

export default PageNotFoundPage;
