import React, { Fragment } from "react";

import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";

const PaginationComponent = ({ page, count, changePage }) => {
  console.log("Page from PaginationComponent:", page);
  return (
    <Fragment>
      {
        <Pagination
          page={+page}  // Use fallback of 1 if page is not defined
          count={count}
          shape="rounded"
          showFirstButton
          showLastButton
          onChange={(event, value) => changePage(event, value)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      }

    </Fragment>
  );
};

export default (PaginationComponent);
