import React from "react"

import { IconButton, Slide, Autocomplete } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import { SearchBoxContainer } from "@styles/search"
import Search from "@components/search"
import UseDirection from "@hooks/use-direction"
import { DrawerCloseIcon } from "../../styles/appbar"

function SlideSearch({ show, close, dir }) {
  const { Direction } = UseDirection()
  return (
    <Slide direction={dir} timeout={500} in={show}>
      <SearchBoxContainer>
        <Search />
        <DrawerCloseIcon
          onClick={close}
          sx={{ position: "absolute", top: "50px", [Direction.right]: "10px" }}
        >
          <CloseIcon sx={{ fontSize: "4rem" }} color="secondary" />
        </DrawerCloseIcon>
      </SearchBoxContainer>
    </Slide>
  )
}

export default React.memo(SlideSearch)
