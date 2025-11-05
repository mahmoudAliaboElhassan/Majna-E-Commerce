import {useSelector} from "react-redux";

import { AppbarHeader } from "@styles/appbar";
import "./loading-fetching.css";

function LoadingFetching({ children }) {
  const {mymode}=useSelector((state)=>state.mode)
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
        <AppbarHeader style={{  color: mymode === "dark" ? "#fbbf24" : "black",
}}>{children}</AppbarHeader>
      </div>
    </section>
  );
}

export default LoadingFetching;
