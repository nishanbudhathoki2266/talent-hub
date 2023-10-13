import Link from "next/link";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useForm } from "react-hook-form";
import OAuth from "@/components/OAuth";
import FormError from "@/components/FormError";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { db } from "@/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const SignUpPage = () => {
  // router
  const router = useRouter();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Hide and Show password with eye button
  const [showPassword, setShowPassword] = useState(false);

  // Form submit handler
  const onSubmit = async (data) => {
    const { email, password, fullName } = data;

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Adding a displayName (fullName) to the auth user
      updateProfile(auth.currentUser, {
        displayName: fullName,
      });

      // We get user like this
      const user = userCredential.user;

      // Also we need to save the user to our database. And we don't wanna add password to the db.
      const formDataCopy = { ...data };
      delete formDataCopy.password;
      // Setting some timestamp describing when the user was created
      formDataCopy.timestamp = serverTimestamp();

      // Make a new user collection and also save the user data -> Note that the auth is only used for authentication, it won't save any user in the db. So we should do it manually
      await setDoc(doc(db, "users", user.uid), formDataCopy);

      // Reset the form after all operations
      reset();

      // Toast the message
      toast.success("Signed up successfully!");

      // Finally push the user to the home page
      router.push("/");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <form
        className="px-6 py-12 max-w-4xl mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {errors.fullName && <FormError errors={errors.fullName.message} />}
        <input
          type="text"
          placeholder="Full name"
          className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          {...register("fullName", {
            required: "Please enter your full name!",
            maxLength: 20,
          })}
        />
        {errors.email && <FormError errors={errors.email.message} />}
        <input
          type="email"
          placeholder="Email address"
          className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Please enter a valid email!",
            },
          })}
        />

        {errors.password && <FormError errors={errors.password.message} />}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            {...register("password", {
              required: "Please enter a password",
              minLength: {
                value: 8,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          {showPassword ? (
            <AiFillEyeInvisible
              className="absolute right-3 top-3 text-xl cursor-pointer"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          ) : (
            <AiFillEye
              className="absolute right-3 top-3 text-xl cursor-pointer"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          )}
        </div>

        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
          <p className="mb-6">
            Have an account?
            <Link
              href="/sign-in"
              className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
            >
              Sign in
            </Link>
          </p>
        </div>
        <button
          className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          type="submit"
        >
          Sign up
        </button>
        <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
          <p className="text-center font-semibold mx-4">OR</p>
        </div>
        <OAuth />
      </form>
    </section>
  );
};

export default SignUpPage;
