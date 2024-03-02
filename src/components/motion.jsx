import React, { useState } from "react";

import { motion } from "framer-motion";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function MotionComp() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: "-100vw",
        rotateZ: 180,
      }}
      animate={{ opacity: 1, x: 50, rotateZ: 0 }}
      transition={{ delay: 1.5, duration: 1.5 }}
    >
      <motion.button
        whileHover={{
          scale: 1.1,
          fontSize: 50,
          color: "red",
          textShadow: "0 0 8px rgb(255 255 255)",
          boxShadow: "0 0 8px rgb(255 255 255)",
        }}
      >
        Show{" "}
      </motion.button>
      <motion.div
        initial={{
          opacity: 0,
          x: "-100vw",
        }}
        animate={{ opacity: 1, x: 50 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        hello
      </motion.div>{" "}
      <motion.div
        initial={{
          opacity: 0,
          x: "-100vw",
        }}
        animate={{ opacity: 1, x: 50 }}
        transition={{ delay: 1.5, duration: 1.5 }}
      >
        Mamoud
      </motion.div>{" "}
      <motion.div
        initial={{
          opacity: 0,
          x: "-100vw",
        }}
        animate={{ opacity: 1, x: 50 }}
        transition={{ delay: 1.7, duration: 1.5 }}
      >
        Programmer
      </motion.div>
      {/* <Button
        color="inherit"
        variant="contained"
        size="large"
        style={{ position: "absolute" }}
        component={motion.div}
        initial={{ x: "-100vw" }}
        animate={{ x: -0 }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        Button
      </Button> */}
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />{" "}
     
      </FormControl>
    </motion.div>
  );
}

export default MotionComp;
