import FormError from "@/components/FormError";
import { db } from "@/firebase";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const AddPortfolioPage = () => {
  const auth = getAuth();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const [experiences, setExperiences] = useState([]);

  const [showExperienceForm, setShowExperienceForm] = useState(true);

  const [skills, setSkills] = useState([]);

  // For displaying availability of the user
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const fetchMyPortfolio = async () => {
      onAuthStateChanged(auth, async (user) => {
        console.log(user);
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userDetails = await getDoc(userRef);

          if (userDetails.exists()) {
            const portfolioDetails = userDetails.data();
            setExperiences(portfolioDetails.experiences);
            setSkills(portfolioDetails.skills);
            setIsAvailable(portfolioDetails.isAvailable);
            reset({
              role: portfolioDetails.role,
              bio: portfolioDetails.bio,
              phoneNumber: portfolioDetails.phoneNumber,
              address: portfolioDetails.address,
            });
          }
        }
      });
    };
    fetchMyPortfolio();
  }, []);

  const toggleExperienceForm = () => {
    setShowExperienceForm((currState) => !currState);
  };

  const addExperience = ({ duration, position, description }) => {
    setExperiences([...experiences, { duration, position, description }]);
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const addSkill = (skill) => {
    setSkills([...skills, skill]);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      experiences,
      skills,
    };

    if (!formattedData.skills.length > 0) {
      setError("skills", {
        type: "required",
        message: "Please enter at least one skill!",
      });
      return;
    }

    try {
      // Update the details in auth
      await updateProfile(auth.currentUser, formattedData);

      // update the details in firestore
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, formattedData);
      toast.success("Portfolio Updated Successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="max-w-6xl mx-auto pb-8 flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">Your Portfolio</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full lg:w-[60%] mt-6 px-3"
      >
        {/* Phone */}
        {errors.phoneNumber && (
          <FormError errors={errors.phoneNumber.message} />
        )}
        <label className="text-md font-medium tracking-wide text-gray-500">
          Phone
        </label>
        <input
          type="tel"
          {...register("phoneNumber", {
            required: "Please enter your phone number!",
            minLength: 10,
          })}
          className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          placeholder="Enter your phone number"
        />

        {/* Address */}
        <label className="text-md font-medium tracking-wide text-gray-500">
          Address
        </label>
        {errors.address && <FormError errors={errors.address.message} />}
        <input
          type="text"
          {...register("address", {
            required: "Please enter your address!",
          })}
          className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
          placeholder="Enter your Address"
        />
        <div>
          {errors.role && <FormError errors={errors.role.message} />}
          <label className="text-md font-medium tracking-wide text-gray-500">
            Role
          </label>
          <input
            type="text"
            placeholder="Web Developer"
            {...register("role", {
              required: "Role is required",
            })}
            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded"
          />
        </div>
        <div>
          {errors.bio && <FormError errors={errors.bio.message} />}
          <label className="text-md font-medium tracking-wide text-gray-500">
            Bio
          </label>
          <textarea
            rows={8}
            {...register("bio", {
              required: "Bio is required",
              maxLength: 1000,
            })}
            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300"
          />
        </div>
        {showExperienceForm && (
          <div className="flex flex-col">
            <label className="text-md font-medium tracking-wide text-gray-500">
              Experiences (Add as many you want - One at a time)
            </label>
            {errors.experiences && (
              <span className="flex flex-wrap justify-between items-center">
                {errors.experiences.duration && (
                  <FormError errors={errors.experiences.duration.message} />
                )}
                {errors.experiences.position && (
                  <FormError errors={errors.experiences.position.message} />
                )}
                {errors.experiences.description && (
                  <FormError errors={errors.experiences.description.message} />
                )}
              </span>
            )}
            <div className="w-full flex flex-wrap justify-between items-center">
              <input
                type="number"
                placeholder="Work Duration (in years)"
                {...register("experiences.duration", {
                  required: "Work duration is required",
                })}
                className="mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300"
              />
              <input
                type="text"
                placeholder="Your Position"
                {...register("experiences.position", {
                  required: "Position is required",
                })}
                className="mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300"
              />
            </div>
            <textarea
              type="text"
              placeholder="Work Description"
              {...register("experiences.description", {
                required: "Description is required",
              })}
              rows={8}
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300"
            />

            <button
              type="button"
              onClick={() => {
                const duration = getValues("experiences.duration");
                const position = getValues("experiences.position");
                const description = getValues("experiences.description");
                if (!duration || !position || !description) return;
                addExperience({
                  duration,
                  position,
                  description,
                });
                setValue("experiences.duration", "");
                setValue("experiences.position", "");
                setValue("experiences.description", "");
                setShowExperienceForm(false);
              }}
              className="bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 mb-2"
            >
              Add
            </button>
          </div>
        )}

        <button
          type="button"
          className={`w-full ${
            showExperienceForm
              ? "bg-red-600 hover:bg-red-700 active:bg-red-800"
              : "bg-blue-600 hover:bg-blue-700 "
          } text-white uppercase mb-4 px-7 py-3 text-sm font-medium rounded shadow-md transition duration-150 ease-in-out hover:shadow-lg`}
          onClick={() => toggleExperienceForm()}
        >
          {showExperienceForm
            ? "Don't wanna Add?"
            : experiences.length > 0
            ? "Add More Experience"
            : "Add Experience"}
        </button>

        {/* Showing added experience */}
        {experiences?.length === 0 || (
          <div className="mb-4">
            <h2 className="text-xl font-semibold tracking-wide uppercase mt-2 mb-1">
              Experiences
            </h2>
            <ul className="space-y-2">
              {experiences?.map((experience, index) => (
                <li key={index} className="list-disc font-semibold space-y-1">
                  <h3 className="text-md uppercase flex justify-between items-start">
                    {experience.position}{" "}
                    <button
                      onClick={() => removeExperience(index)}
                      type="button"
                      className="font-medium bg-red-600 text-white text-xs uppercase px-2 py-1 rounded-sm"
                    >
                      Remove
                    </button>
                  </h3>
                  <h5 className="font-medium">
                    <span className="font-semibold uppercase">Duration: </span>
                    {experience.duration} year/s
                  </h5>
                  <p className="font-medium text-justify">
                    <span className="font-semibold uppercase">
                      Description:{" "}
                    </span>
                    {experience.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-2 justify-center mb-4">
          <label className="text-md font-medium tracking-wide text-gray-500">
            Skills (You can add more)
          </label>
          {errors.skills && <FormError errors={errors.skills.message} />}
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="text"
              {...register("skills.skill")}
              className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300"
            />
            <button
              type="button"
              className="bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
              onClick={() => {
                const skill = getValues("skills.skill");
                if (!skill || skills.includes(skill.toLowerCase())) {
                  setError("skills", {
                    type: "required",
                    message:
                      "Please enter at least one skill or ensure that the skills are unique",
                  });
                  return;
                }
                clearErrors("skills");
                addSkill(skill.toLowerCase());
                setValue("skills.skill", "");
              }}
            >
              +
            </button>
          </div>
          {/* Showing added skills */}
          {skills?.length === 0 || (
            <ul className="flex flex-wrap gap-2 items-center">
              {skills?.map((skill, index) => (
                <li
                  key={index}
                  className="list-none text-gray-400 bg-gray-200 px-2"
                >
                  <p className="text-md uppercase flex gap-1">
                    {skill}
                    <button
                      onClick={() => removeSkill(index)}
                      type="button"
                      className="font-medium"
                    >
                      X
                    </button>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Availability */}
        <label className="text-md font-medium tracking-wide text-gray-500 flex gap-1 items-center mb-4">
          <input
            type="checkbox"
            {...register("isAvailable")}
            defaultChecked={isAvailable} // Set the initial switch value to active
          />
          Availability
        </label>
        <button
          type="submit"
          className="bg-blue-600 w-full text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddPortfolioPage;
