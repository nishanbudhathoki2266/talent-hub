// pages/portfolio-details.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddPortfolioPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [experiences, setExperiences] = useState([]);

  const [showExperienceForm, setShowExperienceForm] = useState(true);

  const toggleExperienceForm = () => {
    setShowExperienceForm((currState) => !currState);
  };

  const [skills, setSkills] = useState([]);

  console.log("STATE EXP: ", experiences);

  const addExperience = ({ duration, position, description }) => {
    setExperiences([...experiences, { duration, position, description }]);
  };

  const removeExperience = (index) => {
    console.log("You clicked index: ", index);
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index + 1));
  };

  const onSubmit = (data) => {
    // Submit the data to your backend
    // console.log(data);

    console.log({
      ...data,
      experiences: experiences.filter((exp) => exp.hasOwnProperty("duration")),
    });

    // TODO: Submit formattedData to your backend
  };

  return (
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className="text-3xl text-center mt-6 font-bold">Add Portfolio</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-[50%] mt-6 px-3"
      >
        <div>
          <label className="text-md font-medium tracking-wide text-gray-500">
            Position
          </label>
          <input
            type="text"
            {...register("position", {
              required: "Position is required",
            })}
            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded"
          />
          {errors.position && <p>{errors.position.message}</p>}
        </div>
        <div>
          <label className="text-md font-medium tracking-wide text-gray-500">
            Bio
          </label>
          <textarea
            {...register("bio", {
              required: "Bio is required",
              maxLength: 1000,
            })}
            className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300"
          />
          {errors.bio && <p>{errors.bio.message}</p>}
        </div>
        {showExperienceForm && (
          <div className="flex flex-col">
            <label className="text-md font-medium tracking-wide text-gray-500">
              Experiences (Add as many you want - One at a time)
            </label>

            <div className="w-full flex flex-wrap justify-between items-center">
              <input
                type="number"
                placeholder="Work Duration (in years)"
                {...register(`duration`, {
                  required: "Work duration is required",
                })}
                className="mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300"
              />
              <input
                type="text"
                placeholder="Your Position"
                {...register(`position`, {
                  required: "Position is required",
                })}
                className="mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300"
              />
            </div>
            <textarea
              type="text"
              placeholder="Work Description"
              {...register(`description`, {
                required: "Description is required",
              })}
              className="mb-6 w-full min-h-[12vh] px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300"
            />

            <button
              type="button"
              onClick={() => {
                const duration = getValues("duration");
                const position = getValues("position");
                const description = getValues("description");
                if (!duration || !position || !description) return;
                addExperience({
                  duration,
                  position,
                  description,
                });
                setValue("duration", "");
                setValue("position", "");
                setValue("description", "");
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
          className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 mb-2"
          onClick={() => toggleExperienceForm()}
        >
          {showExperienceForm
            ? "Don't wanna Add?"
            : experiences.length > 0
            ? "Add More"
            : "Add Experience"}
        </button>

        <h2 className="text-2xl font-bold">Your Experiences</h2>
        {experiences
          .filter((exp) => exp.hasOwnProperty("duration"))
          .map((filteredExp) => (
            <p>{filteredExp.position}</p>
          ))}

        <div>
          <label>Skills</label>
          <ul>
            {skills.map((_, index) => (
              <li key={index}>
                <input
                  type="text"
                  placeholder="Skill"
                  {...register(`skills.${index}`, {
                    required: "Skill is required",
                  })}
                />
                <button type="button" onClick={() => removeSkill(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={addSkill}>
            Add Skill
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default AddPortfolioPage;
