import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import Image from "next/image";

const Index = () => {
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);

      const talentsData = [];

      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          talentsData.push(doc.data());
        }
      });

      console.log("HELLO FROM USEEFFECT");

      setTalents(talentsData);
    };

    fetchUsers();
  }, []);

  console.log(talents);

  return (
    <section className="text-gray-600 divide-y-8 divide-white body-font overflow-hidden container py-4 mx-auto">
      {talents?.map((talent) => (
        <div className="py-6 px-4 bg-gray-200 hover:bg-gray-300 hover:-translate-y-1 cursor-pointer transition-all ease-out duration-300 rounded flex flex-wrap items-center justify-between md:flex-nowrap gap-4">
          <div className="md:w-48 aspect-square md:mb-0 mb-6 flex-shrink-0 relative rounded">
            <Image
              src={talent.profileImageUrl || "/assets/default-user.png"}
              alt={`${talent.fullName}'s picture`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="md:flex-grow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2 tracking-wide">
              {talent.fullName}
            </h2>
            <p className="leading-relaxed font-medium">
              Glossier echo park pug, church-key sartorial biodiesel
              vexillologist pop-up snackwave ramps cornhole. Marfa 3 wolf moon
              party messenger bag selfies, poke vaporware kombucha lumbersexual
              pork belly polaroid hoodie portland craft beer.
            </p>
            {console.log(talent.timestamp)}
            <span className="text-gray-500 block font-extralight italic text-sm mt-2">
              Joined on{" "}
              {new Date(talent.timestamp.seconds * 1000).toLocaleString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </span>
            <a className="text-indigo-500 inline-flex items-center mt-2">
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
            </a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Index;
