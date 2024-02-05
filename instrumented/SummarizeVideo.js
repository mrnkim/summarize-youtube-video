import { React, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Video } from "./Video";
import { InputForm } from "./InputForm";
import { VideoUrlUploadForm } from "./VideoUrlUploadForm";
import { Result } from "./Result";
import "./SummarizeVideo.css";
import { useGetVideo } from "./apiHooks";
import keys from "./keys";
import LoadingSpinner from "./LoadingSpinner";
import { ErrorBoundary } from "./ErrorBoundary";
import WarningIcon from "./Warning_Green.svg";

/** Summarize a Video App
 *
 * App -> SummarizeVideo -> {VideoUrlUploadForm, Video, InputForm, Result}
 *
 */

export function SummarizeVideo({ index, videoId, refetchVideos }) {
  console.log("🚀 > SummarizeVideo > videoId=", videoId);
  const {
    data: video,
    refetch: refetchVideo,
    isLoading,
  } = useGetVideo(index, videoId, Boolean(videoId));
  console.log("🚀 > SummarizeVideo > video=", video);

  const [field1, field2, field3] = ["summary", "chapter", "highlight"];
  const [field1Prompt, setField1Prompt] = useState({
    isChecked: true,
  });
  const [field2Prompt, setField2Prompt] = useState({
    isChecked: true,
  });
  const [field3Prompt, setField3Prompt] = useState({
    isChecked: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showVideoTitle, setShowVideoTitle] = useState(false);
  const [taskVideo, setTaskVideo] = useState(null);

  const queryClient = useQueryClient();

  const vidTitleRaw = video?.metadata?.video_title;
  const vidTitleClean = decodeAndCleanFilename(vidTitleRaw);

  /** Return clean video file name  */
  function decodeAndCleanFilename(filename) {
    const decodedFilename = decodeURIComponent(filename);
    const cleanedFilename = decodedFilename
      .replace(/%20/g, " ")
      .replace(/\([^)]*\)/g, "");
    return cleanedFilename;
  }

  async function resetPrompts() {
    setField1Prompt({
      isChecked: false,
    });
    setField2Prompt({
      isChecked: false,
    });
    setField3Prompt({
      isChecked: false,
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      await queryClient.invalidateQueries({
        queryKey: [keys.VIDEOS, index, videoId],
      });
    };
    fetchData();
  }, [index, videoId, queryClient]);

  return (
    <div className="summarizeVideo">
      <h1 className="summarizeVideo__appTitle">Summarize a Youtube Video</h1>
      <VideoUrlUploadForm
        setTaskVideo={setTaskVideo}
        taskVideo={taskVideo}
        index={index}
        refetchVideos={refetchVideos}
        resetPrompts={resetPrompts}
      />
      {!video && (
        <div className="summarizeVideo__messageWrapper">
          <img
            className="summarizeVideo__messageWrapper__warningIcon"
            src={WarningIcon}
            alt="WarningIcon"
          ></img>
          <div>
            <p className="summarizeVideo__messageWrapper__message">
              Please upload a video
            </p>
          </div>
        </div>
      )}
      {!taskVideo && (
        <>
          <ErrorBoundary>
            {isLoading && <LoadingSpinner />}
            {video && (
              <Video
                url={video?.source?.url}
                width={"381px"}
                height={"214px"}
              />
            )}
          </ErrorBoundary>
          {showVideoTitle && (
            <div className="summarizeVideo__videoTitle">{vidTitleClean}</div>
          )}
          {video && (
            <InputForm
              video={video}
              field1Prompt={field1Prompt}
              setField1Prompt={setField1Prompt}
              field2Prompt={field2Prompt}
              setField2Prompt={setField2Prompt}
              field3Prompt={field3Prompt}
              setField3Prompt={setField3Prompt}
              field1={field1}
              field2={field2}
              field3={field3}
              setIsSubmitted={setIsSubmitted}
              setShowVideoTitle={setShowVideoTitle}
            />
          )}
          {video && (
            <Result
              video={video}
              isSubmitted={isSubmitted}
              field1Prompt={field1Prompt}
              field2Prompt={field2Prompt}
              field3Prompt={field3Prompt}
            />
          )}
        </>
      )}
    </div>
  );
}
