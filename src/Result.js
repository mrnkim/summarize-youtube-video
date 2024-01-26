import { React, useState, useEffect, Suspense } from "react";
import { TitleAndSummary } from "./TitleAndSummary";
import { Video } from "./Video";
import { useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "./LoadingSpinner";
import "./Result.css";
import {
  fetchGenerateSummary,
  useGenerateSummary,
  useGenerateChapters,
  useGenerateHighlights,
} from "./apiHooks";
import keys from "./keys";

/** Shows the results
 *
 * App -> SummarizeVideo -> {Result}
 *
 */

//TODO: Fix result logic to update check status

export function Result({
  video,
  setIsSubmitted,
  isSubmitted,
  field1Prompt,
  field2Prompt,
  field3Prompt,
  // field1Result,
  // field2Result,
  // field3Result,
  setField1Result,
  setField2Result,
  setField3Result,
  resetResults,
}) {
  console.log("🚀 >  isSubmitted=", isSubmitted);
  const {
    data: field1Result,
    isLoading: field1Loading,
    isStale: field1Invalidated,
  } = useGenerateSummary(
    field1Prompt,
    video._id,
    Boolean(field1Prompt.type && field1Prompt.isChecked && isSubmitted)
  );
  console.log("🚀 > field1Invalidated=", field1Invalidated);
  console.log("🚀 > field1Result=", field1Result);
  const {
    data: field2Result,
    isLoading: field2Loading,
    isStale: field2Invalidated,
  } = useGenerateChapters(
    field2Prompt,
    video._id,
    Boolean(field2Prompt.type && field2Prompt.isChecked && isSubmitted)
  );
  console.log("🚀 > field2Invalidated=", field2Invalidated);
  console.log("🚀 > field2Result=", field2Result);
  const {
    data: field3Result,
    isLoading: field3Loading,
    isStale: field3Invalidated,
  } = useGenerateHighlights(
    field3Prompt,
    video._id,
    Boolean(field3Prompt.type && field3Prompt.isChecked && isSubmitted)
  );
  console.log("🚀 > field3Invalidated=", field3Invalidated);
  console.log("🚀 > field3Result=", field3Result);

  const queryClient = useQueryClient();

  /** Make API call to generate summary, chapters, and highlights of a video  */
  // async function generate(data) {
  //   const response = await fetchGenerateSummary(queryClient, data, video._id);
  //   return response;
  // }

  // const queryClient = useQueryClient();

  // async function fetchData() {
  //   resetResults();
  //   try {
  //     if (field1Prompt.type && field1Prompt.isChecked) {
  //       const response = await generate(field1Prompt);
  //       setField1Result({
  //         fieldName: field2Prompt.type,
  //         result: response?.summary,
  //       });
  //     }

  //     if (field2Prompt.type && field2Prompt.isChecked) {
  //       const response = await generate(field2Prompt);
  //       setField2Result({
  //         fieldName: field2Prompt.type,
  //         result: response?.chapters,
  //       });
  //     }

  //     if (field3Prompt.type && field3Prompt.isChecked) {
  //       const response = await generate(field3Prompt);
  //       setField3Result({
  //         fieldName: field3Prompt.type,
  //         result: response?.highlights,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   } finally {
  //     setResultLoading(false);
  //     setIsSubmitted(false);
  //   }
  // }

  // useEffect(() => {
  //   queryClient.invalidateQueries([
  //     keys.VIDEOS,
  //     video._id,
  //     "summarize",
  //     "chapters",
  //     "highlights",
  //   ]);
  // }, [
  //   keys.VIDEOS,
  //   video._id,
  //   "summarize",
  //   "chapters",
  //   "highlights",
  //   queryClient,
  //   field1Prompt,
  //   field2Prompt,
  //   field3Prompt,
  //   isSubmitted,
  // ]);

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
    <div className="result">
      {/* {resultLoading && <LoadingSpinner />} */}

      {!field1Loading && field1Result && (
        <div className="resultSection">
          <h2>Sentences</h2>
          <div>{field1Result.summary}</div>
        </div>
      )}

      {!field2Loading && field2Result && (
        <div className="resultSection">
          <h2>Chapters</h2>
          <div>
            {Array.isArray(field2Result.chapters) ? (
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

      {!field3Loading && field3Result && (
        <div className="resultSection">
          <h2>Highlights</h2>
          <div>
            {Array.isArray(field3Result.highlights) ? (
              field3Result.highlights.map((highlight) => (
                <div className="videoAndDescription" key={highlight.highlight}>
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
