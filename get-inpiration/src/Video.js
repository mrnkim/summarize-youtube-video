import React from "react";
import ReactPlayer from "react-player";
import "./Video.css";

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
