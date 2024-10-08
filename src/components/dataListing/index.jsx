import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Container } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import UseThemeMode from "@hooks/use-theme";

function DataListing({ data }) {


  const [active, setActive] = useState(1);
  const { themeMode } = UseThemeMode()
  const handleClick = (dataId) => setActive(dataId);
  return (
    <AnimatePresence initial={false}>
      <Container maxWidth="lg">
        <div>
          <ul>
            {data.map(({ id, title, content }) => (
              <li
                key={id}
                onClick={() => handleClick(id)}
                component="div" // data-aos="zoom-in"
                data-aos={`flip-${id % 2 === 0 ? "up" : "down"}`}
                data-aos-duration={300}
                data-aos-easing="ease-in-sine"
              >
                <div
                  key={id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "21px",
                    fontWeight: "500",
                  }}
                >
                  {title}
                  <motion.div
                    animate={{ rotate: id === active ? 180 : 0 }}
                    transition={{ type: "keyframes", ease: "easeInOut" }}
                  >
                    <KeyboardArrowDownIcon />
                  </motion.div>
                </div>
                <motion.div
                  style={{
                    overflow: "hidden",
                  }}
                  animate={{ height: active === id ? "auto" : 0 }}
                >
                  <p style={{
                    fontSize: "18px", maxWidth: "90%",
                    paddingBottom: "10px",
                    borderBottom: `1px solid ${themeMode === "dark" ? "white" : "black"}`
                  }}>{content}</p>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </AnimatePresence>
  );
}

export default DataListing;
