import { React } from "react";
import { useQueryClient } from "@tanstack/react-query";
import keys from "./keys";
import "./InputForm.css";

/** Receive user's check prompt for the API call
 *
 * App -> SummarizeVideo -> {InputForm}
 *
 */
export function InputForm({
  video,
  field1Prompt,
  setField1Prompt,
  field2Prompt,
  setField2Prompt,
  field3Prompt,
  setField3Prompt,
  field1,
  field2,
  field3,
  setIsSubmitted,
  setShowVideoTitle,
}) {
  const queryClient = useQueryClient();

  /** Toggle check for each prompt */
  function handleCheck(promptType) {
    switch (promptType) {
      case field1:
        setField1Prompt((prevState) => ({
          ...prevState,
          isChecked: !prevState.isChecked,
        }));
        break;
      case field2:
        setField2Prompt((prevState) => ({
          ...prevState,
          isChecked: !prevState.isChecked,
        }));
        break;
      case field3:
        setField3Prompt((prevState) => ({
          ...prevState,
          isChecked: !prevState.isChecked,
        }));
        break;
      default:
        break;
    }
  }

  /** Combine user input and make API call(s)  */
  async function handleClick(event) {
    event.preventDefault();

    if (field1Prompt.isChecked) {
      field1Prompt["type"] = field1;
    }

    if (field2Prompt.isChecked) {
      field2Prompt["type"] = field2;
    }

    if (field3Prompt.isChecked) {
      field3Prompt["type"] = field3;
    }

    setIsSubmitted(true);
    setShowVideoTitle(true);
    queryClient.invalidateQueries([
      keys.VIDEOS,
      video._id,
      "summarize",
      "chapters",
      "highlights",
    ]);

  }

  return (
    <div className="inputForm">
      <div className="title">Choose a summary format</div>
      <form className="form">
        <div className="checkboxes">
          <div className="checkbox-container">
            <input
              type="checkbox"
              id={field1}
              name={field1}
              checked={field1Prompt.isChecked}
              onChange={() => handleCheck(field1)}
            />
            <label className="label" htmlFor={field1}>
              {field1}
            </label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id={field2}
              name={field2}
              checked={field2Prompt.isChecked}
              onChange={() => handleCheck(field2)}
            />
            <label className="label" htmlFor={field2}>
              {field2}s
            </label>
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id={field3}
              name={field3}
              checked={field3Prompt.isChecked}
              onChange={() => handleCheck(field3)}
            />
            <label className="label" htmlFor={field3}>
              {field3}
            </label>
          </div>
        </div>
        <button
          className="generateButton"
          onClick={handleClick}
          disabled={
            !field1Prompt.isChecked &&
            !field2Prompt.isChecked &&
            !field3Prompt.isChecked
          }
        >
          Generate
        </button>{" "}
      </form>
    </div>
  );
}
