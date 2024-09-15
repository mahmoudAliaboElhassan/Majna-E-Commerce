import { useTranslation } from "react-i18next";

function UseStatusOptions() {
  const { t } = useTranslation();
  const statusOptions = [
    {
      value: "",
      label: t("all-orders"),
    },
    {
      value: "Pending",
      label: t("pending"),
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
  const statusDeliveryOptions = [
    {
      value: "Placed",
      label: t("placed"),
    },
    {
      value: "Shipped",
      label: t("shipped"),
    },
  ];
  return { statusOptions, statusDeliveryOptions };
}

export default UseStatusOptions;
