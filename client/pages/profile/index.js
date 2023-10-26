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
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import Image from "next/image";
import { BsFillPencilFill } from "react-icons/bs";
import { MdFileDownloadDone } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";

// Function to delete cookie
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const ProfilePage = () => {
  const auth = getAuth();
  const router = useRouter();
  const storage = getStorage();

  // For image input
  const fileRef = useRef(null);

  // State to hold the image URL
  const [image, setImage] = useState(null);
  const [isUploadingProfileImage, setIsUploadingProfileImage] = useState(false);

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

  const handleImageUpload = async () => {
    const imageRef = ref(storage, `profileImages/${auth.currentUser.uid}`);

    setIsUploadingProfileImage(true);
    try {
      // Upload the image to Firebase Storage using put method
      await uploadBytes(imageRef, image);

      // Get the download URL for the uploaded image
      const imageURL = await getDownloadURL(imageRef);

      // Update the image URL in Firestore
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        profileImageUrl: imageURL,
      });

      // Update the image URL in auth
      await updateProfile(auth.currentUser, { photoURL: imageURL });

      setImage(null);
      toast.success("Profile image updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUploadingProfileImage(false);
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
          fullName: data.fullName,
        });
        toast.success("Profile details updated sucessfully");
      }
      setChangeDetail(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

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

  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
      <div className="mx-auto mt-6 rounded-full border-2 shadow-lg cursor-pointer justify-center items-center relative h-40 w-40">
        <Image
          src={auth?.currentUser?.photoURL || "/assets/default-user.png"}
          alt={`Avatar`}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />

        {image ? (
          <>
            <span
              onClick={handleImageUpload}
              className={`text-white bg-primary p-2 rounded-full text-md hover:scale-105 absolute bottom-2 right-0 ${
                isUploadingProfileImage ? "animate-spin" : ""
              }`}
            >
              {isUploadingProfileImage ? (
                <AiOutlineLoading />
              ) : (
                <MdFileDownloadDone />
              )}
            </span>
            <span className="absolute bottom-4 left-40 text-xs">Ready</span>
          </>
        ) : (
          <span
            onClick={() => fileRef.current.click()}
            className=" text-white bg-primary p-2 rounded-full text-md hover:scale-105 absolute bottom-2 right-0"
          >
            <BsFillPencilFill />
          </span>
        )}
      </div>

      <div className="w-full md:w-[50%] mt-6 px-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Image Input */}
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

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
                : "Want to change your details?"}
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
              Save Changes
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
