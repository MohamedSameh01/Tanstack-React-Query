import axios, { AxiosError } from "axios";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { IComment, ICommentResponse } from "../Types";

const requestData = async (data: IComment): Promise<ICommentResponse> => {
  const result = await axios.post<ICommentResponse>(
    "http://localhost:3300/comments",
    data
  );
  return result.data;
};

const useAddComment = (): UseMutationResult<
  ICommentResponse,
  AxiosError,
  IComment
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestData,
    // mutate here used to add the comment and then check if the request is successful or not
    onMutate: (data: IComment) => {
      // get first the old Data
      const savedComments = queryClient.getQueryData([
        "comments",
        { postID: data.postID },
      ]);
      const newComment = { ...data, id: new Date() };
      queryClient.setQueryData(
        ["comments", { postID: data.postID }],
        (comments: IComment[]) => [newComment, ...comments]
      );

      return () => {
        // rollback the data to the old one if the request fails
        queryClient.setQueryData(
          ["comments", { postID: data.postID }],
          savedComments
        );
      };
    },
    onError: (error, variables, rollback) => {
      if (rollback) rollback();
    },
    onSuccess: () => {
      console.log("Comment added successfully");
      queryClient.invalidateQueries({
        queryKey: ["comments"],
        exact: false,
      });
    },
  });
};

export default useAddComment;
