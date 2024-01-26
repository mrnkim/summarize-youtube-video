import { React, useState, useEffect, Suspense } from "react";
import { TitleAndSummary } from "./TitleAndSummary";
import { Video } from "./Video";
import { useQueryClient } from "@tanstack/react-query";
import TwelveLabsApi from "./TwelveLabsApi";
import LoadingSpinner from "./LoadingSpinner";
import "./Result.css";
import { fetchGenerateSummary } from "./apiHooks";

/** Shows the results
 *
 * App -> SummarizeVideo -> {Result}
 *
 */

export function Result({
  video,
  setIsSubmitted,
  isSubmitted,
  field1Prompt,
  field2Prompt,
  field3Prompt,
  field1Result,
  field2Result,
  field3Result,
  setField1Result,
  setField2Result,
  setField3Result,
  setResultLoading,
  resultLoading,
  resetResults,
}) {
  console.log("🚀 >  isSubmitted=",  isSubmitted)
  /** Make API call to generate summary, chapters, and highlights of a video  */
  async function generate(data) {
    const response = await fetchGenerateSummary(queryClient, data, video._id);
    return response;
  }

  const queryClient = useQueryClient();

  async function fetchData() {
    resetResults();
    try {
      if (field1Prompt.type && field1Prompt.isChecked) {
        const response = await generate(field1Prompt);
        setField1Result({
          fieldName: field2Prompt.type,
          result: response?.summary,
        });
      }

      if (field2Prompt.type && field2Prompt.isChecked) {
        const response = await generate(field2Prompt);
        setField2Result({
          fieldName: field2Prompt.type,
          result: response?.chapters,
        });
      }

      if (field3Prompt.type && field3Prompt.isChecked) {
        const response = await generate(field3Prompt);
        setField3Result({
          fieldName: field3Prompt.type,
          result: response?.highlights,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setResultLoading(false);
      setIsSubmitted(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [isSubmitted]);

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
      {resultLoading && <LoadingSpinner />}

      {!resultLoading && field1Result && field1Result.result?.length > 0 && (
        <Suspense fallback={<LoadingSpinner />}>
          <div className="resultSection">
            <h2>Sentences</h2>
            <div>{field1Result.result}</div>
          </div>
        </Suspense>
      )}

      {!resultLoading && field2Result && field2Result.result?.length > 0 && (
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

      {!resultLoading && field3Result && field3Result.result?.length > 0 && (
        <div className="resultSection">
          <h2>Highlights</h2>
          <div>
            {Array.isArray(field3Result.result) ? (
              field3Result.result.map((highlight) => (
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
