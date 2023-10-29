// pages/portfolio-details.js
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddPortfolioPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { duration: "", position: "", description: "" },
    ]);
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const onSubmit = (data) => {
    // Submit the data to your backend
    console.log(data);
    const formattedData = {
      experiences: experiences.map((experience) => ({
        year: experience.year,
        work: experience.work,
      })),
      skills: skills,
    };

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
        <div>
          <label>Experiences</label>
          <ul>
            {experiences.map((_, index) => (
              <li key={index}>
                <input
                  type="number"
                  placeholder="Work Duration (in years)"
                  {...register(`experiences.${index}.duration`, {
                    required: "Work duration is required",
                  })}
                />
                <input
                  type="text"
                  placeholder="Your Position"
                  {...register(`experiences.${index}.position`, {
                    required: "Position is required",
                  })}
                />
                <textarea
                  type="text"
                  placeholder="Work Description"
                  {...register(`experiences.${index}.description`, {
                    required: "Description is required",
                  })}
                />
                <button type="button" onClick={() => removeExperience(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={addExperience}>
            Add Experience
          </button>
        </div>
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
