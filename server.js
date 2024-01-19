require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const ytdl = require("ytdl-core");
const bodyParser = require("body-parser");
const axios = require("axios");

/** Define constants and configure TL API endpoints */
const TWELVE_LABS_API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = process.env.REACT_APP_API_URL;

/** Set up middleware for Express */
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/** Define error handling middleware */
const errorLogger = (error, request, response, next) => {
  console.error(error.stack);
  response
    .status(error.status || 500)
    .json(error.message || "Something Went Wrong...");
};

const errorHandler = (error, request, response, next) => {
  return response
    .status(error.status || 500)
    .json(error || "Something Went Wrong...");
};

app.use(errorLogger, errorHandler);

process.on("uncaughtException", function (exception) {
  console.log(exception);
});

/** Set up Express server to listen on port 4002 */
app.listen(4002, () => {
  console.log("Server Running. Listening on port 4002");
});

/** Get JSON-formatted video information from a YouTube URL using ytdl */
app.get("/video-info", async (request, response, next) => {
  try {
    let url = request.query.URL;
    const videoId = ytdl.getURLVideoID(url);
    const videoInfo = await ytdl.getBasicInfo(videoId);
    response.json(videoInfo.videoDetails);
  } catch (error) {
    return next(error);
  }
});

/** Index a Youtube video for analysis, returning a task ID */
app.post("/index", async (request, response, next) => {
  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    "x-api-key": TWELVE_LABS_API_KEY,
  };

  const options = {
    method: "POST",
    url: `${API_BASE_URL}/tasks/external-provider`,
    headers: headers,
    data: request.body.body,
  };

  try {
    const apiResponse = await axios.request(options);
    response.json(apiResponse.data);
  } catch (error) {
    response.json({ error });
  }
});
