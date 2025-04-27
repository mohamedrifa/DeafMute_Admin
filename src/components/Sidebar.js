import React from "react";
import { Link } from "react-router-dom";
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Sidebar() {
  const handleSignOut = async() => {
    try {
      await signOut(auth);
      } catch (err) {
      }
  };

  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4 flex flex-col justify-between">
      <div>
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

      <div>
        <button
          onClick={handleSignOut}
          className="text-lg hover:text-red-500 focus:outline-none"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
