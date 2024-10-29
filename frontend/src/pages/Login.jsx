import { useState } from "react";

export default function Login() {
  const [login, setLogin] = useState(true); // Track the mode (login or signup)
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

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
        seterror(error.message);
        return;
      }
      setloading(false);
      console.log(data);
    } catch (error) {
      setloading(false);
      seterror(error.message);
    }
  };
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
            <h1 className="text-5xl font-semibold mb-10">Login</h1>
            <form className="space-y-6">
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  id="email"
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
            {error && <p className="text-red-600 mt-5">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
