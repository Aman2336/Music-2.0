export default function Home() {
  return (
    <div className="bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] min-h-screen p-5 flex flex-col items-center">
      <h1 className="text-[#EAEAEA] text-4xl font-bold mb-4">
        Welcome to Moodify
      </h1>
      <p className="text-[#A9A9A9] text-lg mb-8">
        Discover songs, artists, and playlists that match your mood.
      </p>

      {/* Example of a button with neon accent */}
      <button className="bg-[#8A2BE2] text-white py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105 hover:bg-[#3A6EA5]">
        Get Started
      </button>

      {/* Example of additional content or features */}
      <div className="mt-8 text-center">
        <h2 className="text-[#EAEAEA] text-2xl mb-2">Featured Artists</h2>
        {/* Add artist cards or other components here */}
      </div>
    </div>
  );
}
