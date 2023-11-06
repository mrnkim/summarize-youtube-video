import { React } from "react";
import "./InputForm.css";

/** Receive user's check prompt for the API call
 *
 * App -> SummarizeVideo -> {InputForm}
 *
 */
export function InputForm({
  field1Prompt,
  setField1Prompt,
  field2Prompt,
  setField2Prompt,
  field3Prompt,
  setField3Prompt,
  field1,
  field2,
  field3,
  generate,
  setField1Result,
  setField2Result,
  setField3Result,
  setLoading,
  loading,
}) {
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
    setLoading(false);
  }

  /** Combine user input and make API call(s)  */
  async function handleClick(event) {
    reset();
    event.preventDefault();

    const field1Data = {};
    const field2Data = {};
    const field3Data = {};

    if (field1Prompt.isChecked) {
      field1Data["type"] = field1;
    }

    if (field2Prompt.isChecked) {
      field2Data["type"] = field2;
    }

    if (field3Prompt.isChecked) {
      field3Data["type"] = field3;
    }

    setLoading(true);

    try {
      // Make the summary API call
      if (field1Data["type"]) {
        const summaryResponse = await generate(field1Data);
        setField1Result((prevField1Result) => ({
          ...prevField1Result,
          result: summaryResponse?.summary,
        }));
      }
      // Make the chapter API call
      if (field2Data["type"]) {
        const chapterResponse = await generate(field2Data);
        setField2Result((prevField2Result) => ({
          ...prevField2Result,
          result: chapterResponse?.chapters,
        }));
      }
      // Make the highlight API call
      if (field3Data["type"]) {
        const highlightResponse = await generate(field3Data);
        setField3Result((prevField3Result) => ({
          ...prevField3Result,
          result: highlightResponse?.highlights,
        }));
      }
    } finally {
      setLoading(false);
    }
  }

  /** Empty result(s) */
  function reset() {
    setField1Result({
      fieldName: field1,
      result: "",
    });
    setField2Result({
      fieldName: field2,
      result: "",
    });
    setField3Result({
      fieldName: field3,
      result: "",
    });
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
          disabled={loading}
        >
          Generate
        </button>{" "}
      </form>
    </div>
  );
}
