import { useSearchParams } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import useGetPost from "../hooks/useGetPost";
import { useState } from "react";
import useAddComment from "../hooks/useAddComment";
import useGetAllComments from "../hooks/useGetAllComments";
const Info = () => {
  const [searchParams] = useSearchParams();
  const [comment, setComment] = useState("");

  const postID = searchParams.get("id") as string;
  const paramType = searchParams.get("paramType") as string;
  const paramKey = searchParams.get("paramKey") as string;

  const { data, isLoading, isError, error } = useGetPost(
    postID,
    paramType,
    paramKey
  );

  const addComment = useAddComment();
  const allComments=useGetAllComments(postID);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment.mutate(
      { body: comment, postID: +postID },
      { onSuccess: () => setComment("") }
    );
  };
  return (
    <Row>
      <Col xs={6}>
        <h4>Title:{data?.title}</h4>
        <p>Status:{data?.status}</p>
        <p>Top Rate:{data?.topRate ? "true" : "false"}</p>
        <p>Body:{data?.body}</p>
        <hr />
        <h4 className="mb-2">Comments:</h4>
        <Form className="mb-3" onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="submit" disabled={addComment.isPending}>
              Submit
            </Button>
          </Form.Group>
        </Form>
        {allComments.isLoading ||allComments.isFetching && <div>Loading...</div>}
        {allComments.isError && (
          <div>Error: {allComments.error.message}</div>
        )}
        {allComments.data?.map((comment,idx) => (
            <p key={idx}>{comment.body}</p>     
     ))}
      </Col>
    </Row>
  );
};

export default Info;
