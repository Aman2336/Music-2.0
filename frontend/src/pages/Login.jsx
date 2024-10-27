import { useState } from "react";

export default function Login() {
  const [login, setLogin] = useState(true); // Track the mode (login or signup)

  // Toggle between login and signup views
  const toggleLogin = () => setLogin(!login);

  return (
    <div className="bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] min-h-screen flex items-center justify-center relative">
      {/* Wrapper for both sections */}
      <div className="absolute flex flex-col md:flex-row w-[100%] md:w-[100%] lg:w-[90%] xl:w-[90%] h-[90vh] bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] text-white rounded-lg shadow-[#12121c] shadow-2xl overflow-hidden">
        {/* Login Section */}
        <div
          className={`absolute inset-0 flex md:flex-row items-center transition-all duration-700 ease-in-out ${
            login ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
        >
          {/* Login Image */}
          <div
            className="hidden md:flex w-1/2 items-center object-fit
           justify-center bg-orange-400"
          >
            <img
              src="/public/images/08.jpg"
              alt="Login Moodify"
              className="w-full h-full object-cover "
            />
          </div>

          {/* Login Form */}
          <div className="w-full md:w-1/2 p-10">
            <h1 className="text-5xl font-semibold mb-10">
              Login
            </h1>
            <form className="space-y-6">
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
                />
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00FFAB] to-[#00D1FF] text-gray-900 py-4 rounded-lg font-semibold hover:from-[#00D1FF] hover:to-[#00FFAB] transition transform hover:scale-105"
              >
                Login
              </button>
            </form>
            <div className="mt-6 flex gap-2">
              <p>Don`t have an account?</p>
              <button
                onClick={toggleLogin}
                className="text-[#00FFAB] hover:underline text-sm"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>

        {/* Signup Section */}
        <div
          className={`absolute inset-0 flex md:flex-row-reverse items-center transition-all duration-700 ease-in-out ${
            login ? "opacity-0 -translate-x-full" : "opacity-100 translate-x-0"
          }`}
        >
          {/* Signup Image */}
          <div className="hidden md:flex w-1/2 items-center justify-center bg-blue-400">
            <img
              src="/public/images/09.jpg"
              alt="Signup Moodify"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Signup Form */}
          <div className="w-full md:w-1/2 p-10">
            <h1 className="text-5xl font-semibold mb-10">
              Create an Account
            </h1>
            <form className="space-y-6">
              <div>
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
                />
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00FFAB] to-[#00D1FF] text-gray-900 py-4 rounded-lg font-semibold hover:from-[#00D1FF] hover:to-[#00FFAB] transition transform hover:scale-105"
              >
                Sign Up
              </button>
            </form>
            <div className="mt-6 flex gap-2">
              <p>Already have an account?</p>
              <button
                onClick={toggleLogin}
                className="text-[#00FFAB] hover:underline text-sm"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
