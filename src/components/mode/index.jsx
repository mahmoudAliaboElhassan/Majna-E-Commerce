import React from "react"

import { IconButton } from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"

import { change } from "@state/slices/mode"
import { authIconButtonStyle, iconColor } from "../../styles/appbar"

function Mode() {
  const { mymode } = useSelector((state) => state.mode)
  const dispatch = useDispatch()
  const changeMode = () => dispatch(change())
  return (
    <>
      <IconButton sx={authIconButtonStyle} onClick={changeMode}>
        {mymode == "dark" ? (
          <Brightness7Icon
            sx={{
              color: mymode == "light" ? "white" : "#fbbf24",
              fontSize: "22px",
            }}
          />
        ) : (
          <Brightness4Icon
            sx={{
              color: mymode == "light" ? "white" : "#fbbf24",
              fontSize: "22px",
            }}
          />
        )}
      </IconButton>
    </>
  )
}

export default Mode
