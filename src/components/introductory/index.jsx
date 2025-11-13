import { useTheme } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { Container, Box, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

import Image from "@assets/introductory"
import UseThemMode from "@hooks/use-theme"
import UseMediaQueryHook from "@hooks/use-media-query"
import { IntroudctoryButton } from "@styles/introductory"

// Animation variants moved outside component for better performance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.22, 
      delayChildren: 0.06 
    },
  },
}

const childVariants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    x: 20,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
}

const imageVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1 }
  },
}

const contentVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1 }
  },
}

function Introductory() {
  const theme = useTheme()
  const { t } = useTranslation()
  const { themeMode } = UseThemMode()
  const { isMatch } = UseMediaQueryHook()

  // Intersection observers with threshold for better performance
  const { ref: imgRef, inView: imgInView } = useInView({ 
    triggerOnce: false,
    threshold: 0.1 
  })
  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: false,
    threshold: 0.1
  })
  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: false,
    threshold: 0.1
  })

  const words = t("welcome-sentence").split(" ")
  const isRTL = theme.direction === "rtl"

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: isMatch ? "center" : "inherit",
        minHeight: { xs: "auto", md: "80vh" },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: isMatch ? "column" : "row",
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* Hero Image */}
        <motion.div
          ref={imgRef}
          initial="hidden"
          animate={imgInView ? "visible" : "hidden"}
          variants={imageVariants}
        >
          <Box
            component="img"
            src={Image[0]}
            alt="Hero illustration"
            loading="lazy"
            sx={{
              width: { xs: 250, sm: 300, md: 350 },
              height: { xs: 250, sm: 300, md: 350 },
              objectFit: "contain",
            }}
          />
        </motion.div>

        {/* Hero Content */}
        <Box sx={{ flex: 1, maxWidth: { xs: "100%", md: 600 } }}>
          {/* Animated Title */}
          <Typography
            component="h1"
            variant="h2"
            sx={{
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
              fontWeight: 700,
              mb: 3,
              color: themeMode === "dark" ? "#f5f5f9" : "#333",
            }}
          >
            <motion.div
              ref={textRef}
              initial="hidden"
              animate={textInView ? "visible" : "hidden"}
              variants={containerVariants}
              style={{
                overflow: "hidden",
                display: "flex",
                justifyContent: isMatch ? "center" : "flex-start",
                flexWrap: "wrap",
                gap: "0.3rem",
              }}
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  variants={childVariants}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </Typography>

          {/* Content Section */}
          <motion.div
            ref={contentRef}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            variants={contentVariants}
          >
            {/* Hand Icon Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: isMatch ? "center" : "flex-start",
                mb: 2,
                gap: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  color: themeMode === "dark" ? "#ccc" : "#777",
                  fontWeight: 500,
                }}
              >
                {t("feel")}
              </Typography>
              <Box
                component="img"
                src={Image[1]}
                alt="Welcome icon"
                loading="lazy"
                sx={{
                  width: { xs: 40, md: 50 },
                  height: { xs: 40, md: 50 },
                }}
              />
            </Box>

            {/* Description Text */}
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                mb: 1,
                color: themeMode === "dark" ? "#f5f5f9" : "#333",
                fontWeight: 500,
              }}
            >
              {t("free")}
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                mb: 4,
                color: themeMode === "dark" ? "#f5f5f9" : "#333",
                fontWeight: 500,
              }}
            >
              {t("for-browsing")}
            </Typography>

            {/* CTA Button */}
            <IntroudctoryButton to="discover">
              <Typography sx={{ fontWeight: 600 }}>
                {t("discover")}
              </Typography>
              {isRTL ? (
                <ArrowBackIcon
                  className="icon"
                  sx={{ 
                    transition: "transform 0.3s ease",
                    ml: 1
                  }}
                />
              ) : (
                <ArrowForwardIcon
                  className="icon"
                  sx={{ 
                    transition: "transform 0.3s ease",
                    ml: 1
                  }}
                />
              )}
            </IntroudctoryButton>
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
}

export default Introductory