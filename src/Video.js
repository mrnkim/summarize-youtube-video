import React from "react";
import ReactPlayer from "react-player";
import "./Video.css";

/** Shows a video
 *
 * SummarizeVideo -> Video
 * SummarizeVideo -> {VideoUrlUploadForm} -> Video
 * SummarizeVideo -> {Result} -> Video
 *
 */

export function Video({ url, start, end, width, height }) {
  const isYouTube = url.includes("youtube");

  const getPlayerProps = () => {
    const playerProps = {
      key: url,
      className: "video__reactPlayer",
      "data-cy": "data-cy-video",
      url: url,
      controls: true,
    };

    if (isYouTube) {
      playerProps.url = start || end ? `${url}?start=${start}&end=${end}` : url;
    } else {
      playerProps.config = {
        hlsOptions: {
          startPosition: start,
          endPosition: end,
        },
      };
    }

    return playerProps;
  };

  return (
    <div className="video" style={{ width: width, height: height }}>
      <ReactPlayer {...getPlayerProps()} />
    </div>
  );
}
