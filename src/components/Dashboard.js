// src/components/Dashboard.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import CoursesPage from "./CoursesPage";
import GamesPage from "./GamesPage";

export default function Dashboard() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-900 text-white p-4 overflow-auto">
          <Routes>
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route
              path="/"
              element={
                <div className="p-4">
                  <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
                  <p className="text-gray-400">Welcome to the Admin Dashboard.</p>
                  <p className="text-gray-400">Navigate to Courses or Games.</p>
                  <p className="text-gray-400">
                    <Link to="/courses" className="text-blue-500 hover:text-blue-600">
                      Go to Courses
                    </Link>
                  </p>
                  <p className="text-gray-400">
                    <Link to="/games" className="text-blue-500 hover:text-blue-600">
                      Go to Games
                    </Link>
                  </p>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}