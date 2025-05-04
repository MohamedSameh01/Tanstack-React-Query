
import {  Form } from "react-bootstrap";
import { TPostStatusType } from "../Types";
import React from "react";

interface IPostFilterProps {
  selectedPostStatus: TPostStatusType;
  setSelectedPostStatus:(value:TPostStatusType) => void;
}
const PostFilter = ({
  selectedPostStatus,
  setSelectedPostStatus,
}: IPostFilterProps) => {

    const onChangeHandler=(e:React.ChangeEvent<HTMLSelectElement>)=>{
        setSelectedPostStatus(e.target.value as TPostStatusType);
    }
  return (
    <>
      <h5>Filter By Status</h5>
      <Form.Select onChange={onChangeHandler} value={selectedPostStatus}>
        <option value="">Select Status</option>
        <option value="all">All</option>
        <option value="published">Publish</option>
        <option value="draft">Draft</option>
        <option value="block">Blocked</option>
      </Form.Select>
    </>
  );
};

export default PostFilter;

