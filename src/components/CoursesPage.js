// src/components/CoursesPage.js
import React, { useState } from "react";
import CourseForm from "./CourseForm";
import CourseList from "./CourseList";

export default function CoursesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Courses</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
      >
        {showForm ? "Hide Form" : "Add Course"}
      </button>
      {showForm && <CourseForm />}
      <CourseList />
    </div>
  );
}