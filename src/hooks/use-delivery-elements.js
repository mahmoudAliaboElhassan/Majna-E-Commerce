import { useTranslation } from "react-i18next";

function UseDeliveryElements() {
  const { t } = useTranslation();
  const deliveryElements = [
    {
      label: t("all-orders"),
      to: "all-delivery-orders",
    },
  ];
  return { deliveryElements };
}

export default UseDeliveryElements;
