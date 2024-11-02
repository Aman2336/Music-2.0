// // backend/auth.js

// import axios from "axios";
// import queryString from "query-string";
// import dotenv from "dotenv";

// dotenv.config();

// let accessToken = ""; // Stores the access token
// let tokenExpiresAt = 0; // Timestamp when the token expires

// /**
//  * Fetches a new access token from Spotify.
//  * @returns {Promise<string>} The access token.
//  */
// const getAccessToken = async () => {
//   const currentTime = Date.now();

//   // If token exists and hasn't expired, return it
//   if (accessToken && currentTime < tokenExpiresAt) {
//     return accessToken;
//   }

//   // Prepare authentication options
//   const authOptions = {
//     url: "https://accounts.spotify.com/api/token",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization:
//         "Basic " +
//         Buffer.from(
//           `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
//         ).toString("base64"),
//     },
//     data: queryString.stringify({
//       grant_type: "client_credentials",
//     }),
//   };

//   try {
//     const response = await axios(authOptions);
//     accessToken = response.data.access_token;
//     const expiresIn = response.data.expires_in; // Typically 3600 seconds (1 hour)
//     tokenExpiresAt = currentTime + expiresIn * 1000; // Convert to milliseconds

//     console.log("Access Token acquired:", accessToken);
//     console.log("Token expires at:", new Date(tokenExpiresAt).toLocaleString());

//     return accessToken;
//   } catch (error) {
//     console.error("Failed to retrieve access token:", error.response?.data || error.message);
//     throw new Error("Could not authenticate with Spotify.");
//   }
// };

// export default getAccessToken;

import axios from "axios";
import queryString from "query-string";
import dotenv from "dotenv";

dotenv.config();

let accessToken = ""; //this token is essential for getting data from spotify's endpoint

const getAccessToken = async () => {
  if (accessToken) return accessToken; //if token already exist it will return that to avoid unecessary api calls
  const authOptions = {
    //spotify code
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.spotify_client + ":" + process.env.spotify_secret
        ).toString("base64"),
    },
    data: queryString.stringify({
      grant_type: "client_credentials",
    }),
  };

  const response = await axios(authOptions);
  accessToken = response.data.access_token;

  setTimeout(() => {
    accessToken = ""; // Clear token after 1 hour
  }, 3600 * 1000);

  return accessToken;
};

export default getAccessToken;
