import { React, useEffect } from "react";
import { TitleAndSummary } from "./TitleAndSummary";
import { Video } from "./Video";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import "./Result.css";
import {
  useGenerateSummary,
  useGenerateChapters,
  useGenerateHighlights,
} from "./apiHooks";
import keys from "./keys";
import { ErrorBoundary } from "./ErrorBoundary";

/** Shows the results
 *
 * App -> SummarizeVideo -> {Result}
 *
 */

export function Result({
  video,
  isSubmitted,
  setIsSubmitted,
  field1Prompt,
  field2Prompt,
  field3Prompt,
}) {
  const { data: field1Result } = useGenerateSummary(
    field1Prompt,
    video._id,
    Boolean(field1Prompt.type && field1Prompt.isChecked && isSubmitted)
  );
  const { data: field2Result } = useGenerateChapters(
    field2Prompt,
    video._id,
    Boolean(field2Prompt.type && field2Prompt.isChecked && isSubmitted)
  );
  const { data: field3Result } = useGenerateHighlights(
    field3Prompt,
    video._id,
    Boolean(field3Prompt.type && field3Prompt.isChecked && isSubmitted)
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([
      keys.VIDEOS,
      video._id,
      "summarize",
      "chapters",
      "highlights",
    ]);
  }, [field1Prompt, field2Prompt, field3Prompt]);

  /** Format seconds to hours:minutes:seconds */
  function formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  }
  return (
    <ErrorBoundary>
      <div className="result">
        {field1Prompt.isChecked && isSubmitted && (
          <div className="resultSection">
            <h2>Sentences</h2>
            {field1Result ? (
              <div>{field1Result.summary}</div>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        )}

        {field2Prompt.isChecked && isSubmitted && (
          <div className="resultSection">
            <h2>Chapters</h2>
            <div>
              {field2Result &&
                Array.isArray(field2Result.chapters) &&
                field2Result.chapters.map((chapter) => (
                  <div
                    className="videoAndDescription"
                    key={chapter.chapter_title}
                  >
                    <Video
                      url={video.source.url}
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
                          {formatTime(chapter.start)} -{" "}
                          {formatTime(chapter.end)}
                        </div>
                      </div>
                      <div className="summary">{chapter.chapter_summary}</div>
                    </div>
                  </div>
                ))}
              {field2Result && !field2Result.chapters && (
                <p>No chapters available</p>
              )}
              {!field2Result && <LoadingSpinner />}
            </div>
          </div>
        )}

        {field3Prompt.isChecked && isSubmitted && (
          <div className="resultSection">
            <h2>Highlights</h2>
            <div>
              {field3Result &&
                Array.isArray(field3Result.highlights) &&
                field3Result.highlights.map((highlight) => (
                  <div
                    className="videoAndDescription"
                    key={highlight.highlight}
                  >
                    <Video
                      url={video.source.url}
                      start={highlight.start}
                      end={highlight.end}
                    />
                    <div className="titleAndSummary">
                      <div className="timeStamp">
                        {formatTime(highlight.start)} -{" "}
                        {formatTime(highlight.end)}
                      </div>
                      <TitleAndSummary
                        summary={highlight.highlight_summary}
                        title={highlight.highlight}
                      />
                    </div>
                  </div>
                ))}
              {field3Result && !field3Result.highlights && (
                <p>No highlights available</p>
              )}
              {!field3Result && <LoadingSpinner />}
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
