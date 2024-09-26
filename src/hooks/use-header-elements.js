import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { logOut } from "@state/slices/auth";
import ModalSignup from "@components/modal";
import UseThemeMode from "@hooks/use-theme";
import { resetCartItemsCount } from "@state/slices/cart";

function UseHeaderElements() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { themeMode } = UseThemeMode();
  const { token, role } = useSelector((state) => state.auth);
  const [open_modal, setOpenModal] = useState(false);

  const HeaderElements = [
    {
      label: t("home"),
      to: "/",
    },
    {
      label: t("about"),
      to: "/about",
    },
    {
      label: t("contact"),
      to: "/contact",
    },
    {
      label: t("c_panel"),
      to: "/customer-control-panel",
    },

    {
      label: t("c_panel"),
      to: "/distributor-control-panel",
    },
    {
      label: t("c_panel"),
      to: "/reviewer-control-panel",
    },

    {
      label: t("c_panel"),
      to: "/delivery-control-panel",
    },
    {
      label: t("login"),
      to: "/login",
    },
    {
      label: t("signup"),
    },
    {
      label: t("change-password"),
      to: "/change-password",
    },
    {
      label: t("logout"),
      click: () =>
        dispatch(logOut())
          .unwrap() // Only necessary if your logOut action returns a promise
          .then(() => {
            // Reset cart count after successful logout
            dispatch(resetCartItemsCount());

            toast.success("Logout successful, cart reset!", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          })
          .catch((error) => {
            toast.error(t("logout-failed"), {
              position: "top-right",
              autoClose: 1000,
            });
          }),
    },
  ];

  const authElementsNotUser = HeaderElements.slice(7, 9);
  const authElementsUser = HeaderElements.slice(9);
  const tabElements = HeaderElements.slice(0, 3);

  const tabElementsBuyer = HeaderElements.slice(0, 4);

  const tabElementsSeller = HeaderElements.slice(0, -6).filter(
    ({ to }) => to !== "/customer-control-panel"
  );
  const tabElementsDelivery = HeaderElements.slice(0, 7).filter(
    ({ to }) =>
      to !== "/customer-control-panel" &&
      to !== "/distributor-control-panel" &&
      to !== "/reviewer-control-panel"
  );
  const tabElementsReviewer = HeaderElements.slice(0, 6).filter(
    ({ to }) =>
      to !== "/customer-control-panel" && to !== "/distributor-control-panel"
  );

  console.log("tabElementsDelivery");
  console.log(tabElementsDelivery);
  console.log("tabElementsReviewer");
  console.log(tabElementsReviewer);

  const allTabsElements = localStorage.getItem("token")
    ? localStorage.getItem("role") === "Distributor"
      ? tabElementsSeller
      : localStorage.getItem("role") === "Delivery"
      ? tabElementsDelivery
      : localStorage.getItem("role") === "Reviewer"
      ? tabElementsReviewer
      : tabElementsBuyer
    : tabElements;

  const authElements = localStorage.getItem("token")
    ? authElementsUser
    : authElementsNotUser;
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
