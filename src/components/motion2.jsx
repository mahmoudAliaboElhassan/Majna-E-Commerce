import React, { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AnimatePresence, motion } from "framer-motion";

const Persons = [
  {
    id: 1,
    title: "Mahmoud",
    content: "Student at the Faculty Of Computer and Information Science",
  },
  {
    id: 2,
    title: "Khaled",
    content: "Student at the Faculty Of Nursing",
  },
  {
    id: 3,
    title: "Eslam",
    content: "Student at the the 3rd Secondary School",
  },
  {
    id: 4,
    title: "Jana",
    content: "Student at the 6rd preperatory School",
  },
];
function Motion2() {
  const [active, setActive] = useState(null);
  const handleClick = (pers) => setActive(pers.id);
  return (
    <AnimatePresence initial={false}>
      <div>
        <ul>
          {Persons.map((pers) => (
            <li>
              <div
                key={pers.id}
                onClick={() => handleClick(pers)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                {pers.title}
                <motion.div
                  animate={{ rotate: pers.id === active ? 180 : 0 }}
                  transition={{ type: "keyframes", ease: "easeInOut" }}
                >
                  <KeyboardArrowDownIcon />
                </motion.div>
              </div>
              <motion.div
                style={{
                  overflow: "hidden",
                }}
                animate={{ height: active === pers.id ? "auto" : 0 }}
              >
                <p>{pers.content}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </AnimatePresence>
  );
}

export default Motion2;
