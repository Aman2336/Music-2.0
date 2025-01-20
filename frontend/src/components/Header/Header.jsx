import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { current } from "@reduxjs/toolkit";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [query, setquery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  console.log(currentUser);
  // console.log("current user photo ", currentUser.currentUser.photo);
  const handlechange = (e) => {
    setquery(e.target.value); // Update the query state on input change
  };

  const handlesearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    try {
      const response = await axios.get(`/backend/spotify/search?q=${query}`); // API call to search tracks and artists
      setResults(response.data); // Update results state with response data
      console.log(response.data);
      navigate("/results", { state: { results: response.data } });
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <header className="bg-[#1E1E2C] shadow-md">
      <div className="text-[#EAEAEA] flex justify-between items-center max-w-7xl mx-auto p-3">
        {/* Logo */}
        <img
          src="public/images/new.png"
          alt="Moodify"
          className="h-24 mt-2 w-auto object-contain"
        />

        {/* Search bar */}

        <form
          onSubmit={handlesearch}
          className="p-3 rounded-lg flex items-center w-full max-w-lg"
        >
          <input
            onChange={handlechange}
            type="text"
            placeholder="Search for songs, artists..."
            className="bg-transparent focus:outline-none w-full lg:w-full border-b-2 p-2"
          />
          <button type="submit">
            <FaSearch className="text-[#EAEAEA]" />
          </button>

          <span className="absolute left-0 bottom-1 w-full h-[1px] bg-slate-400 transition-transform duration-300 scale-x-0 origin-left focus-within:scale-x-100"></span>
        </form>

        {/* Navigation Links */}
        <ul className="right-insert-1 flex space-x-6 text-[#EAEAEA]">
          <Link to="/">
            <li className="hidden sm:inline hover:text-[#3A6EA5] transition-colors">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hover:text-[#8A2BE2] transition-colors">About</li>
          </Link>
          <Link to="/profile">
            {currentUser?.photo ? (
              <img
                className="object-cover w-8 h-8 rounded-lg "
                src={currentUser.photo}
                alt="profile"
              />
            ) : (
              <li className="hover:text-[#00C9A7] transition-colors">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
