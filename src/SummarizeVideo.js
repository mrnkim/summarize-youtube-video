import { React, useState, useEffect, Suspense } from "react";
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

/** Summarize a Video App
 *
 * App -> SummarizeVideo -> {VideoUrlUploadForm, Video, InputForm, Result}
 *
 */

export function SummarizeVideo({ index, videoId, refetchVideos }) {
  const {
    data: video,
    refetch: refetchVideo,
    isLoading,
    isFetching,
  } = useGetVideo(index, videoId);
  console.log("🚀 > SummarizeVideo > isFetching=", isFetching);
  console.log("🚀 > SummarizeVideo > isLoading=", isLoading);
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
  // const [resultLoading, setResultLoading] = useState(false);
  const [field1Result, setField1Result] = useState({});
  const [field2Result, setField2Result] = useState({});
  const [field3Result, setField3Result] = useState({});

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

  /** Empty result(s) */
  async function resetResults() {
    console.log("resetting!");
    setField1Result({
      id: null,
      summary: "",
    });
    setField2Result({
      id: null,
      chapters: "",
    });
    setField3Result({
      id: null,
      highlights: "",
    });
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
      await refetchVideo();
    };

    fetchData();
  }, [index, videoId, queryClient, refetchVideo]);

  return (
    <div className="summarizeVideo">
      <h1 className="appTitle">Summarize a Youtube Video</h1>
      <div className="videoUrlUploadForm">
        <VideoUrlUploadForm
          setTaskVideo={setTaskVideo}
          taskVideo={taskVideo}
          index={index}
          refetchVideos={refetchVideos}
          refetchVideo={refetchVideo}
          resetResults={resetResults}
          resetPrompts={resetPrompts}
        />
      </div>
      {video && !taskVideo && (
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Video url={video.source?.url} />
          </Suspense>
        </ErrorBoundary>
      )}

      {!video && !taskVideo && <p>Please Upload a video</p>}
      {!taskVideo && showVideoTitle && (
        <div className="videoTitle">{vidTitleClean}</div>
      )}
      {!taskVideo && (
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
          // resultLoading={resultLoading}
          // setResultLoading={setResultLoading}
          setShowVideoTitle={setShowVideoTitle}
          resetResults={resetResults}
        />
      )}
      {!taskVideo && (
        <Result
          video={video}
          setIsSubmitted={setIsSubmitted}
          isSubmitted={isSubmitted}
          field1Prompt={field1Prompt}
          field2Prompt={field2Prompt}
          field3Prompt={field3Prompt}
          // setResultLoading={setResultLoading}
          // resultLoading={resultLoading}
          resetResults={resetResults}
          field1Result={field1Result}
          field2Result={field2Result}
          field3Result={field3Result}
          setField1Result={setField1Result}
          setField2Result={setField2Result}
          setField3Result={setField3Result}
        />
      )}
    </div>
  );
}
