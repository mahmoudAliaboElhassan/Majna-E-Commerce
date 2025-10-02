import React from "react";

import UseLoadingStatus from "@hooks/use-loading-satatus";

function AutLink({children}) {
  const loadingStatus = UseLoadingStatus();

  return (
    <div
      style={{
        pointerEvents: loadingStatus ? "none" : "auto",
        opacity: loadingStatus ? "0.5" : "1",
      }}
    >{children}</div>
  );
}

export default AutLink;
