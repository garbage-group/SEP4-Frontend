import { Pagination } from "@mui/material";
import React from "react";

function ListPagination(props) {
  const { totalItems, itemsPerPage, currentPage, onPageChange } = props;

  return (
    <Pagination
      count={Math.ceil(totalItems / itemsPerPage)}
      page={currentPage}
      onChange={onPageChange}
    />
  );
}

export { ListPagination };
