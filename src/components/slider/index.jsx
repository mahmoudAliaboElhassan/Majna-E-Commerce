import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules"
import { Box } from "@mui/material"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import "swiper/css/effect-fade"
import "swiper/css/autoplay"

import defaultSliderImages from "@assets/sliderImages"
import UseMediaQueryHook from "@hooks/use-media-query"
import UseThemMode from "@hooks/use-theme"
import "./SwiperCustom.css"

const Swiperslide = ({ images }) => {
  const { isMatch } = UseMediaQueryHook()
  const { themeMode } = UseThemMode()
  const imageArray = defaultSliderImages

  return (
    <Box
      sx={{
        boxShadow:
          themeMode === "light"
            ? "0 4px 16px rgba(0, 0, 0, 0.08)"
            : "0 4px 16px rgba(0, 0, 0, 0.4)",
        borderRadius: "12px",
        overflow: "hidden",
        mt: -2.5,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            themeMode === "light"
              ? "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%)"
              : "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 1,
        },
      }}
    >
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          EffectFade,
          Autoplay,
        ]}
        spaceBetween={0}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={isMatch ? 1 : 2}
        navigation
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet" data-theme="${themeMode}">${
              index + 1
            }</span>`
          },
        }}
        loop={true}
        speed={800}
        effect="slide"
        grabCursor={true}
        style={{
          height: isMatch ? "280px" : "350px",
          width: "100%",
          borderRadius: "12px",
        }}
        className={`swiper-container-${themeMode}`}
      >
        {imageArray.map((img, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "60px",
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.3), transparent)",
                  pointerEvents: "none",
                },
              }}
            >
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.6s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)"
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default React.memo(Swiperslide)
