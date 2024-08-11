import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { logOut } from "@state/slices/auth";
import ModalSignup from "@components/modal";
import UseThemeMode from "@hooks/use-theme";

function UseHeaderElements() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { themeMode } = UseThemeMode();
  const { token, role } = useSelector((state) => state.auth);
  const [open_modal, setOpenModal] = useState(false);

  const HeaderElements = [
    {
      label: t("home"),
      to: "",
    },
    {
      label: t("about"),
      to: "about",
    },
    {
      label: t("contact"),
      to: "contact",
    },
    {
      label: t("c_panel"),
      to: "distributor-control-panel",
    },
    {
      label: t("login"),
      to: "login",
    },
    {
      label: t("signup"),
    },
    {
      label: t("change-password"),
      to: "change-password",
    },
    {
      label: t("logout"),
      click: () =>
        dispatch(logOut())
          .unwrap()
          .then(() => {
            {
              toast.success(t("logOut-success"), {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: themeMode,
              });
            }
          }),
    },
  ];

  const authElementsNotUser = HeaderElements.slice(4, 6);
  const authElementsUser = HeaderElements.slice(6);
  const tabElements = HeaderElements.slice(0, -4);
  const tabElementsBuyer = HeaderElements.slice(0, -5);
  const tabElementsSeller = HeaderElements.slice(0, -4);
  const allTabsElements = token
    ? role === "distributor"
      ? tabElementsSeller
      : tabElementsBuyer
    : tabElementsBuyer;
  const authElements = token ? authElementsUser : authElementsNotUser;
  const allElements = allTabsElements.concat(authElements);

  return {
    tabElements,
    authElements,
    authElementsNotUser,
    authElementsUser,
    allTabsElements,
    allElements,
    // ModalSignup: (
    //   <ModalSignup open_modal={open_modal} close={() => setOpenModal(false)} />
    // ),
  };
}

export default UseHeaderElements;
