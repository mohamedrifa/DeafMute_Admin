// src/components/CourseForm.js
import React, { useState } from "react";
import { database, ref, push, set } from "../firebase";

export default function CourseForm() {
  const [course, setCourse] = useState({
    courseIconUrl: "",
    courseName: "",
    description: "",
    level: "Beginner",
    price: 0,
    rating: 0,
    language: "en",
    tutorials: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tutorials") {
      setCourse((prevCourse) => ({
        ...prevCourse,
        tutorials: value.split(","),
      }));
    } else {
      setCourse((prevCourse) => ({
        ...prevCourse,
        [name]: value,
      }));
    }
  };

  const handleAddTutorial = () => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      tutorials: [...prevCourse.tutorials, { name: "", url: "" }],
    }));
  };

  const handleTutorialChange = (index, field, value) => {
    setCourse((prevCourse) => {
      const newTutorials = [...prevCourse.tutorials];
      newTutorials[index] = {
        ...newTutorials[index],
        [field]: value,
      };
      return { ...prevCourse, tutorials: newTutorials };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const courseRef = push(ref(database, `courses/${course.language}`));
    set(courseRef, {
      ...course,
      enrolledUsers: {},
      enrollmentCount: 0,
      tutorials: course.tutorials.reduce((acc, tutorial, index) => {
        acc[`tutorial${index + 1}`] = tutorial;
        return acc;
      }, {}),
    });
    setCourse({
      courseIconUrl: "",
      courseName: "",
      description: "",
      level: "Beginner",
      price: 0,
      rating: 0,
      language: "en",
      tutorials: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Course Image URL</label>
        <input
          name="courseIconUrl"
          value={course.courseIconUrl}
          onChange={handleChange}
          required
          className="w-full text-black p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Course Name</label>
        <input
          name="courseName"
          value={course.courseName}
          onChange={handleChange}
          required
          className="w-full text-black p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Description</label>
        <textarea
          name="description"
          value={course.description}
          onChange={handleChange}
          required
          className="w-full text-black p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Level</label>
        <input
          name="level"
          value={course.level}
          onChange={handleChange}
          className="w-full text-black p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Price</label>
        <input
          name="price"
          type="number"
          value={course.price}
          onChange={handleChange}
          className="w-full text-black p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Rating</label>
        <input
          name="rating"
          type="number"
          step="0.1"
          value={course.rating}
          onChange={handleChange}
          className="w-full text-black p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Language</label>
        <select
          name="language"
          value={course.language}
          onChange={handleChange}
          className="w-full text-black p-2 border border-gray-300 rounded"
        >
          <option value="en">English</option>
          <option value="ta">Tamil</option>
          {/* Add more languages as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Tutorials</label>
        {course.tutorials.map((tutorial, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              name={`tutorials[${index}].name`}
              value={tutorial.name}
              onChange={(e) => handleTutorialChange(index, "name", e.target.value)}
              className="w-full text-black p-2 border border-gray-300 rounded mr-2"
              placeholder="Tutorial Name"
            />
            <input
              name={`tutorials[${index}].url`}
              value={tutorial.url}
              onChange={(e) => handleTutorialChange(index, "url", e.target.value)}
              className="w-full text-black p-2 border border-gray-300 rounded mr-2"
              placeholder="Tutorial URL"
            />
            <button
              type="button"
              onClick={() => {
                setCourse((prevCourse) => ({
                  ...prevCourse,
                  tutorials: prevCourse.tutorials.filter((_, i) => i !== index),
                }));
              }}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddTutorial}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Add Tutorial
        </button>
      </div>
      <button
        type="submit"
        className="w-full text-black p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Course
      </button>
    </form>
  );
}