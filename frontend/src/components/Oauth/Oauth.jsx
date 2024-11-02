import PropTypes, { string } from "prop-types";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { loginsuccess } from "../../redux/user/userSlice.js";
import { app } from "../../firebase.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Oauth({ id }) {
  const dispatch = useDispatch();
  const val = id;
  const handlegoogleclick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/backend/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(loginsuccess(data));
    } catch (error) {
      console.log("Cannot Sign In with Google", error);
    }
  };
  return (
    <button
      onClick={handlegoogleclick}
      type="button"
      className="w-full bg-gradient-to-r from-[#FF4E50] to-[#FF6A6A] text-gray-900 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:from-[#D64545] hover:to-[#FF4E50] transition-transform transform hover:scale-105 mt-4"
    >
      <svg
        className="w-6 h-6 fill-current text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
      >
        <path d="M44.5 20H24v8.5h11.7C34.8 33.9 30.4 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.7 4.3 29.6 2 24 2 11.9 2 2 11.9 2 24s9.9 22 22 22c11 0 20.2-8.6 20.2-22.2 0-1.5-.2-2.8-.5-4.3z" />
      </svg>
      {val === "signup" ? "Sign Up with Google" : "Sign in with Google"}
    </button>
  );
}

Oauth.propTypes = {
  id: PropTypes.string.isRequired,
};
//className="w-full bg-gradient-to-r from-[#00FFAB] to-[#00D1FF] text-gray-900 py-4 rounded-lg font-semibold hover:from-[#00D1FF] hover:to-[#00FFAB] transition transform hover:scale-105 mt-4"
//className="w-full bg-gradient-to-r from-[#3A6EA5] to-[#00C9A7] text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:from-[#00C9A7] hover:to-[#3A6EA5] transition-transform transform hover:scale-105 mt-4"
