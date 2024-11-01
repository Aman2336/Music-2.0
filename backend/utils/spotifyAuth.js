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
