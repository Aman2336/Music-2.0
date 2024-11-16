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
  useEffect(() =>{
    setlikedsongs(currentUser?.likedSongs || []);
  },[currentUser]);
  const [ toggle,settoggle] = useState(false);
  const handleshowlikedsongs=()=>{
    settoggle(true);
  }
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
            <form onSubmit={handlesubmit} className="space-y-6 flex flex-col">
              <img
                className="rounded-full self-center w-24 h-24"
                src={currentUser?.photo}
                alt="Current User"
              />

              <input
                type="text"
                id="username"
                placeholder="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
              />

              <input
                type="email"
                id="email"
                placeholder="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
                className="w-full p-4 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#00FFAB]"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00FFAB] to-[#00D1FF] text-gray-900 py-4 rounded-lg font-semibold hover:from-[#00D1FF] hover:to-[#00FFAB] transition transform hover:scale-105"
              >
                Update
              </button>
            </form>
            <div className="mt-6  justify-between flex gap-2">
              <button
                onClick={handledelete}
                className="text-[#00FFAB] hover:underline text-sm"
              >
                Delete Account
              </button>
              <button
                onClick={handlesignout}
                className="text-[#00FFAB] hover:underline text-sm"
              >
                Sign Out
              </button>
            </div>
            <span onclick={handleshowlikedsongs}>Show Liked Songs</span>
          
          </div>
        </div>
      </div>
    </div>
  );
}
