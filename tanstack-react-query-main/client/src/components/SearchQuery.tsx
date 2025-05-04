import React, { useState } from "react";
import { Form } from "react-bootstrap";
interface ISearchQueryProps {
  setSearchQuery: (value: string) => void;
}
const SearchQuery = ({ setSearchQuery }: ISearchQueryProps) => {


  const [query, setQuery] = useState("");
  const querySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(query);
  };

  return (
    <div className="my-3">
      <h5>Search</h5>
      <form onSubmit={querySubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
      </form>
    </div>
  );
};

export default SearchQuery;
