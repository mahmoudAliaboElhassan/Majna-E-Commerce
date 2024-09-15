import { useTranslation } from "react-i18next";

function UseTermsConditons() {
  const { t } = useTranslation();
  const termsConditions = [
    {
      id: 1,
      title: t("inclusivity-community"),
      content: t("inclusivity-community-desc"),
    },
    {
      id: 2,
      title: t("ethical-purchasing-policy"),
      content: t("ethical-purchasing-policy-desc"),
    },
    {
      id: 3,
      title: t("human-rights-policy"),
      content: t("human-rights-policy-desc"),
    },
    {
      id: 4,
      title: t("non-discrimination-policy"),
      content: t("non-discrimination-policy-desc"),
    },
    {
      id: 5,
      title: t("ethical-sourcing-commitment"),
      content: t("ethical-sourcing-commitment-desc"),
    },
    {
      id: 6,
      title: t("values-statement"),
      content: t("values-statement-desc"),
    },
  ];

  return { termsConditions };
}

export default UseTermsConditons;
