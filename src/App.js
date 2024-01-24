// App.js
import "./App.css";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import keys from "./keys";
import LoadingSpinner from "./LoadingSpinner";
import { SummarizeVideo } from "./SummarizeVideo";
import { useGetVideos } from "./apiHooks";

function App() {
  const INDEX_ID = process.env.REACT_APP_INDEX_ID;

  const { data, refetch: refetchVideos } = useGetVideos(INDEX_ID);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([keys.VIDEOS, INDEX_ID]);
  }, [keys.VIDEOS, INDEX_ID, queryClient]);

  return (
    <div className="app">
      <SummarizeVideo
        index={INDEX_ID}
        videoId={data?.data[0]?._id || null}
        refetchVideos={refetchVideos}
      />
    </div>
  );
}

export default App;
