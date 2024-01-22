import axios from "axios";

const SERVER_BASE_URL = new URL(
  `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_PORT_NUMBER}`
);

const apiConfig = {
  PAGE_LIMIT: 1,
  TWELVE_LABS_API: axios.create({
    baseURL: SERVER_BASE_URL.toString(),
  }),
  INDEXES_URL: "/indexes",
  TASKS_URL: "/tasks",
  JSON_VIDEO_INFO_URL: "/json-video-info",
  CHANNEL_VIDEO_INFO_URL: "/channel-video-info",
  PLAYLIST_VIDEO_INFO_URL: "/playlist-video-info",
  DOWNLOAD_URL: "/download",
  UPDATE_VIDEO_URL: "/update",
};

export default apiConfig;
