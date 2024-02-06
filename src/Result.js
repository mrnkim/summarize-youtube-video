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
  field1Prompt,
  field2Prompt,
  field3Prompt,
}) {
  const { data: field1Result } = useGenerateSummary(
    field1Prompt,
    video?._id,
    Boolean(video?._id && field1Prompt?.type && isSubmitted)
  );
  const { data: field2Result } = useGenerateChapters(
    field2Prompt,
    video?._id,
    Boolean(video?._id && field2Prompt?.type && isSubmitted)
  );
  const { data: field3Result } = useGenerateHighlights(
    field3Prompt,
    video?._id,
    Boolean(video?._id && field3Prompt?.type && isSubmitted)
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([
      keys.VIDEOS,
      video?._id,
      "summarize",
      "chapters",
      "highlights",
    ]);
  }, [field1Prompt?.type, field2Prompt?.type, field3Prompt?.type]);

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
        {field1Prompt?.type && isSubmitted && (
          <div className="result__summary">
            <h2 className="result__summary__title">Sentences</h2>
            {field1Result ? (
              <div className="result__summary__summary">
                {field1Result.summary}
              </div>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        )}
        {field2Prompt?.type && isSubmitted && (
          <div className="result__chapters">
            <h2 className="result__chapters__title">Chapters</h2>
            <div className="result__chapters__wrapper">
              {field2Result &&
                Array.isArray(field2Result.chapters) &&
                field2Result.chapters.map((chapter) => (
                  <div
                    className="result__chapters__wrapper__chapter"
                    key={chapter.chapter_title}
                  >
                    <Video
                      url={video.source.url}
                      start={chapter.start}
                      end={chapter.end}
                      width={"221px"}
                      height={"120px"}
                    />
                    <div className="result__chapters__wrapper__chapter__wrapper">
                      <div className="result__chapters__wrapper__chapter__wrapper_titleTime">
                        <div className="result__chapters__wrapper__chapter__wrapper_titleTime_title">
                          {" "}
                          {chapter.chapter_title}
                        </div>
                        <div className="result__chapters__wrapper__chapter__wrapper_titleTime_time">
                          {formatTime(chapter.start)} -{" "}
                          {formatTime(chapter.end)}
                        </div>
                      </div>
                      <div className="result__chapters__wrapper__chapter__wrapper__summary">
                        {chapter.chapter_summary}
                      </div>
                    </div>
                  </div>
                ))}
              {field2Result && !field2Result.chapters && (
                <p className="result__chapters__wrapper__message">
                  No chapters available
                </p>
              )}
              {!field2Result && <LoadingSpinner />}
            </div>
          </div>
        )}
        {field3Prompt?.type && isSubmitted && (
          <div className="result__highlights">
            <h2 className="result__highlights__title">Highlights</h2>
            <div className="result__highlights__wrapper">
              {field3Result &&
                Array.isArray(field3Result.highlights) &&
                field3Result.highlights.map((highlight) => (
                  <div
                    className="result__highlights__wrapper__highlight"
                    key={highlight.highlight}
                  >
                    <Video
                      url={video.source.url}
                      start={highlight.start}
                      end={highlight.end}
                      width={"221px"}
                      height={"120px"}
                    />
                    <div className="result__highlights__wrapper__highlight__timeSummary">
                      <div className="result__highlights__wrapper__highlight__timeSummary__time">
                        {formatTime(highlight.start)} -{" "}
                        {formatTime(highlight.end)}
                      </div>
                      <TitleAndSummary
                        summary={
                          highlight.highlight_summary || highlight.highlight
                        }
                      />
                    </div>
                  </div>
                ))}
              {field3Result && !field3Result.highlights && (
                <p className="result__highlights__wrapper__message">
                  No highlights available
                </p>
              )}
              {!field3Result && <LoadingSpinner />}
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
