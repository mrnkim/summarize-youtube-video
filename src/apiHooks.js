import {
  useQuery,
  useQueries,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import keys from "./keys";
import apiConfig from "./apiConfig";

export function useGetIndexes(page, pageLimit) {
  return useQuery({
    queryKey: [keys.INDEXES, page],
    queryFn: () =>
      apiConfig.SERVER.get(
        `${apiConfig.INDEXES_URL}?page=${page}&page_limit=${pageLimit}`
      ).then((res) => res.data),
  });
}

export function useGetIndex(indexId) {
  return useQuery({
    queryKey: [keys.INDEX, indexId],
    queryFn: async () => {
      const response = await apiConfig.SERVER.get(
        `${apiConfig.INDEXES_URL}/${indexId}`
      );
      if (response.data.error) {
        return { error: response.data.error };
      }
      return response.data;
    },
  });
}

export function useCreateIndex(setIndexId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (indexName) =>
      apiConfig.SERVER.post(apiConfig.INDEXES_URL, { indexName }).then(
        (res) => res.data
      ),
    onSuccess: (newIndex) => {
      setIndexId(newIndex._id);
      queryClient.invalidateQueries([keys.INDEX, newIndex._id]);
    },
    mutationKey: "createIndex",
  });
}

export function useDeleteIndex(setIndexId) {
  return useMutation({
    mutationFn: (indexId) =>
      apiConfig.SERVER.delete(
        `${apiConfig.INDEXES_URL}?indexId=${indexId}`
      ).then((res) => res.data),
    onSuccess: () => {
      setIndexId(null);
    },
    mutationKey: "deleteIndex",
  });
}

export function useGetVideos(indexId) {
  return useQuery({
    queryKey: [keys.VIDEOS, indexId],
    queryFn: async () => {
      try {
        const response = await apiConfig.SERVER.get(
          `${apiConfig.INDEXES_URL}/${indexId}/videos`,
          {
            params: { page_limit: apiConfig.PAGE_LIMIT },
          }
        );
        return response.data;
      } catch (error) {
        throw error.response?.data || error;
      }
    },
  });
}

export function useGetVideo(indexId, videoId) {
  return useQuery({
    queryKey: [keys.VIDEOS, indexId, videoId],
    queryFn: async () => {
      try {
        const response = await apiConfig.SERVER.get(
          `${apiConfig.INDEXES_URL}/${indexId}/videos/${videoId}`
        );

        if (response.data.error) {
          throw new Error(response.data.error);
        }

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onError: (error) => {
      console.error("useGetVideo hook error:", error);
    },
  });
}

export async function fetchVideoInfo(queryClient, url) {
  try {
    const response = await queryClient.fetchQuery({
      queryKey: [keys.VIDEO, url],
      queryFn: async () => {
        const response = await apiConfig.SERVER.get(
          `/video-info?url=${encodeURIComponent(url)}`
        );
        const respData = response.data;
        return respData;
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching video information:", error);
    throw error;
  }
}

export async function fetchGenerateSummary(queryClient, data, videoId) {
  try {
    const response = await queryClient.fetchQuery({
      queryKey: [keys.VIDEOS, "summarize", videoId],
      queryFn: async () => {
        const response = await apiConfig.SERVER.post(
          `/videos/${videoId}/summarize`,
          { data: data }
        );
        const respData = response.data;
        return respData;
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching next page of search results:", error);
    throw error;
  }
}

export function useGenerateSummary(data, videoId, enabled) {
  return useQuery({
    queryKey: [keys.VIDEOS, "summarize", videoId],
    queryFn: async () => {
      if (!enabled) {
        return null;
      }

      const response = await apiConfig.SERVER.post(
        `/videos/${videoId}/summarize`,
        { data }
      );
      const respData = response.data;
      return respData;
    },
    enabled: enabled,
  });
}

export function useGenerateChapters(data, videoId, enabled) {
  return useQuery({
    queryKey: [keys.VIDEOS, "chapters", videoId],
    queryFn: async () => {
      if (!enabled) {
        return null;
      }

      const response = await apiConfig.SERVER.post(
        `/videos/${videoId}/summarize`,
        { data }
      );
      const respData = response.data;
      return respData;
    },
    enabled: enabled,
  });
}

export function useGenerateHighlights(data, videoId, enabled) {
  return useQuery({
    queryKey: [keys.VIDEOS, "highlights", videoId],
    queryFn: async () => {
      if (!enabled) {
        return null;
      }

      const response = await apiConfig.SERVER.post(
        `/videos/${videoId}/summarize`,
        { data }
      );
      const respData = response.data;
      return respData;
    },
    enabled: enabled,
  });
}

export function useGetAllAuthors(indexId) {
  return useQuery({
    queryKey: [keys.AUTHORS, indexId],
    queryFn: () =>
      apiConfig.SERVER.get(`${apiConfig.INDEXES_URL}/${indexId}/authors`).then(
        (res) => res.data
      ),
  });
}

export function useSearchVideo(indexId, query) {
  return useQuery({
    queryKey: [keys.SEARCH, indexId, query],
    queryFn: () =>
      apiConfig.SERVER.post(apiConfig.SEARCH_URL, {
        indexId,
        query,
      }).then((res) => res.data),
  });
}

export function useGetSearchResults(indexId, pageToken) {
  return useInfiniteQuery({
    queryKey: [keys.SEARCH, pageToken],
    queryFn: () =>
      apiConfig.SERVER.get(`${apiConfig.SEARCH_URL}/${pageToken}`).then(
        async (res) => {
          const searchData = res.data;

          // Fetch videos for each search result
          const videosPromises = searchData.data.map(async (searchResult) => {
            const videoResponse = await apiConfig.SERVER.get(
              `${apiConfig.INDEXES_URL}/${indexId}/videos/${searchResult.id}`
            );
            return videoResponse.data;
          });

          // Wait for all video requests to complete
          const videos = await Promise.all(videosPromises);

          // Attach videos to the search result data
          const searchDataWithVideos = {
            ...searchData,
            videos: videos,
          };
          return searchDataWithVideos;
        }
      ),
    getNextPageParam: (lastPage) => {
      const nextPageToken = lastPage.page_info.next_page_token || undefined;
      return nextPageToken || null;
    },
  });
}

export function useGetTask(taskId) {
  return useQuery({
    queryKey: [keys.TASK, taskId],
    queryFn: () =>
      apiConfig.SERVER.get(`${apiConfig.TASKS_URL}/${taskId}`).then(
        (res) => res.data
      ),
    refetchInterval: (data) => {
      return data?.status === "ready" || data?.status === "failed"
        ? false
        : 5000;
    },
    refetchIntervalInBackground: true,
  });
}

export function useGetVideosOfSearchResults(indexId, query) {
  const {
    data: initialSearchData,
    refetch,
    isLoading,
  } = useSearchVideo(indexId, query);
  const initialSearchResults = initialSearchData.data || [];

  const resultVideos = useQueries({
    queries: initialSearchResults.map((searchResult) => ({
      queryKey: [keys.SEARCH, indexId, searchResult.id],
      queryFn: () =>
        apiConfig.SERVER.get(
          `${apiConfig.INDEXES_URL}/${indexId}/videos/${searchResult.id}`
        ).then((res) => res.data),
    })),
  });
  const initialSearchResultVideos = resultVideos.map(({ data }) => data);
  return {
    initialSearchData,
    initialSearchResults,
    initialSearchResultVideos,
    refetch,
    isLoading,
  };
}

export async function fetchNextPageSearchResults(queryClient, nextPageToken) {
  try {
    const response = await queryClient.fetchQuery({
      queryKey: [keys.SEARCH, nextPageToken],
      queryFn: async () => {
        const response = await apiConfig.SERVER.get(
          `${apiConfig.SEARCH_URL}/${nextPageToken}`
        );
        const data = response.data;
        return data;
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching next page of search results:", error);
    throw error;
  }
}

export async function fetchNextPageSearchResultVideos(
  queryClient,
  currIndex,
  nextPageResultId
) {
  try {
    const response = await queryClient.fetchQuery({
      queryKey: [keys.VIDEOS, currIndex, nextPageResultId],
      queryFn: async () => {
        const response = await apiConfig.SERVER.get(
          `${apiConfig.INDEXES_URL}/${currIndex}/videos/${nextPageResultId}`
        );
        const data = response.data;
        return data;
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching next page of search results:", error);
    throw error;
  }
}
