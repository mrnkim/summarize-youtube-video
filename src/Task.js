import { React, Suspense, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import keys from "./keys";
import LoadingSpinner from "./LoadingSpinner";
import { useGetTask } from "./apiHooks";
import { ErrorBoundary } from "react-error-boundary";

export function Task({ taskId, refetchVideos, setTaskVideo }) {
  const { data } = useGetTask(taskId);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (data && (data.status === "ready" || data.status === "failed")) {
      setTaskVideo(null);
      refetchVideos();
    }
  }, [data, data.status]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [keys.TASK, taskId],
    });
  }, [queryClient, keys.TASK, taskId]);

  return (
    <div className="videoAndStatus">
      <LoadingSpinner />
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          {data ? `${data.status}...` : "Submitting..."}
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
