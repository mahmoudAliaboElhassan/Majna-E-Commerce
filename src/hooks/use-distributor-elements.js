import { useTranslation } from "react-i18next";

function UseDistributorElements() {
  const { t } = useTranslation();
  const distributorElements = [
    {
      label: t("all_brands_applications"),
      to: "",
    },
    // {
    //   label: t("App_status"),
    //   to: "",
    // },
    {
      label: t("approved_brands"),
      to: "approved-brands",
    },
    {
      label: t("add-brand"),
      to: "add-brand",
    },
    {
      label: t("add-store"),
      to: "add-store",
    },
    {
      label: t("add-product"),
      to: "add-product",
    },
  ];
  return { distributorElements };
}

export default UseDistributorElements;
