import "./TitleAndSummary.css";

/** Show given title and summary */
export function TitleAndSummary({ title, summary }) {
  return (
    <div className="titleAndSummary">
      <div className="titleAndSummary__title">{title}</div>
      <div className="titleAndSummary__summary">{summary}</div>
    </div>
  );
}
