import React, { useState } from "react"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { Container, Box, Typography } from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"
import { styled } from "@mui/material/styles"
import UseThemeMode from "@hooks/use-theme"

const FAQList = styled("ul")(() => {
  const { themeMode } = UseThemeMode()

  return {
    listStyle: "none",
    padding: 0,
    margin: "0 auto",
    maxWidth: "900px",
  }
})

const FAQItem = styled("li")(({ theme, active }) => {
  const { themeMode } = UseThemeMode()

  return {
    marginBottom: "16px",
    borderRadius: "12px",
    background:
      themeMode === "dark"
        ? "linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)"
        : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    border: `1px solid ${
      active
        ? themeMode === "dark"
          ? "rgba(251, 191, 36, 0.4)"
          : "rgba(245, 158, 11, 0.4)"
        : themeMode === "dark"
        ? "rgba(251, 191, 36, 0.15)"
        : "rgba(245, 158, 11, 0.15)"
    }`,
    boxShadow: active
      ? themeMode === "dark"
        ? "0 6px 20px rgba(251, 191, 36, 0.25)"
        : "0 6px 20px rgba(245, 158, 11, 0.2)"
      : themeMode === "dark"
      ? "0 2px 8px rgba(251, 191, 36, 0.1)"
      : "0 2px 8px rgba(245, 158, 11, 0.08)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",

    "&:hover": {
      borderColor:
        themeMode === "dark"
          ? "rgba(251, 191, 36, 0.3)"
          : "rgba(245, 158, 11, 0.3)",
      boxShadow:
        themeMode === "dark"
          ? "0 4px 16px rgba(251, 191, 36, 0.2)"
          : "0 4px 16px rgba(245, 158, 11, 0.15)",
      transform: "translateY(-2px)",
    },
  }
})

const FAQHeader = styled(Box)(() => {
  const { themeMode } = UseThemeMode()

  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    padding: "20px 24px",
    userSelect: "none",

    "&:hover .arrow-icon": {
      color: themeMode === "dark" ? "#fbbf24" : "#f59e0b",
    },
  }
})

const FAQTitle = styled(Typography)(({ active }) => {
  const { themeMode } = UseThemeMode()

  return {
    fontSize: "18px",
    fontWeight: active ? 700 : 600,
    color: active
      ? themeMode === "dark"
        ? "#fbbf24"
        : "#f59e0b"
      : themeMode === "dark"
      ? "#f1f5f9"
      : "#0f172a",
    transition: "all 0.3s ease",
    paddingRight: "16px",
  }
})

const FAQContent = styled(Box)(() => {
  const { themeMode } = UseThemeMode()

  return {
    padding: "0 24px 20px",
    fontSize: "16px",
    lineHeight: 1.7,
    color: themeMode === "dark" ? "#cbd5e1" : "#475569",
    borderTop: `1px solid ${
      themeMode === "dark"
        ? "rgba(251, 191, 36, 0.15)"
        : "rgba(245, 158, 11, 0.15)"
    }`,
    marginTop: "4px",
  }
})

function DataListing({ data }) {
  const [active, setActive] = useState(null)
  const { themeMode } = UseThemeMode()

  const handleClick = (dataId) => {
    setActive(active === dataId ? null : dataId)
  }

  return (
    <AnimatePresence initial={false}>
      <Container maxWidth="lg" sx={{ paddingY: "40px" }}>
        <FAQList>
          {data.map(({ id, title, content }, index) => (
            <FAQItem
              key={id}
              active={id === active}
              // data-aos={`fade-${index % 2 === 0 ? "right" : "left"}`}
              // data-aos-duration="400"
              // data-aos-easing="ease-in-out"
            >
              <FAQHeader onClick={() => handleClick(id)}>
                <FAQTitle active={id === active}>{title}</FAQTitle>
                <motion.div
                  className="arrow-icon"
                  animate={{ rotate: id === active ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: themeMode === "dark" ? "#cbd5e1" : "#475569",
                    transition: "color 0.3s ease",
                  }}
                >
                  <KeyboardArrowDownIcon sx={{ fontSize: "28px" }} />
                </motion.div>
              </FAQHeader>

              <motion.div
                initial={false}
                animate={{
                  height: active === id ? "auto" : 0,
                  opacity: active === id ? 1 : 0,
                }}
                transition={{
                  height: { duration: 0.3, ease: "easeInOut" },
                  opacity: { duration: 0.2, ease: "easeInOut" },
                }}
                style={{ overflow: "hidden" }}
              >
                <FAQContent>{content}</FAQContent>
              </motion.div>
            </FAQItem>
          ))}
        </FAQList>
      </Container>
    </AnimatePresence>
  )
}

export default DataListing
