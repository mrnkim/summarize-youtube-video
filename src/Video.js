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
        key={url}
        className="video__reactPlayer"
        url={start || end ? `${url}?start=${start}&end=${end}` : url}
        controls
      />
    </div>
  );
}
