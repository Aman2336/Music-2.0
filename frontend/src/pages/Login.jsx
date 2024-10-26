export default function Login() {
  return (
    <div className="bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] min-h-screen flex items-center justify-center">
      {/* image section */}
      <div className="flex flex-col md:flex-row w-[100%] md:w-[100%] lg:w-[80%] xl:w-[70%] h-[80vh] bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] text-white rounded-lg shadow-2xl overflow-hidden">
        {/* Image Section */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-orange-400">
          <img
            src="/public/images/08.jpg"
            alt="Moodify"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10">
          <h1 className="text-5xl font-bold text-center mb-8">Moodify</h1>

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
          <div className="mt-6 flex gap-2 ">
            <p>Dont have an account?</p>
            <a
              href="/signup"
              className="text-[#00FFAB] hover:underline text-sm"
            >
              Signup
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
