import { useEffect } from "react"
import Aos from "aos"
import "aos/dist/aos.css"
import { Box } from "@material-ui/core"

export default function AnimationShowcase() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-out-cubic",
      offset: 120,
      once: false,
    })
  }, [])

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        AOS Animation Showcase
      </h1>

      {/*===================== FADING =====================*/}
      <h2>Fade Animations</h2>
      <div style={grid}>
        <Box text="fade-up" animation="fade-up" />
        <Box text="fade-down" animation="fade-down" />
        <Box text="fade-left" animation="fade-left" />
        <Box text="fade-right" animation="fade-right" />
        <Box text="fade-up-right" animation="fade-up-right" />
        <Box text="fade-up-left" animation="fade-up-left" />
        <Box text="fade-down-right" animation="fade-down-right" />
        <Box text="fade-down-left" animation="fade-down-left" />
      </div>

      {/*===================== FLIPPING =====================*/}
      <h2 style={{ marginTop: "50px" }}>Flip Animations</h2>
      <div style={grid}>
        <Box text="flip-left" animation="flip-left" />
        <Box text="flip-right" animation="flip-right" />
        <Box text="flip-up" animation="flip-up" />
        <Box text="flip-down" animation="flip-down" />
      </div>

      {/*===================== ZOOMING =====================*/}
      <h2 style={{ marginTop: "50px" }}>Zoom Animations</h2>
      <div style={grid}>
        <Box text="zoom-in" animation="zoom-in" />
        <Box text="zoom-out" animation="zoom-out" />
        <Box text="zoom-in-up" animation="zoom-in-up" />
        <Box text="zoom-in-down" animation="zoom-in-down" />
        <Box text="zoom-in-left" animation="zoom-in-left" />
        <Box text="zoom-in-right" animation="zoom-in-right" />
        <Box text="zoom-out-up" animation="zoom-out-up" />
        <Box text="zoom-out-down" animation="zoom-out-down" />
        <Box text="zoom-out-left" animation="zoom-out-left" />
        <Box text="zoom-out-right" animation="zoom-out-right" />
      </div>

      {/*===================== ADVANCED =====================*/}
      <h2 style={{ marginTop: "50px" }}>Advanced Example</h2>
      <div
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-duration="1500"
        data-aos-delay="300"
        data-aos-offset="200"
        data-aos-once="true"
        style={{
          padding: "40px",
          background: "#000",
          color: "#fff",
          borderRadius: "10px",
          textAlign: "center",
          fontSize: "20px",
          marginTop: "20px",
        }}
      >
        Advanced Fade Example
      </div>
    </div>
  )
}
