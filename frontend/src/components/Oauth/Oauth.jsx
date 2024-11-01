import { FcGoogle } from "react-icons/fc";
export default function Oauth() {
  return (
    <button className="w-full bg-gradient-to-r from-[#00FFAB] to-[#00D1FF] text-gray-900 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:from-[#00C9A7] hover:to-[#3A6EA5] transition-transform transform hover:scale-105 mt-4">
      <FcGoogle size={24} />
      <span>Sign in with Google</span>
    </button>
  );
}
//className="w-full bg-gradient-to-r from-[#00FFAB] to-[#00D1FF] text-gray-900 py-4 rounded-lg font-semibold hover:from-[#00D1FF] hover:to-[#00FFAB] transition transform hover:scale-105 mt-4"
//className="w-full bg-gradient-to-r from-[#3A6EA5] to-[#00C9A7] text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:from-[#00C9A7] hover:to-[#3A6EA5] transition-transform transform hover:scale-105 mt-4"