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

  const scrollToTop = () => {
    if (window.lenis) {
      console.log("window.lenis", window.lenis)
      window.lenis.scrollTo(0, {
        duration: 1.5,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      })
    } else {
      console.log("window.lenis", window.lenis)

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
          onClick={scrollToTop}
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
