import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { IPost, TPostStatusType } from "../Types";
import useSearch from "../hooks/useSearch";
import useUpdateRate from "../hooks/useUpdateRate";
import useGetPosts, { fetchPosts } from "../hooks/useGetPosts";
import { Table, Form, ButtonGroup, Button } from "react-bootstrap";
import useDeletePost from "../hooks/useDeletePost";

interface IPostListProps {
  selectedPostStatus: TPostStatusType;
  searchQuery: string;
}

const PostList = ({ selectedPostStatus, searchQuery }: IPostListProps) => {
  const [paginate, setPagintae] = useState(1);
  const queryClient = useQueryClient();
  const { data, isError, error, isLoading, isStale, refetch } = useGetPosts(
    selectedPostStatus,
    paginate
  );
  const searchedData = useSearch(searchQuery);
  const updateRate = useUpdateRate();
  const deletePost = useDeletePost();

  useEffect(() => {
    const nextPage = paginate + 1;
    if (nextPage > 3) return;
    queryClient.prefetchQuery({
      queryKey: ["posts", { paginate: nextPage, selectedPostStatus: "all" }],
      queryFn: () => fetchPosts("all", nextPage),
    });
  }, [paginate, queryClient]);

  if (isLoading || searchedData.isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (searchedData.isError) {
    return <div>Error: {searchedData.error.message}</div>;
  }
  return (
    <>
      {
        <Button
          className="mb-3"
          onClick={() => refetch()}
          style={{
            visibility:
              isStale && searchQuery.length == 0 ? "visible" : "hidden",
          }}
        >
          Update Data
        </Button>
      }
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Status</th>
            <th style={{ width: "10%" }}>Top Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {searchQuery.length === 0 &&
            data?.map((post: IPost, idx: number) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <Link
                    to={`/info?id=${post.id}&type=paginate&key=${paginate}`}
                  >
                    {post.title}
                  </Link>
                </td>
                <td>Otto</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check // prettier-ignore
                    type="switch"
                    checked={post.topRate}
                    disabled={selectedPostStatus !== "all"}
                    onChange={(e) =>
                      updateRate.mutate({
                        postID: post.id,
                        rateValue: e.target.checked,
                        pageNumber: paginate,
                      })
                    }
                  />
                </td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      onClick={() => deletePost.mutate(post.id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          {searchQuery.length > 0 &&
            searchedData?.data?.map((post: IPost, idx: number) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  <Link
                    to={`/info?id=${post.id}&type=search&key=${searchQuery}`}
                  >
                    {post.title}
                  </Link>
                </td>
                <td>Otto</td>
                <td style={{ textAlign: "center" }}>
                  <Form.Check // prettier-ignore
                    type="switch"
                    checked={post.topRate}
                    disabled={searchQuery.length > 0}
                  />
                </td>
                <td>
                  <ButtonGroup aria-label="Basic example">
                    <Button
                      onClick={() => deletePost.mutate(post.id)}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {searchQuery.length === 0 && selectedPostStatus === "all" && (
        <ButtonGroup aria-label="Basic example" className="mb-3">
          <Button variant="light" onClick={() => setPagintae(1)}>
            1
          </Button>
          <Button variant="light" onClick={() => setPagintae(2)}>
            2
          </Button>
          <Button variant="light" onClick={() => setPagintae(3)}>
            3
          </Button>
        </ButtonGroup>
      )}
    </>
  );
};

export default PostList;
