import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import "../../../node_modules/swiper/swiper-bundle.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { Box } from "@mui/material";
import image from "../../image";
import "./SwiperCustom.css"; // Import custom CSS file

const Swiperslide = () => {
  return (
    <Box
      sx={{
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
        mt: -2.5,
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
        spaceBetween={50}
        autoplay={{ delay: 3000 }}
        slidesPerView={2}
        navigation
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet">${
              index + 1
            }</span>`;
          },
        }}
        style={{ height: "350px", width: "100%" }}
      >
        {image.map((img, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={img} alt={`slide-${index}`} loading="lazy" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default React.memo(Swiperslide);
