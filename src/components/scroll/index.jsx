import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import UseDirection from "@hooks/use-direction";
import { ScrollButton } from "@styles/scrollBtn";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const { Direction } = UseDirection();

  const handleScroll = () => {
    if (window.scrollY > 100 && !showButton) {
      setShowButton(true);
    } else if (window.scrollY <= 100 && showButton) {
      setShowButton(false);
    }
  };

  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showButton]); // Only re-add event listener when showButton changes
  // const firstSectionRef = useRef(null);

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: showButton ? 10 : -50,
          right: 20,
          transition: "bottom 0.6s",
          zIndex: "999"
        }}
      >
        <ScrollButton
          onClick={() => {
            const element = document.querySelector("#firstSection");
            console.log(element);
            element?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <KeyboardArrowUpIcon fontSize="large" />
        </ScrollButton>
      </div>
      {/* <div style={{ height: "3000px" }} ref={firstSectionRef}>
        loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem
      </div> */}
    </>
  );
};

export default ScrollToTopButton;
