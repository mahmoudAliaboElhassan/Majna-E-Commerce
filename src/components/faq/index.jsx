import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Container } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import UseFAQ from "@hooks/use-faq";

function QuestionsAnswers() {

  const { FAQ } = UseFAQ()
  const [active, setActive] = useState(null);
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [FAQ]);
  const handleClick = (QuestionId) => setActive(QuestionId);
  return (
    <AnimatePresence initial={false}>
      <Container maxWidth="lg">
        <div>
          {/* <div style={{ height: "100vh" }}></div> */}

          <ul>
            {FAQ.map(({ id, title, content }) => (
              <li
                key={id}
                onClick={() => handleClick(id)}
                component="div" // data-aos="zoom-in"
                data-aos={`flip-${id % 2 === 0 ? "right" : "left"}`}
                data-aos-duration={id * 600}
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
                  <p style={{ fontSize: "18px", maxWidth: "90%" }}>{content}</p>
                </motion.div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </AnimatePresence>
  );
}

export default QuestionsAnswers;
