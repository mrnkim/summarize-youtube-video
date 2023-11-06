require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const ytdl = require("ytdl-core");
const fs = require("fs");
const bodyParser = require("body-parser");
const axios = require("axios");
const sanitize = require("sanitize-filename");
const util = require("util");
const streamPipeline = util.promisify(require("stream").pipeline);

/** Define constants and configure TL API endpoints */
const TWELVE_LABS_API_KEY = process.env.REACT_APP_API_KEY;
const API_BASE_URL = process.env.REACT_APP_API_URL;
const TWELVE_LABS_API = axios.create({
  baseURL: API_BASE_URL,
});

/** Set up middleware for Express */
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

/** Define error handling middleware */
const errorLogger = (error, request, response, next) => {
  console.error(error.stack);
  response.status(error.status || 500).json(error.message || "Something Went Wrong...");
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

/** Takes a downloaded video and initiates the indexing process */
const indexVideo = async (videoPath, indexId) => {
  const headers = {
    headers: {
      accept: "application/json",
      "Content-Type": "multipart/form-data",
      "x-api-key": TWELVE_LABS_API_KEY,
    },
  };

  let params = {
    index_id: indexId,
    video_file: fs.createReadStream(videoPath),
    language: "en",
  };

  const response = await TWELVE_LABS_API.post("/tasks", params, headers);
  return await response.data;
};

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

/** Download and index videos for analysis, returning task IDs and index ID */
app.post(
  "/download",
  bodyParser.urlencoded(),
  async (request, response, next) => {
    const videoData = request.body.videoData;
    console.log("Downloading Video...");

    // Generate a safe file name for the downloaded video
    const safeName = sanitize(videoData.title);
    const videoPath = `videos/${safeName}.mp4`;

    // Download the video from the provided URL
    const stream = ytdl(videoData.url, {
      filter: "videoandaudio",
      format: ".mp4",
    });

    try {
      await streamPipeline(stream, fs.createWriteStream(videoPath));
      console.log(`${videoPath} -- finished downloading`);

      console.log(`Submitting ${safeName} For Indexing...`);
      const indexVideoResponse = await indexVideo(
        videoPath,
        request.body.index
      );

      console.log("Indexing Submission Completed");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      response.json({
        taskId: indexVideoResponse,
        indexId: request.body.index,
      });
    } catch (error) {
      console.log(`Error downloading ${safeName}`);
      console.error(error);
    }
  }
);
