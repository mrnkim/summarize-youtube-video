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
const TWELVE_LABS_API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
const PORT_NUMBER = process.env.REACT_APP_PORT_NUMBER;

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
app.listen(PORT_NUMBER, () => {
  console.log(`Server Running. Listening on port ${PORT_NUMBER}`);
});

/** Get videos */
app.get("/indexes/:indexId/videos", async (request, response, next) => {
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": TWELVE_LABS_API_KEY,
  };

  const params = {
    page_limit: request.query.page_limit,
  };

  try {
    const apiResponse = await TWELVE_LABS_API.get(
      `/indexes/${request.params.indexId}/videos`,
      {
        headers,
        params,
      }
    );
    response.json(apiResponse.data);
  } catch (error) {
    console.error("Error getting videos:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

/** Get a video of an index */
app.get(
  "/indexes/:indexId/videos/:videoId",
  async (request, response, next) => {
    const indexId = request.params.indexId;
    const videoId = request.params.videoId;

    const headers = {
      "Content-Type": "application/json",
      "x-api-key": TWELVE_LABS_API_KEY,
    };

    try {
      const apiResponse = await TWELVE_LABS_API.get(
        `/indexes/${indexId}/videos/${videoId}`,
        {
          headers,
        }
      );
      response.json(apiResponse.data);
    } catch (error) {
      return next(error);
    }
  }
);

/** Summarize a video */
app.post("/videos/:videoId/summarize", async (request, response, next) => {
  const videoId = request.params.videoId;
  let data = request.body.data;

  let headers = {
    "Content-Type": "application/json",
    "x-api-key": TWELVE_LABS_API_KEY,
  };
  //TODO: update URL
  try {
    const options = {
      method: "POST",
      url: `https://api.twelvelabs.io/v1.2/summarize`,
      headers: { ...headers, accept: "application/json" },
      data: { ...data, video_id: videoId },
    };
    const apiResponse = await axios.request(options);
    response.json(apiResponse.data);
  } catch (error) {
    return next(error);
  }
});

/** Get JSON-formatted video information from a YouTube URL using ytdl */
app.get("/video-info", async (request, response, next) => {
  try {
    let url = request.query.url;
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
    "content-type": "application/json",
    "x-api-key": TWELVE_LABS_API_KEY,
  };
  console.log("🚀 > app.post > options.request.body=",request.body)

  const options = {
    method: "POST",
    url: "https://api.twelvelabs.io/v1.2/tasks/external-provider",
    headers: { ...headers, accept: "application/json" },
    data: request.body.body,
  };
  console.log("🚀 > app.post > options=", options)

  try {
    const apiResponse = await axios.request(options);
    console.log("🚀 > app.post > apiResponse=", apiResponse);
    response.json(apiResponse.data);
  } catch (error) {
    console.error("🚀 > app.post > error=", error.response || error.message);
  response.status(error.response?.status || 500).json({ error: error.message });
  }
});

/** Check the status of a specific indexing task */
app.get("/tasks/:taskId", async (request, response, next) => {
  const taskId = request.params.taskId;
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": TWELVE_LABS_API_KEY,
  };

  try {
    const apiResponse = await TWELVE_LABS_API.get(`/tasks/${taskId}`, {
      headers,
    });
    response.json(apiResponse.data);
  } catch (error) {
    return next(error);
  }
});
