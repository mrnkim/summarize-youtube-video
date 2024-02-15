import "./App.css";
import { useEffect, Suspense } from "react";
import { useQueryClient } from "@tanstack/react-query";
import keys from "./keys";
import LoadingSpinner from "./LoadingSpinner";
import { SummarizeVideo } from "./SummarizeVideo";
import { useGetVideos } from "./apiHooks";
import { ErrorBoundary } from "./ErrorBoundary";
import apiConfig from "./apiConfig";
import ErrorFallback from "./ErrorFallback";

function App() {
  const { data: videos, refetch: refetchVideos } = useGetVideos(
    apiConfig.INDEX_ID
  );

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([keys.VIDEOS, apiConfig.INDEX_ID]);
  }, [apiConfig.INDEX_ID, queryClient]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="app">
          {!videos.data && <ErrorFallback error={videos} />}
          {videos.data && (
            <SummarizeVideo
              index={apiConfig.INDEX_ID}
              videoId={videos.data[0]?._id || null}
              refetchVideos={refetchVideos}
            />
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
