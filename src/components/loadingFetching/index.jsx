import React from "react";

import { AppbarHeader } from "@styles/appbar";
import "./loading-fetching.css";

function LoadingFetching({ children }) {
  return (
    <section class="dots-container">
      <div className="content">
        <div className="dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <AppbarHeader>{children}</AppbarHeader>
      </div>
    </section>
  );
}

export default LoadingFetching;
