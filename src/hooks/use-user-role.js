import React from "react";
import { useTranslation } from "react-i18next";

function UseUserRole() {
  const { t } = useTranslation();
  const userRoles = [
    { name: t("distributor"), id: "distributor" },
    { name: t("customer"), id: "customer" },
  ];
  return { userRoles };
}

export default UseUserRole;
