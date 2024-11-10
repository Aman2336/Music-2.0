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
