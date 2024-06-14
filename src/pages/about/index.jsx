import React from "react";

import { Container } from "@mui/material";
import { motion } from "framer-motion";
import {useLocation} from "react-router-dom";
import Motion2 from "@components/motion2";

function About() {
  const location=useLocation();
  console.log(location.pathname)
  console.log(process.env.REACT_APP_API_URL);
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "keyframes",
          ease: "easeInOut",
          duration: 1.3,
          delay: 0.7,
        }}
      >
        <Motion2 />
        <div>الحمد لله تم إسترجاع البيانات</div>
      </motion.div>
    </Container>
  );
}

export default About;
