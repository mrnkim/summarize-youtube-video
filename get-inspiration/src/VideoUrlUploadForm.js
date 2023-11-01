import "./VideoUrlUploadForm.css";
import { useState, useEffect } from "react";
import { Video } from "./Video";
import TwelveLabsApi from "./TwelveLabsApi";
import LoadingSpinner from "./LoadingSpinner.svg";

const SERVER_BASE_URL = new URL("http://localhost:4002");
const VIDEO_INFO_URL = new URL("/video-info", SERVER_BASE_URL);
const DOWNLOAD_URL = new URL("/download", SERVER_BASE_URL);

export function VideoUrlUploadForm({
  setTaskVideo,
  taskVideo,
  index,
  fetchVideo,
}) {
  console.log("🚀 >   taskVideo=", taskVideo);
  const [videoUrl, setVideoUrl] = useState(null);
  const [taskStatus, setTaskStatus] = useState(null);
  console.log("🚀 > taskStatus=", taskStatus);
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

  async function indexYouTubeVideo() {
    console.log("indexYouTubeVideo called");

    if (taskVideo) {
      try {
        const requestData = {
          videoData: {
            url: taskVideo.video_url,
            title: taskVideo.title,
            authorName: taskVideo.author.name,
          },
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
        const jsonResponse = await response.json();
        const taskId = jsonResponse.taskId;
        monitorTaskId(taskId);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  async function monitorTaskId(taskId) {
    if (taskId) {
      try {
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        let isMonitoring = true;

        while (isMonitoring) {
          const taskStatusResponse = await TwelveLabsApi.checkStatus(
            taskId._id
          );
          console.log(
            "🚀 > monitorTaskId > taskStatusResponse=",
            taskStatusResponse
          );

          setTaskStatus(taskStatusResponse.status);
          if (
            taskStatusResponse.status === "ready" ||
            taskStatusResponse.status === "failed"
          ) {
            setTaskVideo(null);
            setVideoUrl(null);
            isMonitoring = false;
            fetchVideo();
          } else {
            await sleep(10000);
          }
        }
      } catch (error) {
        setError(error.message);
      }
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const videoInfo = await getVideoInfo(videoUrl);
    setTaskVideo(videoInfo);
  };

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
        <button className="videoUrlUploadButton" disabled={taskVideo}>Upload</button>
      </form>
      {taskVideo && (
        <div className="videoAndStatus">
          <Video url={taskVideo.video_url} />
          <div className=" loading-spinner">
          <img src={LoadingSpinner} alt="Loading Spinner" />
        </div>
          {taskStatus ? `${taskStatus}...` : "Submitting..."}
        </div>
      )}
      {error && <div className="errorMessage">{error}</div>}
    </div>
  );
}
