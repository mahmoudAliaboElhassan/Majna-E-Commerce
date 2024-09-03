import { useTranslation } from "react-i18next";

function UseStatusOptions() {
  const { t } = useTranslation();
  const statusOptions = [
    {
      value: "",
      label: t("all-orders"),
    },
    {
      value: "Placed",
      label: t("placed"),
    },
    {
      value: "Shipped",
      label: t("shipped"),
    },
    {
      value: "Delivered",
      label: t("delivered"),
    },
  ];
  return { statusOptions };
}

export default UseStatusOptions;
