import { useForm } from "react-hook-form";
import FormError from "@/components/FormError";
import { toast } from "react-toastify";

const SignInPage = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <section className="bg-gray-3">
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>

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

        <button
          className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
          type="submit"
        >
          Sent Reset Password
        </button>
      </form>
    </section>
  );
};

export default SignInPage;
