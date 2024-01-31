import loadingSpinner from "./LoadingSpinner.svg";
import "./LoadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="LoadingSpinner">
      <div className="LoadingSpinner__wrapper">
        <img
          className="LoadingSpinner__img"
          src={loadingSpinner}
          alt="Loading Spinner"
        />
      </div>
    </div>
  );
}

export default LoadingSpinner;
