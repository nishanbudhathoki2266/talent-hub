import { useState } from "react";
import Link from "next/link";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import OAuth from "@/components/OAuth";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FormError from "@/components/FormError";
import { toast } from "react-toastify";
import setCookie from "@/utils/setCookie";

const SignInPage = () => {
  // router
  const router = useRouter();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;
    const auth = getAuth();

    try {
      // For future need
      // const userCredential = await signInWithEmailAndPassword(
      await signInWithEmailAndPassword(auth, email, password);

      // For future need
      // const user = userCredential.user;

      setCookie("currentUser", auth.currentUser);
      toast.success("Signed in succesfully");
      reset();
      router.push("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="bg-gray-3">
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>

      <form
        className="px-6 py-12 max-w-4xl mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Could reuse the email input for both sign in and sign up, but keeping it simple for now */}
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

        {/* Also could make this input reusable, but again, for the shake of simplicity, keeping it as it is */}
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
            Don't have an account?
            <Link
              href="/sign-up"
              className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
            >
              Register
            </Link>
          </p>
          <p>
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
            >
              Forgot password?
            </Link>
          </p>
        </div>
        <button
          className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          type="submit"
        >
          Sign in
        </button>
        <div className="flex items-center  my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
          <p className="text-center font-semibold mx-4">OR</p>
        </div>
        <OAuth />
      </form>
    </section>
  );
};

export default SignInPage;
