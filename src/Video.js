import React from "react";
import ReactPlayer from "react-player";
import "./Video.css";

/** Shows a video
 *
 * SummarizeVideo -> Video
 * SummarizeVideo -> {VideoUrlUploadForm} -> Video
 *
 */

export function Video({ url, start, end }) {
  console.log("🚀 > Video > end=", end);
  console.log("🚀 > Video > start=", start);
  console.log("🚀 > Video > url=", url);
  return (
    <div className="video">
      {!start && !end && (
        <ReactPlayer
          key={url}
          className="react-player"
          url={url}
          controls
          config={{
            hlsOptions: {
              startPosition: start,
              endPosition: end,
            },
          }}
        />
      )}
      {(start || end) && (
        <ReactPlayer
          key={url}
          className="react-player"
          url={`${url}?start=${start}&end=${end}`}
          controls
        />
      )}
    </div>
  );
}
