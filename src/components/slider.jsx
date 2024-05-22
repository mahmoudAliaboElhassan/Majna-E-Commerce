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
import "../../node_modules/swiper/swiper-bundle.min.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { Box } from "@mui/material";

import image from "../image";

const Swiperslide = () => {
  return (
    <Box sx={{ mb: 2, pb: 3, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)" }}>
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          EffectFade,
          Autoplay,
        ]}
        // effect="fade"
        spaceBetween={50}
        autoplay={{ delay: 3000 }}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        style={{ height: "350px", width: "100%" }}
      >
        {image.map((img, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`slide-${index}`}
                // style={{
                //   width: "100%",
                //   height: "100%",
                //   objectFit: "cover",
                // }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default React.memo(Swiperslide);
