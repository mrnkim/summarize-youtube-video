import loadingSpinner from "./LoadingSpinner.svg";

function LoadingSpinner() {
  return (
    <div className="loading-spinner-wrapper">
      <div className=" loading-spinner">
        <img src={loadingSpinner} alt="Loading Spinner" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
