import "./VideoUrlUploadForm.css";
import { useState } from "react";
import { Video } from "./Video";

const SERVER_BASE_URL = new URL("http://localhost:4002");
const VIDEO_INFO_URL = new URL("/video-info", SERVER_BASE_URL);

export function VideoUrlUploadForm({ setVideo, setTaskVideo }) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);

  function handleChange(evt) {
    const input = evt.target;
    setVideoUrl(input.value);
    if (error && input.value.trim() !== "") {
      setError("");
    }
  }

  async function getVideoInfo(url) {
    const queryUrl = VIDEO_INFO_URL;
    queryUrl.searchParams.set("URL", url);
    const response = await fetch(queryUrl.href);
    return await response.json();
  }

  // const indexYouTubeVideos = async () => {

  //   const videoData = taskVideos.map((videoData) => {
  //     return {
  //       url: videoData.video_url || videoData.url,
  //       title: videoData.title,
  //       authorName: videoData.author.name,
  //     };
  //   });
  //   const requestData = {
  //     videoData: videoData,
  //     index: index,
  //     index_id: index._id,
  //   };
  //   const data = {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(requestData),
  //   };
  //   const response = await fetch(DOWNLOAD_URL.toString(), data);
  //   const json = await response.json();
  //   const taskIds = json.taskIds;
  //   setIndexId(json.indexId);
  //   await monitorTaskIds(taskIds);
  // };

  // const monitorTaskIds = async (taskIds) => {
  //   const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //   let poll = true;

  //   while (poll) {
  //     const taskStatuses = taskIds.map(async (taskId) => {
  //       const response = TwelveLabsApi.checkStatus(taskId._id);
  //       return response;
  //     });
  //     const statuses = await Promise.all(taskStatuses);
  //     const videoTasksStatuses = statuses.map((status) => {
  //       const taskMatch = taskVideos.filter((video) => {
  //         const safeName = `${sanitize(video.title)}.mp4`;
  //         if (safeName === status.metadata.filename) {
  //           return video;
  //         }
  //       });
  //       if (taskMatch) {
  //         return { ...taskMatch[0], ...status };
  //       }
  //     });
  //     setTaskVideos(videoTasksStatuses);
  //     if (statuses.every((status) => status.status === "ready")) {
  //       poll = false;
  //       updateApiElement();
  //       const response = await getIndexInfo();
  //       setIndexedVideos(response);
  //     } else {
  //       await sleep(10000);
  //     }
  //   }
  // };

  function downloadVideo() {}

  async function handleSubmit(evt) {
    evt.preventDefault();
    const videoInfo = await getVideoInfo(videoUrl);
    setTaskVideo(videoInfo);
    console.log("🚀 > handleSubmit > videoInfo=", videoInfo);
  }

  return (
    <div className="videoUrlUploadForm">
      <div className="title">Upload video</div>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <input className="videoUrlUploadInput"></input>
        <button className="videoUrlUploadButton">Upload</button>
      </form>
      {error && <div className="errorMessage">{error}</div>}
    </div>
  );
}
