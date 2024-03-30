import React from "react";

import { useTranslation } from "react-i18next";

function UseProductTypes() {
  const { t } = useTranslation();
  const productTypes = [
    {
      to: "sports",
      label: t("sports"),
      nestedTypes: [
        {
          // to: "men",
          label: t("men"),
        },
        {
          // to: "women",
          label: t("women"),
        },
        {
          // to: "clothes",
          label: t("clothes"),
        },
      ],
    },
    {
      to: "devices",
      label: t("devices"),
      nestedTypes: [
        {
          // to: "phones",
          label: t("phones"),
        },
        {
          // to: "tv",
          label: t("tv"),
        },
        {
          // to: "laptops",
          label: t("laptop"),
        },
      ],
    },
  ];
  return { productTypes };
}

export default UseProductTypes;
