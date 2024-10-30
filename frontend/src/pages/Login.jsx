import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginstart,
  loginfailure,
  loginsuccess,
} from "../redux/user/userSlice.js";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState(true); // Track the mode (login or signup)
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  // Toggle between login and signup views
  const toggleLogin = () => setLogin(!login);

  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  //this event listener is form handling change in form data basically
  //adding states to the formdata and updating as we type in input boxes
  const handleChange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value, // Make sure input names match formData keys
    });

    console.log(formdata);
  };

  //this function is for handling submission of form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await fetch("/backend/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });

      // Check if the response is OK (status in the range 200–299)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Attempt to parse JSON only if there's a valid response body
      const data = await res.json();
      if (data.success === false) {
        setloading(false);
        seterror(data.message || "Signup failed!");
        setMessageType("error");
        setMessage("Signup failed!");
        return;
      }

      setloading(false);
      seterror(null);
      setMessageType("success");
      setMessage("Signup successful!");

      // Redirect to login view after success
      setTimeout(() => {
        toggleLogin(); // Switch to login view
      }, 1000);
      console.log(data);
    } catch (error) {
      setloading(false);
      seterror(error.message);
      setMessageType("error");
      setMessage("Invalid Credentials or Fill all the fields");
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  //login functionality
  const [loginformdata, setloginformdata] = useState({});

  const handleloginchange = (e) => {
    setloginformdata({
      ...loginformdata,
      [e.target.id]: e.target.value, //here spread is use to add or update the current object
    });
  };

  const { loginloading, loginerror } = useSelector((state) => state.user);
  const handleloginsubmit = async (e) => {
    e.preventDefault();
    dispatch(loginstart());
    try {
      const res = await fetch("/backend/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginformdata),
      });

      // Check if the response is OK (status in the range 200–299)
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      // Attempt to parse JSON only if there's a valid response body
      const data = await res.json();
      if (data.success === false) {
        dispatch(loginfailure(data.message));
        setMessageType("error");
        setMessage("Login failed!");
        return;
      }

      dispatch(loginsuccess(data));
      setMessageType("success");
      setMessage("Login successful!");

      // Redirect to login view after success
      navigate("/");
      console.log(data);
    } catch (error) {
      dispatch(loginfailure(error.message));
      setMessageType("error");
      setMessage("Invalid Credentials");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] min-h-screen flex items-center justify-center relative">
      {message && (
        <div
          className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg border-2 ${
            messageType === "success"
              ? "bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] border-green-600 "
              : "bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] border-red-600"
          } text-white z-50 animate-slide-in`}
        >
          {message}
        </div>
      )}

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
            <h1 className="text-5xl font-semibold mb-10">Login</h1>
            <form onSubmit={handleloginsubmit} className="space-y-6">
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  onChange={handleloginchange}
                  placeholder="Enter your email"
                  className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
                />
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input
                  onChange={handleloginchange}
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00FFAB] to-[#00D1FF] text-gray-900 py-4 rounded-lg font-semibold hover:from-[#00D1FF] hover:to-[#00FFAB] transition transform hover:scale-105"
              >
                {loginloading ? "Loading.." : "Login"}
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
            <h1 className="text-5xl font-semibold mb-10">Create an Account</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your name"
                  className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2">Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
                />
              </div>
              <button
                disabled={loading}
                type="submit"
                className="w-full bg-gradient-to-r from-[#00FFAB] to-[#00D1FF] text-gray-900 py-4 rounded-lg font-semibold hover:from-[#00D1FF] hover:to-[#00FFAB] transition transform hover:scale-105"
              >
                {loading ? "Loading.." : "Sign Up"}
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
