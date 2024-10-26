import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-[#1E1E2C] shadow-md">
      <div className="text-[#EAEAEA] flex justify-between items-center max-w-7xl mx-auto p-3">
        {/* Logo */}
        <h1 className="">Moodify</h1>

        {/* Search bar */}

        <form className="p-3 rounded-lg flex items-center w-full max-w-lg">
          <input
            type="text"
            placeholder="Search for songs, artists..."
            className="bg-transparent focus:outline-none w-full lg:w-full border-b-2 p-2"
          />
          <button>
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
          <Link to="/">
            <li className="hover:text-[#00C9A7] transition-colors">Profile</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
