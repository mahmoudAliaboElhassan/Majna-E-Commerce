import { useTranslation } from "react-i18next";

function UseCustomerElements() {
  const { t } = useTranslation();
  const customerElements = [
    {
      label: t("all-addresses"),
      to: "",
    },
    {
      label: t("add-address"),
      to: "add-address",
    },
    {
      label: t("orders"),
      to: "orders",
    },
    // {
    //   label: t("edit-address"),
    //   to: "edit-address",
    // },
  ];
  return { customerElements };
}

export default UseCustomerElements;
