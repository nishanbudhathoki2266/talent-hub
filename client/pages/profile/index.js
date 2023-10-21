import FormError from "@/components/FormError";
import { db } from "@/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const auth = getAuth();
  const router = useRouter();

  const [changeDetail, setChangeDetail] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "Loading...",
      email: "Loading...",
    },
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // Reset the form with user details
        reset({
          fullName: user.displayName,
          email: user.email,
        });
      }
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
      deleteCookie("currentUser");
      router.push("/sign-in");
      toast.success("Signed out successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onSubmit = async (data) => {
    if (!changeDetail) return;

    try {
      // We only want to update the name if the name is really changed
      if (auth.currentUser.displayName !== data.fullName) {
        // Update the display name in auth
        await updateProfile(auth.currentUser, { displayName: data.fullName });

        // update the display name in firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name: data.fullName,
        });
        toast.success("Profile details updated sucessfully");
      }
      setChangeDetail(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
      <div className="w-full md:w-[50%] mt-6 px-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          {errors.fullName && <FormError errors={errors.fullName.message} />}
          {errors?.fullName?.type === "maxLength" && (
            <FormError
              errors={"Your full name must not exceed 20 characters"}
            />
          )}
          <input
            disabled={!changeDetail}
            {...register("fullName", {
              required: "Please enter your full name!",
              maxLength: 20,
            })}
            className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
              changeDetail && "bg-gray-100 border-red-400"
            }`}
          />
          {/* Email Input */}

          <input
            {...register("email")}
            disabled
            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          />

          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
            <p className="flex items-center ">
              {changeDetail
                ? `Click the button below to save changes`
                : "Want to change your name?"}
              {changeDetail || (
                <span
                  onClick={() => setChangeDetail(true)}
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "Save Changes" : "Edit"}
                </span>
              )}
            </p>

            <p
              onClick={handleSignOut}
              className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
            >
              Sign out
            </p>
          </div>
          {changeDetail && (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
            >
              Update Your Details
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
