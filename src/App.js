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
  const [videoId, setVideoId] = useState(null);
  console.log("🚀 > App > videoId=", videoId);
  const INDEX_ID = process.env.REACT_APP_INDEX_ID;

  const { data, refetch, error } = useGetVideos(INDEX_ID);
  console.log("🚀 > App > data=", data);

  // useEffect(() => {
  //   if (data && data.data && data.data.length > 0) {
  //     setVideoId(data.data[0]["_id"]);
  //   }
  // }, [data]);

  /** Fetch the first video of a given index */
  // async function fetchVideo() {
  //   try {
  //     const response = await TwelveLabsApi.getFirstVideo(INDEX_ID);
  //     if (data.data?.length > 0) {
  //       const videoId = data.data[0]["_id"];
  //       const videoDetail = await TwelveLabsApi.getVideo(INDEX_ID, videoId);
  //       setVideo({ data: videoDetail, isLoading: false });
  //     } else {
  //       setVideo({ data: null, isLoading: false });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching video:", error);
  //     setVideo({ data: null, isLoading: false });
  //   }
  // }

  // if (video.isLoading) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className="app">
      <SummarizeVideo index={INDEX_ID} videoId={data.data[0]["_id"]} />
    </div>
  );
}

export default App;
