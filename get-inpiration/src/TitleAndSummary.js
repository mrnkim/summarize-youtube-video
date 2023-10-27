import "./TitleAndSummary.css";

export function TitleAndSummary({ title, summary }) {
  return (
    <div>
      <div className="titleSummary">{title}</div>
      <div className="summary">{summary}</div>
    </div>
  );
}
