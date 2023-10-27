import Image from "next/image";
import Link from "next/link";
import React from "react";

const TalentCard = ({ talent }) => {
  return (
    <article className="py-6 px-4 bg-gray-200 hover:bg-gray-300 hover:-translate-y-1 transition-all ease-out duration-300 rounded flex flex-wrap items-center justify-between md:flex-nowrap gap-6">
      <span className="md:w-44 aspect-square md:mb-0 mb-6 flex-shrink-0 relative rounded overflow-hidden">
        <Image
          src={talent.profileImageUrl || "/assets/default-user.png"}
          alt={`${talent.fullName}'s picture`}
          layout="fill"
          objectFit="cover"
        />
      </span>
      <p className="md:flex-grow">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 tracking-wide">
          {talent.fullName}
        </h2>
        <p className="leading-relaxed font-medium">
          I am well versed with JavaScript including Node Js, React Js, Next Js
          and Gatsby. Also well familiarized with SQL, NoSQL databases including
          ready made dbs like Firebase and Supabase.
        </p>
        <span className="text-gray-500 block font-extralight italic text-sm mt-2">
          Joined on{" "}
          {new Date(talent.timestamp.seconds * 1000).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <Link
          className="text-indigo-500 inline-flex items-center mt-2"
          href={`talent/${talent.uid}`}
        >
          Learn More
          <svg
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </p>
    </article>
  );
};

export default TalentCard;
