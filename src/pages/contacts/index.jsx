import React from "react";
import { AppbarHeader } from "@styles/appbar";
import { useTranslation } from "react-i18next";

function Contacts() {
  const { t } = useTranslation();
  return (
    <div>
      <AppbarHeader>{t("contact-us")}</AppbarHeader>{" "}
    </div>
  );
}

export default Contacts;
