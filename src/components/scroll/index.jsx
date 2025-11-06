import { useEffect, useState } from "react"
import { Zoom } from "@mui/material"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import UseDirection from "@hooks/use-direction"
import { NoonScrollButton } from "../../styles/scrollBtn"

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false)
  const { Direction } = UseDirection()

  const handleScroll = () => {
    setShowButton(window.scrollY > 100)
  }

  const handleButtonClick = () => {
    const element = document.querySelector("#firstSection")
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Zoom in={showButton} timeout={300}>
      <div
        style={{
          position: "fixed",
          bottom: 20,
          [Direction.right]: 20,
          zIndex: 999,
        }}
      >
        <NoonScrollButton
          onClick={handleButtonClick}
          aria-label="Scroll to top"
          disableRipple
          style={{ color: "white" }}
        >
          <KeyboardArrowUpIcon />
        </NoonScrollButton>
      </div>
    </Zoom>
  )
}

export default ScrollToTopButton
