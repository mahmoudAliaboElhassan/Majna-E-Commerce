import React, { Fragment } from "react";

import { Pagination } from "@mui/material";

const PaginationComponent = ({ count, changePage }) => {
  return (
    <Fragment>
      <Pagination
        count={count}
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
