import React from "react";
import WarningIcon from "./Warning.svg";
import "./ErrorFallback.css";

// TODO: Fix Styling
// TODO: Add refetch to Go Back button
/** Component to show when there is an error */
function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <div className="warningMessageWrapper">
        <img src={WarningIcon} alt="WarningIcon" className="icon"></img>
        <div className="warningMessage">
          {error?.message || "Unknown error"}
        </div>
      </div>
      <div className="resetButtonWrapper">
        <button className="resetButton">Go back</button>
      </div>
    </div>
  );
}

export default ErrorFallback;
