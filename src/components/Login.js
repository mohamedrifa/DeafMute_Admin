// App.js
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
  signOut
} from 'firebase/auth';
// import Dashboard from './Dashboard';

// Initialize Firebase - replace with your config
const firebaseConfig = {
    apiKey: "AIzaSyApOeqHia2T0eIjq9P9GJx7ADqLwjfU4pw",
    authDomain: "deafmute-6be1a.firebaseapp.com",
    databaseURL: "https://deafmute-6be1a-default-rtdb.firebaseio.com",
    projectId: "deafmute-6be1a",
    storageBucket: "deafmute-6be1a.firebasestorage.app",
    messagingSenderId: "1015536886471",
    appId: "1:1015536886471:web:7a6446cca4627b2ca7d4e2",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("Auth state changed:", currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleAuthentication = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
    }
  };

return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {user ? (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-teal-400">Welcome, {user.email}!</h2>
                <p className="mt-4 text-gray-300">You are now signed in.</p>
                <button
                    onClick={() => {
                        window.location.href = '/dashboard'; // Redirect to the dashboard
                    }}
                    className="mt-6 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    Go to Dashboard
                </button>
                <button
                    onClick={handleSignOut}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Sign Out
                </button>
            </div>
        ) : (
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-400">
                        {isSignUp ? 'Create Account' : 'Sign In'}
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleAuthentication}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-700 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm py-2 text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </span>
                            ) : null}
                            {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4">
                    <button
                        type="button"
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-sm text-teal-400 hover:text-teal-300 focus:outline-none"
                    >
                        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </div>
        )}
    </div>
);
}

export default App;