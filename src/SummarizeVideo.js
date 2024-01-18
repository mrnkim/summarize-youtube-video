import { React, useState } from "react";
import { Video } from "./Video";
import { InputForm } from "./InputForm";
import { VideoUrlUploadForm } from "./VideoUrlUploadForm";
import { Result } from "./Result";
import "./SummarizeVideo.css";

/** Summarize a Video App
 *
 * App -> SummarizeVideo -> {VideoUrlUploadForm, Video, InputForm, Result}
 *
 */

export function SummarizeVideo({ video, setVideo, index, fetchVideo }) {
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
  console.log("🚀 > SummarizeVideo > showVideoTitle=", showVideoTitle);
  const [resultLoading, setResultLoading] = useState(false);

  const [taskVideo, setTaskVideo] = useState(null);

  const vidTitleRaw = video?.data?.metadata.video_title;
  const vidTitleClean = decodeAndCleanFilename(vidTitleRaw);

  /** Return clean video file name  */
  function decodeAndCleanFilename(filename) {
    const decodedFilename = decodeURIComponent(filename);
    const cleanedFilename = decodedFilename
      .replace(/%20/g, " ")
      .replace(/\([^)]*\)/g, "");
    return cleanedFilename;
  }

  return (
    <div className="summarizeVideo">
      <h1 className="appTitle">Summarize a Youtube Video</h1>
      <div className="videoUrlUploadForm">
        <VideoUrlUploadForm
          setTaskVideo={setTaskVideo}
          taskVideo={taskVideo}
          index={index}
          fetchVideo={fetchVideo}
        />
      </div>
      {video.data && !taskVideo && <Video url={video?.data?.hls.video_url} />}
      {!video.data && !taskVideo && <p>Please Upload a video</p>}
      {showVideoTitle && <div className="videoTitle">{vidTitleClean}</div>}
      {!taskVideo && (
        <InputForm
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
          resultLoading={resultLoading}
          setResultLoading={setResultLoading}
          setShowVideoTitle={setShowVideoTitle}
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
          setResultLoading={setResultLoading}
          resultLoading={resultLoading}
        />
      )}
    </div>
  );
}
