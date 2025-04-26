// src/components/CourseList.js
import React, { useEffect, useState } from "react";
import { database, ref, onValue, remove, update } from "../firebase";

export default function CourseList() {
  const [courses, setCourses] = useState({});
  const [editCourseId, setEditCourseId] = useState(null);
  const [editCourseData, setEditCourseData] = useState({});
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const courseRef = ref(database, `courses/${language}`);
    onValue(courseRef, (snapshot) => {
      const data = snapshot.val();
      setCourses(data || {});
    });
  }, [language]);

  const deleteCourse = (courseId) => {
    const courseRef = ref(database, `courses/${language}/${courseId}`);
    remove(courseRef);
  };

  const handleEditClick = (courseId) => {
    setEditCourseId(courseId);
    setEditCourseData(courses[courseId]);
  };

  const handleEditSubmit = (courseId, updatedCourse) => {
    const courseRef = ref(database, `courses/${language}/${courseId}`);
    update(courseRef, updatedCourse);
    setEditCourseId(null);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Language</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="w-full text-black p-2 border border-gray-300 rounded"
        >
          <option value="en">English</option>
          <option value="ta">Tamil</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(courses).map(([id, course]) => (
          <div
            key={id}
            className="border border-gray-300 p-4 mb-4 rounded bg-gray-800"
          >
            <img
              src={course.courseIconUrl}
              alt=""
              width="100"
              className="w-full h-60 object-fit rounded mb-3"
              height="100"
            />
            <h3 className="text-xl font-bold">{course.courseName}</h3>
            <p className="text-gray-400">{truncateText(course.description, 100)}</p>
            <p className="text-gray-400">Level: {course.level}</p>
            <p className="text-gray-400">Price: ₹{course.price}</p>
            <p className="text-gray-400">Rating: ⭐ {course.rating}</p>
            <p className="text-gray-400">Enrolled: {course.enrollmentCount}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => deleteCourse(id)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => handleEditClick(id)}
                className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
      {editCourseId && (
        <div className="fixed inset-0 text-black bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg relative">
            <button
              onClick={() => setEditCourseId(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
              title="Close"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit Course</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleEditSubmit(editCourseId, editCourseData);
              }}
              className="grid gap-4"
            >
              <input
                name="courseIconUrl"
                placeholder="Course Image URL"
                value={editCourseData.courseIconUrl}
                onChange={(e) =>
                  setEditCourseData({ ...editCourseData, courseIconUrl: e.target.value })
                }
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <input
                name="courseName"
                placeholder="Course Name"
                value={editCourseData.courseName}
                onChange={(e) =>
                  setEditCourseData({ ...editCourseData, courseName: e.target.value })
                }
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={editCourseData.description}
                onChange={(e) =>
                  setEditCourseData({ ...editCourseData, description: e.target.value })
                }
                required
                rows={3}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <input
                name="level"
                placeholder="Level (Beginner/Intermediate/Advanced)"
                value={editCourseData.level}
                onChange={(e) =>
                  setEditCourseData({ ...editCourseData, level: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-lg"
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                value={editCourseData.price}
                onChange={(e) =>
                  setEditCourseData({ ...editCourseData, price: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-lg"
              />
              <input
                name="rating"
                type="number"
                step="0.1"
                placeholder="Rating"
                value={editCourseData.rating}
                onChange={(e) =>
                  setEditCourseData({ ...editCourseData, rating: e.target.value })
                }
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditCourseId(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}