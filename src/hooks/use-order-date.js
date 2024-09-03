import { useTranslation } from "react-i18next";

function UseOrderOptions() {
  const { t } = useTranslation();
  const orderOptions = [
    {
      value: "",
      label: t("not-ordered"),
    },
    {
      value: "ordered_at",
      label: t("ascending-date"),
    },
    {
      value: "-ordered_at",
      label: t("descending-date"),
    },
  ];
  return { orderOptions };
}

export default UseOrderOptions;
