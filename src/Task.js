import { React, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import keys from "./keys";
import { Video } from "./Video";
import LoadingSpinner from "./LoadingSpinner";
import { useGetTask } from "./apiHooks";

export function Task({ taskId, refetchVideos, setTaskVideo }) {
  const { data } = useGetTask(taskId);
  console.log("🚀 > Task > data =", data);

  const queryClient = useQueryClient();
  // const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    if (data && (data.status === "ready" || data.status === "failed")) {
      // setShouldRefresh(true);
      setTaskVideo(null);
      refetchVideos();
    }
  }, [data, data.status]);

  // useEffect(() => {
  //   if (shouldRefresh) {
  //     queryClient.invalidateQueries({
  //       queryKey: [keys.VIDEOS, index],
  //     });
  //     setShouldRefresh(false); // Reset the state after triggering the refresh
  //   }
  // }, [shouldRefresh, queryClient]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [keys.TASK, taskId],
    });
  }, [queryClient, keys.TASK, taskId]);

  return (
    <div className="videoAndStatus">
      <LoadingSpinner />
      {data ? `${data.status}...` : "Submitting..."}
    </div>
  );
}
