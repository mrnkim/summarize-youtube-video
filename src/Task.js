import { React, Suspense, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import keys from "./keys";
import LoadingSpinner from "./LoadingSpinner";
import { useGetTask } from "./apiHooks";
import { ErrorBoundary } from "react-error-boundary";

export function Task({ taskId, refetchVideos, setTaskVideo }) {
  const { data } = useGetTask(taskId);
  console.log("🚀 > Task > data=", data);

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
    <div>
      <LoadingSpinner />
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
        <div className="videoAndStatus">

          {data && data.status ? `${data.status}...` : null}
          </div>

        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
