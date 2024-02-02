import React from "react";
import ReactPlayer from "react-player";
import "./Video.css";

/** Shows a video
 *
 * SummarizeVideo -> Video
 * SummarizeVideo -> {VideoUrlUploadForm} -> Video
 *
 */

export function Video({ url, start, end, width, height }) {
  return (
    <div className="video" style={{ width: width, height: height }}>
      <ReactPlayer
        key={url}
        className="video__reactPlayer"
        url={start || end ? `${url}?start=${start}&end=${end}` : url}
        controls
      />
    </div>
  );
}
