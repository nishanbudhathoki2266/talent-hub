import Link from "next/link";
import { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useForm } from "react-hook-form";
import OAuth from "@/components/OAuth";

const SignUpPage = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data, "The Form data");
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <form
        className="px-6 py-12 max-w-4xl mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Full name"
          className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          {...register("fullName")}
        />
        <input
          type="email"
          placeholder="Email address"
          className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          {...register("email")}
        />
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            {...register("password")}
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
