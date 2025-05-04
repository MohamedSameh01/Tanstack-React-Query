import axios,{AxiosError} from "axios";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { IPost, ITopRateResult } from "../Types";



const updateRate = async (rate: ITopRateResult): Promise<IPost> => {
  const result = await axios.patch<IPost>(`http://localhost:3300/posts/${rate.postID}`,{topRate:rate.rateValue});
  return result.data;
};



const useUpdateRate = ():UseMutationResult<IPost,AxiosError,ITopRateResult> => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: updateRate,
      onMutate: (values) => {
        const oldData = queryClient.getQueryData([
          "posts",
          { paginate: values.pageNumber, selectedPostStatus: "all" },
        ]);
        queryClient.setQueryData(
          ["posts", { paginate: values.pageNumber, selectedPostStatus: "all" }],
          (data: IPost[]) =>
            data.map((el) => {
              if (el.id === values.postID) {
                return { ...el, topRate: values.rateValue };
              } else {
                return el;
              }
            })
        );

        return () => {
          queryClient.setQueryData(
            [
              "posts",
              { paginate: values.pageNumber, selectedPostStatus: "all" },
            ],
            oldData
          );
        };
      },
      onError: (error, variables, rollback) => {
        if (rollback) rollback();
      },
    });
}

export default useUpdateRate