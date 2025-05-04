import axios from "axios";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { IPost } from "../Types";

const deletePost = async (postID: number): Promise<IPost> => {
  const result = await axios.delete<IPost>(
    `http://localhost:3300/posts/${postID}`
  );
  return result.data;
};

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact: false,
      });
    },
  });
};


export default useDeletePost;