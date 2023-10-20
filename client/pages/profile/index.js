import "@/firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const auth = getAuth();
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({});
  const [isLoadingDetails, setIsLoadingDeatils] = useState(true);
  const [changeDetail, setChangeDetail] = useState(false);

  const { displayName, email } = userDetails;

  const { control, handleSubmit } = useForm({
    defaultValues: {},
  });

  useEffect(() => {
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

  // Function to delete cookie
  function deleteCookie(name) {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      deleteCookie("isLoggedIn");
      router.push("/sign-in");
      toast.success("Signed out successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onSubmit = (data) => {
    if (!changeDetail) return;
    console.log(data);
  };

  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
      <div className="w-full md:w-[50%] mt-6 px-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}

          <Controller
            name="displayName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                value={isLoadingDetails ? "Loading..." : displayName}
                disabled={!changeDetail}
                className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                  changeDetail && "bg-gray-100 border-red-400"
                }`}
              />
            )}
          />
          {/* Email Input */}

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                disabled
                className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
              />
            )}
          />

          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
            <p className="flex items-center ">
              Want to change your name?
              <span
                onClick={() => setChangeDetail((prevState) => !prevState)}
                className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
              >
                {changeDetail ? "Save Changes" : "Edit"}
              </span>
            </p>
            <p
              onClick={handleSignOut}
              className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
            >
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
