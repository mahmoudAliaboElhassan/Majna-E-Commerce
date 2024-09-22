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

import defaultSliderImages from "@assets/sliderImages";
import "./SwiperCustom.css"; // Import custom CSS file
import UseMediaQueryHook from "@hooks/use-media-query";

const Swiperslide = ({ images }) => {
  // const imageArray = images?.length ? images : defaultSliderImages;
  const { isMatch } = UseMediaQueryHook()
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
        spaceBetween={0}
        autoplay={{ delay: 3000 }}
        slidesPerView={isMatch ? 1 : 2}
        navigation
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet">${index + 1}</span>`;
          },
        }}
        loop={true} // Enable looping
        style={{ height: "350px", width: "100%" }}
      >
        {defaultSliderImages.map((img, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={img} alt={`slide-${index}`}
                // loading="lazy"
                style={{ width: "100%", height: "100%" }} />
            </SwiperSlide>
          );
        })}
      </Swiper>

    </Box>
  );
};

export default React.memo(Swiperslide);
