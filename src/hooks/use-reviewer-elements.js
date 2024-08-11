import React from "react";
import { useTranslation } from "react-i18next";

function UseReviewerElements() {
  const { t } = useTranslation();
  const ReviewerElements = [
    {
      label: t("brand-app"),
      to: "",
    },
  ];
  return { ReviewerElements };
}

export default UseReviewerElements;
