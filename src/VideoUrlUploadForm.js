import "./VideoUrlUploadForm.css";
import { useState, useEffect, useRef, Suspense } from "react";
import { Video } from "./Video";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { fetchVideoInfo } from "./apiHooks";
import { Task } from "./Task";
import { ErrorBoundary } from "./ErrorBoundary";

const SERVER_BASE_URL = new URL(
  `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_PORT_NUMBER}`
);
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
  resetPrompts,
}) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [taskId, setTaskId] = useState(null);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const setInputRef = (ref) => {
    inputRef.current = ref;
  };

  const queryClient = useQueryClient();

  /** Update user input (video Url) in real-time */
  function handleChange(evt) {
    const input = evt.target;
    setVideoUrl(input.value);
    setError(null);
  }

  /** Get information of a video  */
  async function getVideoInfo(url) {
    const response = await fetchVideoInfo(queryClient, url);
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
        const response = await axios.post(INDEX_VIDEO.toString(), {
          headers: {
            "content-type": "application/json",
          },
          body: data,
        });
        const taskId = response.data._id;
        setTaskId(taskId);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  /** Get information of a video and set it as task */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      if (!videoUrl?.trim()) {
        throw new Error("Please enter a valid video URL");
      }
      const videoInfo = await getVideoInfo(videoUrl);
      setTaskVideo(videoInfo);
      inputRef.current.value = "";
      resetPrompts();
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    if (taskVideo) {
      indexYouTubeVideo();
    }
  }, [taskVideo]);

  return (
    <div className="videoUrlUploadForm">
      <div className="videoUrlUploadForm__title">Upload video</div>
      <form
        className="videoUrlUploadForm__form"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <input
          className="videoUrlUploadForm__form__input"
          ref={setInputRef}
          placeholder="https://www.youtube.com/"
        ></input>
        <button
          className="videoUrlUploadForm__form__button"
          disabled={taskVideo || inputRef.current?.value.length < 1}
        >
          Upload
        </button>
      </form>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          {taskVideo && (
            <div className="videoUrlUploadForm__taskVideoWrapper">
              <Video url={taskVideo.video_url} />
              <div className="videoUrlUploadForm__taskVideoWrapper__message">
                {!taskId && "Submitting..."}
              </div>
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
        </Suspense>
      </ErrorBoundary>
      {error && <div className="videoUrlUploadForm_errorMessage">{error}</div>}
    </div>
  );
}
