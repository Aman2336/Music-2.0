import { MdSkipNext } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { useState ,useEffect} from "react";
import axios from "axios";
import AudioPlayerCard from "../components/Audio Player/AudioPlayerCard";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";

export default function SearchResults() {
  const { currentUser } = useSelector((state) => state.user);
  const currentUserId = currentUser?._id;
  const location = useLocation();
  const results = location.state?.results || {};
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); //for moving to next track
  const [artistTracks, setartistTracks] = useState([]);

  const handleTrackSelect = (track, index) => {
    setCurrentTrack(track);
    setCurrentTrackIndex(index);
  };
  const handleNextTrackSelect = () => {
    // Ensure we are checking the current track list for the artist
    const trackList = isArtistSelected ? artistTracks : results.tracks.items;
    const nextIndex = currentTrackIndex + 1;
    if (nextIndex < trackList.length) {
      setCurrentTrack(trackList[nextIndex]);
      setCurrentTrackIndex(nextIndex);
    } else {
      setCurrentTrack(trackList[0]); // Loop back to the first track if it's the end
      setCurrentTrackIndex(0);
    }
  };
  const fetchsongsforartists = async (artistId) => {
    try {
      const response = await axios.get(
        `/backend/spotify/artists-songs/${artistId}/top-tracks?market=US`
      );
      setartistTracks(response.data.tracks); // Store artist's tracks
      setCurrentTrack(null); // Clear current track when loading new tracks
      setCurrentTrackIndex(0); // Reset track index
    } catch (err) {
      console.log(err);
    }
  };
  const [isArtistSelected, setIsArtistSelected] = useState(false);

  // Handle selecting an artist and fetching their tracks
  const handleArtistSelect = async (artistId) => {
    try {
      await fetchsongsforartists(artistId); // Fetch and store artist's tracks
      setIsArtistSelected(true); // Set the state to indicate artist selection
      setCurrentTrack(null); // Clear current track when loading new tracks
      setCurrentTrackIndex(0); // Reset track index
    } catch (error) {
      console.error("Error selecting artist:", error.message);
    }
  };
  const [likedSongs, setLikedSongs] = useState([]);
  const isTrackLiked =
    currentTrack && likedSongs.some((song) => song.trackId === currentTrack.id);

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const response = await axios.get(
          `/backend/user/liked-songs/${currentUserId}`
        );
        setLikedSongs(response.data.likedSongs); // Populate the liked songs from the backend
      } catch (error) {
        console.error("Error fetching liked songs:", error);
      }
    };

    if (currentUserId) {
      fetchLikedSongs();
    }
  }, [currentUserId]);

  const handlelikedclick = async (track) => {
    console.log("Current User ID:", currentUserId);
    try {
      if (isTrackLiked) {
        // Remove from liked songs
        const response = await axios.post("/backend/user/remove-like", {
          userId: currentUserId,
          trackId: track.id,
        });

        setLikedSongs(likedSongs.filter((song) => song.trackId !== track.id));
        console.log(response.data.message);
      } else {
        const response = await axios.post("/backend/user/like-song", {
          userId: currentUserId, // Replace with the actual logged-in user ID
          song: {
            title: track.name,
            artist: track.artists.map((artist) => artist.name).join(", "),
            albumArt: track.album.images[0]?.url,
            trackId: track.id, // Ensure each track has a unique identifier
            preview_url: track.preview_url,
          },
        });
        setLikedSongs([
          ...likedSongs,
          { trackId: track.id, ...track }, // Add the liked track to the state
        ]);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error adding song to liked songs:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div
      className="bg-gradient-to-b from-[#1E1E2C] to-[#0D0D15] min-h-screen p-6 flex flex-col items-center text-[#EAEAEA]"
      style={{ padding: "2rem" }}
    >
      <h2 className="text-2xl font-bold mb-6 w-full text-center">
        Search Results
      </h2>

      <div
        className="flex flex-col md:flex-row justify-center gap-8 w-full max-w-7xl"
        style={{ flexWrap: "wrap", gap: "2rem" }}
      >
        {/* Artists Section */}
        {results.artists?.items && (
          <div
            className="flex-1 md:max-w-[30%] max-h-[600px] overflow-y-auto bg-gradient-to-b from-[#333344] to-[#2C2C3A] p-6 rounded-lg shadow-md"
            style={{
              minWidth: "280px",
              flex: "1 1 300px",
              maxWidth: "100%",
            }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Artists</h3>
            <div className="space-y-4">
              {results.artists.items.slice(0, 5).map((artist) => (
                <div
                  onClick={() => handleArtistSelect(artist.id)}
                  key={artist.id}
                  className="flex items-center p-3 bg-gradient-to-r from-[#3E3E50] to-[#353545] rounded-md"
                  style={{ cursor: "pointer" }}
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
          <div
            className="flex-1 md:max-w-[30%] max-h-[600px] overflow-y-auto bg-gradient-to-b from-[#2A2A3A] to-[#2C2C3A] p-6 rounded-lg shadow-md"
            style={{
              minWidth: "280px",
              flex: "1 1 300px",
              maxWidth: "100%",
            }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Tracks</h3>
            <ul className="space-y-4">
              {(isArtistSelected ? artistTracks : results.tracks.items).map(
                (track, index) => (
                  <li
                    key={track.id}
                    className="p-3 bg-gradient-to-r from-[#3A3A4B] to-[#353545] rounded-md cursor-pointer flex items-center"
                    onClick={() => handleTrackSelect(track, index)}
                    style={{ cursor: "pointer" }}
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
                )
              )}
            </ul>
          </div>
        )}

        {/* Media Player Section */}
        <div
          className="flex-1 md:max-w-[30%] bg-gradient-to-b from-[#2A2A3A] to-[#2C2C3A] p-6 rounded-lg shadow-md"
          style={{
            minWidth: "280px",
            flex: "1 1 300px",
            maxWidth: "100%",
          }}
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
            <button
              onClick={() => handleNextTrackSelect()}
              className="py-2 px-4 flex flex-row gap-3 text-white font-semibold rounded-lg hover:shadow-md"
            >
              <MdSkipNext size={20} />
              Next Song
            </button>
            <button
              onClick={() => handlelikedclick(currentTrack)}
              className="py-2 px-4 flex flex-row gap-3 text-white font-semibold rounded-lg hover:shadow-md "
            >
              <AiOutlineHeart size={20} color={isTrackLiked ? "red" : ""} />
              {isTrackLiked ? "Remove from Liked Songs" : "Add to Liked Songs"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
