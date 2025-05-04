import axios from "axios";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { IPost } from "../Types";

const getPost = async (postID: string): Promise<IPost> => {
  const result = await axios.get<IPost>(
    `http://localhost:3300/posts/${postID}`
  );
  return result.data;
};

const useGetPost = (
  postID: string,
  paramType: string,
  paramKey: string
): UseQueryResult<IPost> => {
  const queryClient = useQueryClient();
  let cachedData: IPost[] | undefined;
  if (paramType === "paginate") {
    cachedData = queryClient.getQueryData([
      "posts",
      { paginate: +paramKey, selectedPostStatus: "all" },
    ]);
  } else {
    cachedData = queryClient.getQueryData([
      "posts",
      "search",
      { q: paramKey},
    ]);
  }
  return useQuery({
    queryKey: ["posts", { postID: +postID }],
    queryFn: () => getPost(postID),
    staleTime: 1000 * 60 * 5,
    initialData: ()=>{
        if(!cachedData) return undefined;
        const result= cachedData.find((post) => post.id === +postID);
        return result;
    }


  });
};

export default useGetPost;
