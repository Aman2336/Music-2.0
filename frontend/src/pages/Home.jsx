import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] min-h-screen p-5 flex flex-col items-center">
      {/* Hero Section */}
      <h1 className="text-[#EAEAEA] text-5xl font-bold mb-6">
        Welcome to <span className="text-[#8A2BE2]">Moodify</span>
      </h1>
      <p className="text-[#A9A9A9] text-lg mb-8 max-w-3xl text-center">
        Your personalized music companion. Discover songs, artists, and
        playlists that perfectly match your mood. Tune in to every genre, vibe,
        and moment.
      </p>

      <button className="bg-[#8A2BE2] text-white py-3 px-6 rounded-lg text-lg font-medium shadow-lg transition-transform duration-300 hover:scale-110 hover:bg-[#3A6EA5]">
        Get Started
      </button>

      {/* Promotional Section */}
      <div className="mt-12 text-center w-full px-4">
        <h2 className="text-[#EAEAEA] text-3xl font-semibold mb-6">
          🎶 Explore Music Like Never Before 🎶
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#29293F] p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-[#8A2BE2] text-xl font-bold mb-3">
              Listen to Every Genre
            </h3>
            <p className="text-[#A9A9A9] text-base">
              From pop to classical, jazz to hip-hop, Moodify lets you
              experience the magic of music across genres.
            </p>
          </div>
          <div className="bg-[#29293F] p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-[#8A2BE2] text-xl font-bold mb-3">
              Mood-Based Playlists
            </h3>
            <p className="text-[#A9A9A9] text-base">
              Feeling happy, sad, or pumped? Let Moodify curate playlists
              tailored to your emotions.
            </p>
          </div>
          <div className="bg-[#29293F] p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-[#8A2BE2] text-xl font-bold mb-3">
              Unlimited Discoveries
            </h3>
            <p className="text-[#A9A9A9] text-base">
              Discover new songs, explore trending hits, and dive into timeless
              classics—endless music awaits you!
            </p>
          </div>
        </div>
      </div>

      {/* Mood Detector Section */}
      {/* Image Section Below Explore Music */}

      {/* Mood Detector Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src="public/images/audio1.jpg"
          alt="Mood Detector"
          className="rounded-lg shadow-lg transition-transform"
        />
        <div className="text-left">
          <h2 className="text-[#EAEAEA] text-3xl font-semibold mb-4">
            🔍 Detect Your Mood
          </h2>
          <p className="text-[#A9A9A9] text-base mb-6">
            Let Moodify analyze your mood and suggest songs that resonate with
            your emotions.
          </p>
          <Link to="/song-recommend">
            <button className="bg-gradient-to-r from-[#8A2BE2] to-[#3A6EA5] text-white py-3 px-6 rounded-lg text-lg font-medium shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
              Try Mood Detector
            </button>
          </Link>
        </div>

        {/* Slogans Section */}
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-center">
          <h2 className="text-[#EAEAEA] text-4xl font-bold mb-4">
            Why Choose Moodify?
          </h2>
          <ul className="text-[#A9A9A9] text-lg space-y-4">
            <li>"Find your rhythm, embrace your mood."</li>
            <li>"Music tailored just for you, every time."</li>
            <li>"Your vibe. Your music. Your Moodify."</li>
          </ul>
        </div>
        <img
          src="public/images/audio2.jpg"
          alt="Inspiration"
          className="rounded-lg shadow-lg transition-transform"
        />
      </div>
    </div>
  );
}
