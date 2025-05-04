export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
  status: "publish"|"draft"|"block";
  topRate: boolean;
}

export type TPostStatusType = "published" | "draft" | "block" | "all";


export interface IComment {
  body: string;
  postID: number;
}
export interface ICommentResponse {
  id: number;
  body: string;
  postID: number;
}


export interface ITopRateResult{
  postID:number;
  rateValue:boolean;
  pageNumber:number;
}