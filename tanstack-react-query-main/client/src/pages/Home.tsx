import { useState } from "react";
import PostList from "../components/PostList";
import PostFilter from "../components/PostFilter";
import { TPostStatusType } from "../Types";
import { Row, Col } from "react-bootstrap";
import SearchQuery from "../components/SearchQuery";
const Home = () => {
  const [selectedPostStatus, setSelectedPostStatus] =
    useState<TPostStatusType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <Row>
      <Col xs={9}>
        <PostList
          selectedPostStatus={selectedPostStatus}
          searchQuery={searchQuery}
        />
      </Col>
      <Col>
        <SearchQuery setSearchQuery={setSearchQuery} />
        {searchQuery.length === 0 && (
          <PostFilter
            selectedPostStatus={selectedPostStatus}
            setSelectedPostStatus={setSelectedPostStatus}
          />
        )}
      </Col>
    </Row>
  );
};

export default Home;
