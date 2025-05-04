import axios from "axios"
import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { ICommentResponse } from "../Types";

const getAllcomments=async(postID:string,signal:AbortSignal):Promise<ICommentResponse[]>=>{
    const result=await axios.get<ICommentResponse[]>(`http://localhost:3300/comments?post_id=${postID}&_sort=id&_order=desc`,{signal});
    return result.data;
}



const useGetAllComments = (postID:string):UseQueryResult<ICommentResponse[]> => {
  return useQuery({
    queryKey: ["comments", { postID: +postID }],
    queryFn: ({signal}) => getAllcomments(postID,signal),
    staleTime: 1000 * 60 * 5,

  })
}

export default useGetAllComments