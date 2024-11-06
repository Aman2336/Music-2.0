import { useSelector } from "react-redux";
export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] min-h-screen p-5 flex flex-col items-center justify-center">
      <div className="relative flex flex-col md:flex-row w-full md:w-[90%] h-[90vh] bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] text-white rounded-lg shadow-[#12121c] shadow-2xl overflow-hidden">
        {/* profile Section */}
        <div
          className={`flex md:flex-row items-center transition-all duration-700 ease-in-out ${
            Profile ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
        >
          {/* Profile Image */}
          <div className="hidden md:flex w-full items-center justify-center bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15]">
            <img
              src="/public/images/11.jpg"
              alt="profile Moodify"
              className="object-cover h-full w-full"
            />
          </div>

          {/* Profile Form */}
          <div className="w-full md:w-1/2 px-10 py-8">
            <h1 className="text-5xl font-semibold text-center mb-4">Profile</h1>
            <form className="space-y-6 flex flex-col">
              <img
                className="rounded-full self-center w-24 h-24"
                src={currentUser?.photo}
                alt="Current User"
              />

              <input
                type="text"
                id="username"
                placeholder="username"
                className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
              />

              <input
                type="email"
                id="email"
                placeholder="email"
                className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
              />
            </form>
            <div className="mt-6  justify-between flex gap-2">
              <button className="text-[#00FFAB] hover:underline text-sm">
                Delete Account
              </button>
              <button className="text-[#00FFAB] hover:underline text-sm">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
