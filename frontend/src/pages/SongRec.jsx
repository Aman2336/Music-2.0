import { useState } from "react";
import CameraCapture from "../components/Camera/CameraCapture";
import MoodResultCard from "../components/Mood/MoodResultCard";
import AudioPlayerCard from "../components/Audio Player/AudioPlayerCard";
import { MdSkipNext } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import "../../src/styles/Songrecommend.css";
import axios from "axios";

const moodtogenres = {
  angry: ["rock", "metal", "punk"],
  disgust: ["grunge", "alternative"],
  fear: ["ambient", "darkwave", "industrial"],
  happy: ["pop", "dance", "funk", "disco"],
  neutral: ["classical", "jazz", "lo-fi"],
  sad: ["blues", "acoustic", "soul"],
  surprise: ["electronic", "experimental", "synthwave"],
};
export default function MoodDetection() {
  const [mood, setMood] = useState(null);
  const [emotions, setEmotions] = useState({});
  const [results, setResults] = useState({});
  const [currentTrack, setCurrentTrack] = useState(null);

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
  };

  const handleCapture = async (imageBlob) => {
    // Prepare FormData with the image blob
    const formData = new FormData();
    formData.append("image", imageBlob, "capture.jpg");

    try {
      // Send the form data to Flask (direct call to the /analyze endpoint)
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMood(data.emotion); // Set the dominant emotion
        setEmotions(data.emotions); // Set all emotion scores
        console.log("Image uploaded and analyzed successfully");
        console.log(data.emotion);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const fetchSongsByMood = async (mood) => {
    const genres = moodtogenres[mood];
    if (genres && genres.length > 0) {
      try {
        // Convert the genres array to a query parameter string (e.g., "jazz,blues,rock")
        const query = genres.join(",");

        const response = await axios.get(
          `/backend/spotify/search-mood?q=${query}&type=track`
        );
        setResults(response.data.tracks.items); // Update results state with response data
        console.log(response.data.tracks.items);
      } catch (error) {
        console.error("Error fetching tracks:", error.message);
      }
    } else {
      console.log("No genres found for the selected mood.");
    }
  };

  // Callback function passed to MoodResultCard
  const handleDominantMoodDetected = (detectedMood) => {
    fetchSongsByMood(detectedMood);
  };

  return (
    <div className=" flex flex-col bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] min-h-screen items-center gap-5 ">
      <h1 className="font-semibold text-4xl text-white">Detect Your Mood</h1>
      <CameraCapture onCapture={handleCapture} />
      {mood && (
        <MoodResultCard
          mood={mood}
          emotions={emotions}
          onDominantMoodDetected={handleDominantMoodDetected}
        />
      )}
      {/* Main container for the Tracks and Media Player sections */}
      <div className="flex flex-row w-full justify-center gap-8 mt-5 bg-gradient-to-b from-[#2A2A3A] to-[#2C2C3A]">
        {/* Tracks section with left connection and rounded right side */}
        {results && results.length > 0 && (
          <div
            className=" tracks-section  md:max-w-[30%] max-h-[600px] animate-slide-in-left overflow-y-auto bg-gradient-to-b from-[#2A2A3A] to-[#2C2C3A] p-6 rounded-r-lg animate-slide-in-left"
            // style={{
            //   borderRadius: "20px", // Rounded on the right side
            // }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Tracks</h3>
            <ul className="space-y-4">
              {results.map((track) => (
                <li
                  key={track.id}
                  className="p-3 bg-gradient-to-r from-[#3A3A4B] to-[#353545] rounded-md flex items-center"
                  onClick={() => handleTrackSelect(track)}
                >
                  <img
                    src={track.album.images[0]?.url || "/default-track.jpg"}
                    alt={track.name}
                    className="w-12 h-12 object-cover rounded mr-3"
                  />
                  <div>
                    <p>{track.name}</p>
                    <p className="text-sm text-gray-400">
                      {track.artists.map((artist) => artist.name).join(", ")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Media Player section with right connection and rounded left side */}
        {mood && (
          <div
            className="media-player-section animate-slide-in-right bg-gradient-to-b from-[#2A2A3A] to-[#2C2C3A] p-6 rounded-l-lg animate-slide-in-right"
            // style={{
            //   borderRadius: "20px 20px 0 20px", // Rounded on the left side
            // }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white">
              Media Player
            </h3>
            {currentTrack ? (
              <AudioPlayerCard track={currentTrack} />
            ) : (
              <p className="text-gray-400">Select a track to play</p>
            )}
            <div className="flex flex-col items-start mt-24 space-y-2">
              <button className="py-2 px-4 flex flex-row gap-3 text-white font-semibold rounded-lg hover:shadow-md">
                <MdSkipNext size={20} />
                Next Song
              </button>
              <button className="py-2 px-4 flex flex-row gap-3 text-white font-semibold rounded-lg hover:shadow-md">
                <AiOutlineHeart size={20} />
                Add to Liked Songs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
