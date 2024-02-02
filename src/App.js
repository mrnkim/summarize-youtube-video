import "./App.css";
import { useEffect, Suspense } from "react";
import { useQueryClient } from "@tanstack/react-query";
import keys from "./keys";
import LoadingSpinner from "./LoadingSpinner";
import { SummarizeVideo } from "./SummarizeVideo";
import { useGetVideos } from "./apiHooks";
import { ErrorBoundary } from "./ErrorBoundary";
import apiConfig from "./apiConfig";

function App() {
  const { data, refetch: refetchVideos } = useGetVideos(apiConfig.INDEX_ID);

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([keys.VIDEOS, apiConfig.INDEX_ID]);
  }, [apiConfig.INDEX_ID, queryClient]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="app">
          <SummarizeVideo
            index={apiConfig.INDEX_ID}
            videoId={data?.data[0]?._id || null}
            refetchVideos={refetchVideos}
          />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
