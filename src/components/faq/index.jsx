import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function QuestionsAnswers() {
  const { t } = useTranslation();

  const FAQ = [
    {
      id: 1,
      title: t("what-majna"),
      content: t("majna-answer"),
    },
    {
      id: 2,
      title: t("who-use"),
      content: t("who-use-answer"),
    },
    {
      id: 3,
      title: t("what-authentication-process"),
      content: t("authentication-process-answer"),
    },
    {
      id: 4,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 5,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 6,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 7,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 8,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 9,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 10,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 11,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 12,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 13,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 14,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 15,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 16,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 17,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 18,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 19,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
    {
      id: 20,
      title: "Jana",
      content: "Student at the 6rd preperatory School",
    },
  ];
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
      <div>
        <div style={{ height: "100vh" }}></div>

        <ul>
          {FAQ.map(({ id, title, content }, idx) => (
            <li
              key={id}
              onClick={() => handleClick(id)}
              component="div" // data-aos="zoom-in"
              data-aos={`fade-${idx % 2 === 0 ? "right" : "left"}`}
              data-aos-duration={id * 300}
              data-aos-easing="ease-in-sine"
            >
              <div
                key={id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
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
                <p>{content}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </AnimatePresence>
  );
}

export default QuestionsAnswers;
