import { useTranslation } from "react-i18next";

function UseDeliveryElements() {
  const { t } = useTranslation();
  const deliveryElements = [
    {
      label: t("update-order-status"),
      to: "update-order-status",
    },
    {
      label: t("all-orders"),
      to: "all-orders",
    },
  ];
  return { deliveryElements };
}

export default UseDeliveryElements;
