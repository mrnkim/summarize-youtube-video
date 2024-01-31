import React from "react";
import WarningIcon from "./Warning.svg";
import "./ErrorFallback.css";

/** Component to show when there is an error */
function ErrorFallback({ error }) {
  function handleGoBack() {
    window.location.reload();
  }

  return (
    <div className="errorFallback" role="alert">
      <div className="errorFallback__warningMessageWrapper">
        <img
          className="errorFallback__warningMessageWrapper__warningIcon"
          src={WarningIcon}
          alt="WarningIcon"
        ></img>
        <div className="errorFallback__warningMessageWrapper__warningMessage">
          {error?.message || "Unknown error"}
        </div>
      </div>
      <div className="errorFallback__resetButtonWrapper">
        <button
          className="errorFallback__resetButtonWrapper__resetButton"
          onClick={handleGoBack}
        >
          Go back
        </button>
      </div>
    </div>
  );
}

export default ErrorFallback;
