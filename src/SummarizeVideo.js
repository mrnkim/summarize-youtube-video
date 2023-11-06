import { React, useState } from "react";
import { Video } from "./Video";
import { InputForm } from "./InputForm";
import { VideoUrlUploadForm } from "./VideoUrlUploadForm";
import { Result } from "./Result";
import "./SummarizeVideo.css";
import TwelveLabsApi from "./TwelveLabsApi";

/** Summarize a Video App
 *
 * App -> SummarizeVideo -> {VideoUrlUploadForm, Video, InputForm, Result}
 *
 */

export function SummarizeVideo({ video, setVideo, index, fetchVideo }) {
  const [loading, setLoading] = useState(false);
  const [field1, field2, field3] = ["summary", "chapter", "highlight"];
  const [field1Prompt, setField1Prompt] = useState({
    fieldName: field1,
    isChecked: true,
  });
  const [field2Prompt, setField2Prompt] = useState({
    fieldName: field2,
    isChecked: true,
  });
  const [field3Prompt, setField3Prompt] = useState({
    fieldName: field3,
    isChecked: true,
  });
  const [field1Result, setField1Result] = useState({
    fieldName: field1,
    result: "",
  });
  const [field2Result, setField2Result] = useState({
    fieldName: field2,
    result: "",
  });
  const [field3Result, setField3Result] = useState({
    fieldName: field3,
    result: "",
  });
  const [taskVideo, setTaskVideo] = useState(null);

  /** Make API call to generate summary, chapters, and highlights of a video  */
  function generate(data) {
    return TwelveLabsApi.generateSummary(data, video.data._id);
  }

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
      {!taskVideo &&
      (field1Result.result?.length > 0 ||
        field2Result.result?.length > 0 ||
        field3Result.result?.length > 0) ? (
        <div className="videoTitle">{vidTitleClean}</div>
      ) : null}{" "}
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
          generate={generate}
          setField1Result={setField1Result}
          setField2Result={setField2Result}
          setField3Result={setField3Result}
          setLoading={setLoading}
          loading={loading}
        />
      )}
      {loading && <p>Loading...</p>}
      {!loading &&
        !taskVideo &&
        (field1Result.result?.length > 0 ||
          field2Result.result?.length > 0 ||
          field3Result.result?.length > 0) && (
          <Result
            video={video}
            field1Result={field1Result}
            field2Result={field2Result}
            field3Result={field3Result}
          />
        )}
    </div>
  );
}
