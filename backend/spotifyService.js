// spotifyService.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let accessToken = null;

// Function to get Spotify access token
const getAccessToken = async () => {
  const authString = Buffer.from(
    `${process.env.spotify_client}:${process.env.spotify_secret}`
  ).toString("base64");

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    accessToken = response.data.access_token;
    console.log("Spotify access token obtained successfully.");
  } catch (error) {
    console.error("Error obtaining Spotify access token:", error);
  }
};

// Get access token initially and refresh it every hour
getAccessToken();
setInterval(getAccessToken, 3600 * 1000);

// Function to search Spotify
export const searchSpotify = async (query) => {
  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: "track",
        limit: 10, // Limit number of results
      },
    });
    return response.data.tracks.items;
  } catch (error) {
    console.error("Error searching Spotify:", error);
    throw new Error("Failed to search Spotify");
  }
};
