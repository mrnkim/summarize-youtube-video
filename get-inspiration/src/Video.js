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
  return (
    <div className="video">
      <ReactPlayer
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
    </div>
  );
}
