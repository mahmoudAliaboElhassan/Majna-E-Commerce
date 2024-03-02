import React from "react";
import { useTranslation } from "react-i18next";

function UseReviewerElements() {
  const { t } = useTranslation();
  const ReviewerElements = [
    {
      label: t("brand-app"),
      to: "",
    },
    {
      label: t("product_app"),
      to: "product_app",
    },
  ];
  return { ReviewerElements };
}

export default UseReviewerElements;
