import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import QuestionsAnswers from "@components/faq";
import { AppbarHeader } from "@styles/appbar";
import UseMediaQueryHook from "@hooks/use-media-query";
import Team from "@components/team";

function About() {
  const location = useLocation();
  console.log(location.pathname);
  console.log(process.env.REACT_APP_API_URL);
  const { t } = useTranslation();

  return (
    <>
      <AppbarHeader data-aos="fade-up">{t("important-questions")}</AppbarHeader>
      <QuestionsAnswers />
      <Team />
      <div>الحمد لله تم إسترجاع البيانات</div>
    </>
  );
}

export default About;
