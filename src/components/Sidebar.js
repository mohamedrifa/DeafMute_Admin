// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <nav>
        <ul>
          <li className="mb-4">
            <Link to="/courses" className="text-lg hover:text-blue-500">
              Courses
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/games" className="text-lg hover:text-blue-500">
              Games
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}