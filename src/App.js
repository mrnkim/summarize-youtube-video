import "./App.css";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { SummarizeVideo } from "./SummarizeVideo";
import TwelveLabsApi from "./TwelveLabsApi";

/** Summarize a Video App
 *
 * App -> SummarizeVideo
 *
 */

function App() {
  const [video, setVideo] = useState({ data: null, isLoading: true });
  const INDEX_ID = process.env.REACT_APP_INDEX_ID;

  useEffect(function fetchVideoOnMount() {
    fetchVideo();
  }, []);

  /** Fetch the first video of a given index */
  async function fetchVideo() {
    try {
      const response = await TwelveLabsApi.getFirstVideo(INDEX_ID);
      if (response && response?.length > 0) {
        const videoId = response[0]["_id"];
        const videoDetail = await TwelveLabsApi.getVideo(INDEX_ID, videoId);
        setVideo({ data: videoDetail, isLoading: false });
      } else {
        setVideo({ data: null, isLoading: false });
      }
    } catch (error) {
      console.error("Error fetching video:", error);
      setVideo({ data: null, isLoading: false });
    }
  }

  if (video.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app">
      <SummarizeVideo video={video} index={INDEX_ID} fetchVideo={fetchVideo} />
    </div>
  );
}

export default App;
