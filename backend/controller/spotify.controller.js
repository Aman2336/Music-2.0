import axios from "axios";
import getAccessToken from "../utils/spotifyAuth.js";

export const searchTracks = async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const { q } = req.query;

    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q,
        type: "track,artist",
        limit: 10,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching tracks", error: error.message });
  }
};

export const fetchtracksbymood = async (req, res, next) => {
  try {
    const accessToken = await getAccessToken();
    const { q } = req.query;

    const response = await axios.get(`https://api.spotify.com/v1/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q,
        type: "track",
        limit: 10,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error searching tracks", error: error.message });
  }
};

export const fetchtracksforartist = async (req, res, next) => {
  try {
    const accessToken = await getAccessToken();
    const { artistId } = req.params; // Use artistId from the request params
    const { market = "US" } = req.query;

    if (!artistId) {
      return res.status(400).json({ message: "Artist ID is required" });
    }

    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          market,
        },
      }
    );

    res.status(200).json({ tracks: response.data.tracks });
  } catch (error) {
    console.error("Error fetching artist's top tracks:", error.message);
    res
      .status(500)
      .json({
        message: "Error fetching artist's top tracks",
        error: error.message,
      });
  }
};
