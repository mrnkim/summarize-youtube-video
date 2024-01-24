import "./VideoUrlUploadForm.css";
import { useState, useEffect, useRef } from "react";
import { Video } from "./Video";
import TwelveLabsApi from "./TwelveLabsApi";
import LoadingSpinner from "./LoadingSpinner.svg";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { fetchVideoInfo } from "./apiHooks";
import { Task } from "./Task";

const SERVER_BASE_URL = new URL(
  `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_PORT_NUMBER}`
);
const VIDEO_INFO_URL = new URL("/video-info", SERVER_BASE_URL);
const INDEX_VIDEO = new URL("/index", SERVER_BASE_URL);

/** Receive user's video file, submit it to API, and show task status
 *
 * App -> SummarizeVideo -> {VideoFileUploadForm} -> Video
 *
 */

export function VideoUrlUploadForm({
  setTaskVideo,
  taskVideo,
  index,
  refetchVideos,
  refetchVideo,
  resetResults,
}) {
  console.log("🚀 >  taskVideo=", taskVideo);
  const [videoUrl, setVideoUrl] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const queryClient = useQueryClient();

  const setInputRef = (ref) => {
    inputRef.current = ref;
  };

  /** Update user input (video Url) in real-time */
  function handleChange(evt) {
    const input = evt.target;
    console.log("🚀 > handleChange > evt=", evt);
    console.log("🚀 > handleChange > input.value=", input.value);
    setVideoUrl(input.value);
    if (error && input?.value.trim() !== "") {
      setError("");
    }
  }

  /** Get information of a video  */
  async function getVideoInfo(url) {
    // const queryUrl = VIDEO_INFO_URL;
    // queryUrl.searchParams.set("URL", url);
    // const response = await fetch(queryUrl.href);
    // return await response.json();
    const response = await fetchVideoInfo(queryClient, url);
    console.log("🚀 > getVideoInfo > response=", response);
    return response;
  }

  /** Submit a Youtube video url for indexing  */
  async function indexYouTubeVideo() {
    if (taskVideo) {
      try {
        const data = {
          index_id: index,
          url: taskVideo.video_url,
        };
        console.log("🚀 > indexYouTubeVideo > data=", data);
        const response = await axios.post(INDEX_VIDEO.toString(), {
          headers: {
            "content-type": "application/json",
          },
          body: data,
        });
        console.log("🚀 > response > response=", response);
        const taskId = response.data._id;
        setTaskId(taskId);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  /** Check status of a task every 10,000 ms until the status is either ready or failed  */
  // async function monitorTaskId(taskId) {
  //   if (taskId) {
  //     try {
  //       const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  //       let isMonitoring = true;

  //       while (isMonitoring) {
  //         const taskStatusResponse = await TwelveLabsApi.checkStatus(taskId);

  //         setTaskStatus(taskStatusResponse.status);
  //         if (
  //           taskStatusResponse.status === "ready" ||
  //           taskStatusResponse.status === "failed"
  //         ) {
  //           isMonitoring = false;
  //           setTaskVideo(null);
  //           setVideoUrl(null);
  //           refetchVideos();
  //           refetchVideo();
  //         } else {
  //           await sleep(10000);
  //         }
  //       }
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   }
  // }

  /** Get information of a video and set it as task */
  async function handleSubmit(evt) {
    evt.preventDefault();
    const videoInfo = await getVideoInfo(videoUrl);
    setTaskVideo(videoInfo);
    inputRef.current.value = "";
    resetResults();
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
        <input
          ref={setInputRef}
          className="videoUrlUploadInput"
          placeholder="https://www.youtube.com/"
        ></input>
        <button className="videoUrlUploadButton" disabled={taskVideo}>
          Upload
        </button>
      </form>
      {taskVideo && (
        <div>
          <Video url={taskVideo.video_url} />{" "}
          {taskId && (
            <Task
              taskId={taskId}
              refetchVideos={refetchVideos}
              index={index}
              setTaskVideo={setTaskVideo}
            />
          )}
        </div>
      )}

      {error && <div className="errorMessage">{error}</div>}
    </div>
  );
}
