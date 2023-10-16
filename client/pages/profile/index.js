import "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isLoadingDetails, setIsLoadingDeatils] = useState(true);

  const { displayName, email } = userDetails;

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserDetails({
          ...userDetails,
          displayName: user.displayName,
          email: user.email,
        });
      }
      setIsLoadingDeatils(false);
    });
  }, []);

  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
      <div className="w-full md:w-[50%] mt-6 px-3">
        <form>
          {/* Name Input */}

          <input
            type="text"
            value={isLoadingDetails ? "Loading..." : displayName}
            disabled
            className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out `}
          />

          {/* Email Input */}

          <input
            type="email"
            value={isLoadingDetails ? "Loading..." : email}
            disabled
            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          />

          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
            <p className="flex items-center ">
              Do you want to change your name?
              <span className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer">
                Edit
              </span>
            </p>
            <p className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer">
              Sign out
            </p>
          </div>
        </form>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
        >
          <Link href="/profile" className="flex justify-center items-center">
            Update Your Skills
          </Link>
        </button>
      </div>
    </section>
  );
};

export default ProfilePage;
