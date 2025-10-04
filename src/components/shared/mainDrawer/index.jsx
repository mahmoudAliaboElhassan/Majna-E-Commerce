import React from "react"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import IconButton from "@mui/material/IconButton"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"

import { Link, useLocation } from "react-router-dom"
import { useTheme } from "@emotion/react"
import {
  DrawerHeader,
  DrawerContainer,
  CloseButton,
  StyledListItemText,
  StyledListItemButton,
} from "@styles/reviewer"

import { styled } from "@mui/material/styles"
import { Drawer, Box } from "@mui/material"

import UseDirection from "@hooks/use-direction"
import UseThemMode from "@hooks/use-theme"

function MainDrawer({ open, handleClose, elements }) {
  const { Direction } = UseDirection()
  const theme = useTheme()
  const location = useLocation()

  const searchText = "/distributor-control-panel/"
  const path = location.pathname
  const result = path.slice(searchText.length)

  const locationPathArray = location.pathname.split("/")
  const locationPath =
    locationPathArray.length === 3 ? locationPathArray[2] : ""

  return (
    <DrawerContainer anchor={Direction.left} variant="persistent" open={open}>
      <DrawerHeader>
        <CloseButton onClick={handleClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </CloseButton>
      </DrawerHeader>

      <Divider
        sx={{
          borderColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(251, 191, 36, 0.15)"
              : "rgba(245, 158, 11, 0.15)",
        }}
      />

      <List sx={{ padding: "16px 0" }}>
        {elements?.map(({ label, ...el }, index) => {
          const isActive = locationPath === el.to

          return (
            <ListItem key={`${el.to}-${index}`} disablePadding>
              <StyledListItemButton
                {...el}
                component={Link}
                isActive={isActive}
              >
                <StyledListItemText primary={label} isActive={isActive} />
              </StyledListItemButton>
            </ListItem>
          )
        })}
      </List>
    </DrawerContainer>
  )
}

export default MainDrawer
