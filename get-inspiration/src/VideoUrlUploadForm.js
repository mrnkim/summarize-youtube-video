import "./VideoUrlUploadForm.css";
import { useState, useEffect } from "react";
import { Video } from "./Video";
import TwelveLabsApi from "./TwelveLabsApi";

const SERVER_BASE_URL = new URL("http://localhost:4002");
const VIDEO_INFO_URL = new URL("/video-info", SERVER_BASE_URL);
const DOWNLOAD_URL = new URL("/download", SERVER_BASE_URL);

export function VideoUrlUploadForm({
  setVideo,
  setTaskVideo,
  taskVideo,
  index,
  fetchVideo,
}) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [taskStatusPromise, setTaskStatusPromise] = useState(null);
  console.log("🚀 > taskStatusPromise=", taskStatusPromise)
  const [taskStatus, setTaskStatus] = useState(null);
  console.log("🚀 > taskStatus=", taskStatus)
  const [error, setError] = useState(null);

  function handleChange(evt) {
    const input = evt.target;
    setVideoUrl(input.value);
    if (error && input?.value.trim() !== "") {
      setError("");
    }
  }

  async function getVideoInfo(url) {
    const queryUrl = VIDEO_INFO_URL;
    queryUrl.searchParams.set("URL", url);
    const response = await fetch(queryUrl.href);
    return await response.json();
  }

  const indexYouTubeVideo = async () => {
    const videoData = {
      url: taskVideo.video_url,
      title: taskVideo.title,
      authorName: taskVideo.author.name,
    };

    const requestData = {
      videoData: videoData,
      index: index,
    };

    const data = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };

    const response = await fetch(DOWNLOAD_URL.toString(), data);
    console.log("🚀 > indexYouTubeVideo > response=", response);
    const json = await response.json();
    const taskId = json.taskId;
    const promise = await monitorTaskId(taskId);
    setTaskStatusPromise(promise);

  };

  async function monitorTaskId(taskId) {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let poll = true;

    while (poll) {
      const status = await TwelveLabsApi.checkStatus(taskId._id);
      setTaskStatus(status.status);
      console.log("🚀 > monitorTaskId > status=", status)
      console.log("🚀 > taskStatus=", taskStatus)



      if (status.status === "ready") {
        poll = false;
        fetchVideo();
      } else {
        await sleep(10000);
      }
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const videoInfo = await getVideoInfo(videoUrl);
    setTaskVideo(videoInfo);
  }

    useEffect(() => {
      if (taskVideo) {
        indexYouTubeVideo();
      }
    }, [taskVideo]);

   return (
    <div className="videoUrlUploadForm">
      <div className="title">Upload video</div>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <input className="videoUrlUploadInput"></input>
        <button className="videoUrlUploadButton">Upload</button>
      </form>
      <div>{taskStatus ? taskStatus.status : 'Loading...'}</div>
      {error && <div className="errorMessage">{error}</div>}
    </div>
  );
}
