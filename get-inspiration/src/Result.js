import { TitleAndSummary } from "./TitleAndSummary";
import { Video } from "./Video";
import "./Result.css";

function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return formattedTime;
}

export function Result({ video, field1Result, field2Result, field3Result }) {
  return (
    <div className="result">
      {field1Result.result?.length > 0 && (
        <div className="resultSection">
          <h2>Sentences</h2>
          <div>{field1Result.result}</div>
        </div>
      )}

      {field2Result.result?.length > 0 && (
        <div className="resultSection">
          <h2>Chapters</h2>
          <div>
            {Array.isArray(field2Result.result) ? (
              field2Result.result.map((chapter) => (
                <div
                  className="videoAndDescription"
                  key={chapter.chapter_title}
                >
                  <Video
                    url={video?.data?.hls.video_url}
                    start={chapter.start}
                    end={chapter.end}
                  />
                  <div className="titleAndSummary">
                    <div className="titleAndTimeStamp">
                      <div className="titleSummary">
                        {" "}
                        {chapter.chapter_title}
                      </div>
                      <div className="timeStamp">
                        {formatTime(chapter.start)} - {formatTime(chapter.end)}
                      </div>
                    </div>
                    <div className="summary">{chapter.chapter_summary}</div>
                  </div>
                </div>
              ))
            ) : (
              <p>No chapters available</p>
            )}
          </div>
        </div>
      )}

      {field3Result.result?.length > 0 && (
        <div className="resultSection">
          <h2>Highlights</h2>
          <div>
            {Array.isArray(field3Result.result) ? (
              field3Result.result.map((highlight) => (
                <div className="videoAndDescription" key={highlight.highlight}>
                  <Video
                    url={video?.data?.hls.video_url}
                    start={highlight.start}
                    end={highlight.end}
                  />
                  <div className="titleAndSummary">
                    <div className="timeStamp">
                      {formatTime(highlight.start)} -{" "}
                      {formatTime(highlight.end)}
                    </div>
                    <TitleAndSummary summary={highlight.highlight_summary} />
                  </div>
                </div>
              ))
            ) : (
              <p>No highlights available</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
