import { db } from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsHouseExclamation, BsPhone } from "react-icons/bs";

const TalentDetailsPage = () => {
  const auth = getAuth();
  const router = useRouter();

  const [talentDetails, setTalentDetails] = useState({});

  // A state to keep track if the current opened details is of ours
  const [isOwnProfile, setIsOwnProfile] = useState(false);

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

    // set isOwnProfile if the talent id and auth id matches
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.uid === router.query.id) setIsOwnProfile(true);
      }
    });
  }, []);

  return (
    // bg-[#7b82bf]
    <main className="container bg-white mx-auto pb-8 px-2">
      <section className="bg-gray-200 px-4 py-8 min-h-[30dvh] flex flex-wrap gap-6 lg:justify-center items-center">
        <div className="aspect-square w-48 bg-red-200 relative ring-4 ring-secondary/70 ring-offset-2 ring-offset-gray-200">
          <Image
            src={talentDetails?.profileImageUrl}
            layout="fill"
            objectFit="cover"
            alt="User image"
          />
        </div>
        <div className="flex flex-wrap flex-col gap-1">
          <h2 className="text-4xl tracking-tight uppercase font-semibold text-secondary/70">
            I'm {talentDetails?.fullName},
          </h2>
          <h5 className="text-black tracking-wider font-semibold text-xl">
            {talentDetails?.role}
          </h5>
          <div className="flex text-sm flex-wrap gap-4 mt-2">
            <p className="flex items-center gap-1">
              <span className="text-md font-extrabold text-primary">
                <BsPhone />
              </span>
              +977-{talentDetails?.phoneNumber}
            </p>

            <p className="flex text-sm items-center gap-1">
              <span className="text-md font-extrabold text-primary">
                <BsHouseExclamation />
              </span>
              {talentDetails?.address}, Nepal
            </p>

            <p className="flex text-sm items-center gap-1">
              <span className="text-md font-extrabold text-primary">
                <AiOutlineMail />
              </span>
              {talentDetails?.email}
            </p>
          </div>
          {/* Availability */}
          {isOwnProfile ||
            (talentDetails?.isAvailable && (
              <Link
                href={`mailto:${
                  talentDetails?.email
                }?subject=${encodeURIComponent(
                  "Hiring for a project"
                )}&body=${encodeURIComponent(
                  `Hey! ${talentDetails?.fullName}! I am writing this.....`
                )}`}
                className="bg-green-600 max-w-fit text-white uppercase px-7 py-3 mt-2 text-sm font-medium rounded shadow-md hover:bg-green-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-green-800 mb-2"
              >
                Reach Out
              </Link>
            ))}
        </div>
      </section>

      {/* BIO OR DESCRIPTION */}
      <section>
        <h3 className="text-xl tracking-tight font-semibold mt-2 uppercase">
          Description (BIO)
        </h3>
        <p className="text-md text-gray-600 tracking-wide text-justify mt-1 leading-6">
          {talentDetails?.bio}
        </p>
      </section>

      {/* Experiences */}
      <section>
        <h3 className="text-xl tracking-tight font-semibold mt-2 uppercase">
          Experiences
        </h3>
        {talentDetails?.experiences?.map((exp, index) => (
          <div className="bg-gray-200 mt-2 py-4 px-2">
            <h2 className="font-semibold text-md uppercase">
              {index + 1}. {exp.position}
            </h2>
            <time className="text-md ml-4">
              <span className="font-semibold"> Duration:</span> {exp.duration}{" "}
              year/s
            </time>
            <p className="ml-4">
              <span className="font-semibold">Description: </span>
              {exp.description}
            </p>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-xl tracking-tight font-semibold mt-2 uppercase">
          Skills
        </h3>
        <div className="flex flex-wrap gap-4 mt-4">
          {talentDetails?.skills?.map((skill) => (
            <span className="bg-primary aspect-square w-28 flex justify-center items-center text-md uppercase text-white rounded-full hover:-translate-y-2 hover:scale-110 duration-500 ease-out">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
};

export default TalentDetailsPage;
