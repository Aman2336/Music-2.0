import { useLocation } from "react-router-dom";
import { useState } from "react";
import AudioPlayerCard from "../components/Audio Player/AudioPlayerCard";
import "react-h5-audio-player/lib/styles.css";

export default function SearchResults() {
  const location = useLocation();
  // this basically gives us the access of the current object or URL to access the info from the state
  // location => (url,state)
  //def and use - This is especially useful in scenarios where you want
  // to access information about the route or any data passed from the previous route,
  // often through state.

  const results = location.state?.results || {};
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
  };

  return (
    <div className="bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] min-h-screen p-8 flex flex-col items-center text-[#EAEAEA]">
      <h2 className="text-2xl font-bold mb-6 w-full text-center">
        Search Results
      </h2>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
        {/* Artists Section */}
        {results.artists?.items && (
          <div className="flex-1 max-w-sm max-h-[500px] overflow-y-auto bg-gradient-to-b from-[#333344] to-[#2C2C3A] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-white">Artists</h3>
            <div className="space-y-4">
              {results.artists.items.slice(0, 4).map((artist) => (
                <div
                  key={artist.id}
                  className="flex items-center p-3 bg-gradient-to-r from-[#3E3E50] to-[#353545] rounded-md"
                >
                  <img
                    src={artist.images[0]?.url || "/default-artist.jpg"}
                    alt={artist.name}
                    className="w-16 h-16 object-cover rounded-full mr-4"
                  />
                  <p>{artist.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tracks Section */}
        {results.tracks?.items && (
          <div className="flex-1 max-w-sm max-h-[500px] overflow-y-auto bg-gradient-to-b from-[#2A2A3A] to-[#2C2C3A] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-white">Tracks</h3>
            <ul className="space-y-4">
              {results.tracks.items.map((track) => (
                <li
                  key={track.id}
                  className="p-3 bg-gradient-to-r from-[#3A3A4B] to-[#353545] rounded-md cursor-pointer"
                  onClick={() => handleTrackSelect(track)}
                >
                  <img
                    src={track.album.images[0]?.url || "/default-track.jpg"}
                    alt={track.name}
                    className="w-12 h-12 object-cover rounded mr-3"
                  />
                  <p>{track.name}</p>
                  <p className="text-sm text-gray-400">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Media Player Section */}
        <div className="flex-1 max-w-sm bg-gradient-to-b from-[#2A2A3A] to-[#2C2C3A] p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Media Player
          </h3>
          {currentTrack ? (
            <AudioPlayerCard track={currentTrack} />
          ) : (
            <p className="text-gray-400">Select a track to play</p>
          )}
        </div>
      </div>
    </div>
  );
}

