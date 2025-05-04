import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IPost, TPostStatusType } from "../Types";

export const fetchPosts = async (
  selectedPostStatus: TPostStatusType,
  paginate: number
): Promise<IPost[]> => {
  if (selectedPostStatus === "all") {
    const result = await axios.get<IPost[]>(`http://localhost:3300/posts?_page=${paginate}&_limit=5`);
    return result.data;
  } else {
    const result = await axios.get<IPost[]>(
      `http://localhost:3300/posts?status=${selectedPostStatus}`
    );
    return result.data;
  }
};

const useGetPosts = (
  selectedPostStatus: TPostStatusType,
  paginate: number
): UseQueryResult<IPost[]> => {
  const query = useQuery({
    queryKey: ["posts", { selectedPostStatus, paginate }],
    queryFn: () => fetchPosts(selectedPostStatus, paginate),
    staleTime: 1000 *60,
    // refetchInterval:1000*10
  });

  return query;
};

export default useGetPosts;
