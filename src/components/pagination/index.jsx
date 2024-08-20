import React, { Fragment } from "react";
import { Pagination } from "@mui/material";

const PaginationComponent = ({ page, count, changePage }) => {
  console.log("Page from PaginationComponent:", page);

  return (
    <Fragment>
      <Pagination
        count={count}
        page={page || 1}  // Use fallback of 1 if page is not defined
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
    </Fragment>
  );
};

export default React.memo(PaginationComponent);
