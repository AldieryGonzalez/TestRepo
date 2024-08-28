import React from "react";
import "./SearchSort.css";

const SearchSort = ({
  handleSearchChange,
  handleSortChange,
  sortOption,
  searchQuery,
}) => {
  return (
    <div className="sort-container">
      <select id="sort" onChange={handleSortChange} value={sortOption}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>
      <div className="input-group">
        <input
          type="search"
          id="form1"
          className="form-control"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default SearchSort;
