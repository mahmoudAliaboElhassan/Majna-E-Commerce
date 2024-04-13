import React from "react";

import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

import { change } from "@state/slices/mode";
import { Colors } from "@styles/theme";

function Mode() {
  const { mymode } = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const changeMode = () => dispatch(change());
  return (
    <>
      <IconButton style={{ color: Colors.white }} onClick={changeMode}>
        {mymode == "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </>
  );
}

export default Mode;
