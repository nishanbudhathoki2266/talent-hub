import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsHouseExclamation, BsPhone } from "react-icons/bs";

const TalentDetailsPage = () => {
  const router = useRouter();

  const [talentDetails, setTalentDetails] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userRef = doc(db, "users", router.query.id);
        const userDetails = await getDoc(userRef);

        if (userDetails.exists()) {
          const userData = userDetails.data();
          setTalentDetails(userData);
        } else {
          console.log("User not found.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    // bg-[#7b82bf]
    <section className="container bg-white mx-auto">
      <div className="bg-gray-200 px-4 py-8 min-h-[30dvh] flex flex-wrap gap-6 lg:justify-center items-center">
        <div className="aspect-square w-48 bg-red-200 relative ring-4 ring-secondary/70 ring-offset-2 ring-offset-gray-200">
          <Image
            src={talentDetails.profileImageUrl}
            layout="fill"
            objectFit="cover"
            alt="User image"
          />
        </div>
        <div className="flex flex-wrap flex-col gap-1">
          <h2 className="text-4xl tracking-tight uppercase font-semibold text-secondary/70">
            I'm {talentDetails.fullName},
          </h2>
          <h5 className="text-black tracking-wider font-semibold text-xl">
            Web Developer
          </h5>
          <div className="flex text-sm flex-wrap gap-4 mt-2">
            <p className="flex items-center gap-1">
              <span className="text-md font-extrabold text-primary">
                <BsPhone />
              </span>
              9810479027
            </p>

            <p className="flex text-sm items-center gap-1">
              <span className="text-md font-extrabold text-primary">
                <BsHouseExclamation />
              </span>
              Itahari, Nepal
            </p>

            <p className="flex text-sm items-center gap-1">
              <span className="text-md font-extrabold text-primary">
                <AiOutlineMail />
              </span>
              {talentDetails.email}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TalentDetailsPage;
