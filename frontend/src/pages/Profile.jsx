import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  updatestart,
  updatesuccess,
  updatefailure,
  deletesuccess,
  deletestart,
  deletefailure,
  signoutstart,
  signoutsuccess,
  signoutfailure,
} from "../redux/user/userSlice.js";
import axios from "axios";
import { current } from "@reduxjs/toolkit";
export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);
  console.log(formData);
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updatestart());
      const res = await fetch(`backend/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updatefailure(data.message));
        return;
      }
      dispatch(updatesuccess(data));
    } catch (error) {
      dispatch(updatefailure(error.message));
    }
  };
  //handling delete account
  const handledelete = async () => {
    try {
      dispatch(deletestart());
      const res = await fetch(`/backend/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deletefailure(data));
        return;
      }
      dispatch(deletesuccess(data));
    } catch (error) {
      dispatch(deletefailure(error.message));
    }
  };

  const handlesignout = async () => {
    try {
      dispatch(signoutstart());
      const res = await fetch("backend/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signoutfailure(data.message));
        return;
      }
      dispatch(signoutsuccess(data));
    } catch (error) {
      console.log(error.message);
      dispatch(signoutfailure(error.message));
    }
  };

  const [likedsongs, setlikedsongs] = useState([]);

  useEffect(() => {
    setlikedsongs(currentUser?.likedSongs || []);
  }, [currentUser]);

  const [toggle, settoggle] = useState(false);
  const handleshowlikedsongs = () => {
    console.log(likedsongs);
    settoggle(true);
  };

  const handleremovelike = async (track) => {
    try {
      const updatedSongs = likedsongs.filter(
        (song) => song.trackId !== track.trackId
      );
      setlikedsongs(updatedSongs); // Optimistic update

      const response = await axios.post("/backend/user/remove-like", {
        userId: currentUser?._id,
        trackId: track.trackId,
      });

      console.log("Backend Response:", response.data); // Check the response data

      if (response.data.success) {
        setlikedsongs(response.data.likedSongs); // Ensure backend sends the updated likedSongs
      } else {
        setlikedsongs(likedsongs); // Restore if failed
        alert("Failed to remove from liked songs.");
      }
    } catch (error) {
      console.error("Error removing like:", error);
      setlikedsongs(likedsongs); // Restore state if error occurs
      alert("Error occurred while removing the song.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row w-full md:w-[90%] h-auto md:h-[90vh] bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] text-white rounded-lg shadow-2xl overflow-hidden mt-10">
        {/* Profile Image Section */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <img
            src="/public/images/11.jpg"
            alt="profile Moodify"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Profile Form Section */}
        <div className="w-full md:w-1/2 px-8 py-10 flex flex-col ">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Profile</h1>

          <form onSubmit={handlesubmit} className="space-y-6">
            {/* Profile Picture */}
            <img
              className="rounded-full items-center self-center w-24 h-24 mb-4"
              src={currentUser?.photo || "https://via.placeholder.com/150"}
              alt="User Profile"
            />

            {/* Username Input */}
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
            />

            {/* Email Input */}
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
            />

            {/* Update Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#00FFAB] to-[#00D1FF] text-gray-900 py-3 rounded-lg font-semibold hover:from-[#00D1FF] hover:to-[#00FFAB] transform hover:scale-105 transition"
            >
              Update
            </button>
          </form>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-between text-sm">
            <button
              onClick={handledelete}
              className="text-[#00FFAB] hover:underline"
            >
              Delete Account
            </button>
            <button
              onClick={handlesignout}
              className="text-[#00FFAB] hover:underline"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Liked Songs Button */}
      <div className="w-full flex justify-center mt-5">
        <button
          onClick={handleshowlikedsongs}
          className="text-white text-xl  mt-2 hover:text-[#00FFAB] transition"
        >
          Show Liked Songs
        </button>
      </div>
      {/* Liked Songs Section */}
      {toggle && (
        <div className="w-full bg-gray-800 mt-8 px-8 py-6">
          <h2 className="text-2xl font-bold text-white mb-4">Liked Songs</h2>
          <div
            style={{
              maxHeight: "450px", // Adjust height as needed
              overflowY: "auto", // Enable vertical scrolling
            }}
          >
            <ul className="space-y-4">
              {likedsongs.length > 0 ? (
                likedsongs.slice(0, 4).map((song, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between bg-gray-700 p-4 rounded-lg hover:bg-gray-600"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={song.albumArt}
                        alt={song.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-lg text-white font-semibold">
                          {song.title}
                        </h3>
                        <p className="text-sm text-gray-400">{song.artist}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleremovelike(song)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">No liked songs to show.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
