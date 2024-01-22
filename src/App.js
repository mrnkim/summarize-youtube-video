import "./App.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { SummarizeVideo } from "./SummarizeVideo";
import { useGetVideos } from "./apiHooks";

/** Summarize a Video App
 *
 * App -> SummarizeVideo
 *
 */

function App() {
  const INDEX_ID = process.env.REACT_APP_INDEX_ID;

  const { data, refetch } = useGetVideos(INDEX_ID);

  return (
    <div className="app">
      <SummarizeVideo
        index={INDEX_ID}
        videoId={data.data[0]["_id"] || null}
        fetchVideo={refetch}
      />
    </div>
  );
}

export default App;
