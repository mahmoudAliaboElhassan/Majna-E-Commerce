import { useTranslation } from "react-i18next";

function UseFAQ() {
  const { t } = useTranslation();

  const FAQ = [
    {
      id: 1,
      title: t("what-majna"),
      content: t("majna-answer"),
    },
    {
      id: 2,
      title: t("who-use"),
      content: t("who-use-answer"),
    },
    {
      id: 3,
      title: t("what-authentication-process"),
      content: t("authentication-process-answer"),
    },
    {
      id: 4,
      title: t("what-customer-do"),
      content: t("customer-do-answer"),
    },
    {
      id: 5,
      title: t("filter-type"),
      content: t("filter-type-answer"),
    },
    {
      id: 6,
      title: t("what-distributor-do"),
      content: t("distributor-do-answer"),
    },
    {
      id: 7,
      title: t("both-langs"),
      content: t("both-langs-answer"),
    },
    {
      id: 8,
      title: t("both-modes"),
      content: t("both-modes-answer"),
    },
  ];
  return { FAQ };
}

export default UseFAQ;
