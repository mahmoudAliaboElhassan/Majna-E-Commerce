import { useTranslation } from "react-i18next";

function UseDeliveryElements() {
  const { t } = useTranslation();
  const deliveryElements = [
    {
      label: t("all-orders"),
      to: "",
    },
  ];
  return { deliveryElements };
}

export default UseDeliveryElements;
