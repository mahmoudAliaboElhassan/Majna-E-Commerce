import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ActivateAccount } from "@state/slices/auth";
import UseThemMode from "@hooks/use-theme";
import LoadingFetching from "@components/loadingFetching";

function ActivationAccount() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { themeMode } = UseThemMode();
  const { loading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (uid && token) {
      dispatch(ActivateAccount({ uid, token }))
        .unwrap()
        .then(() => {
          {
            toast.success(t("activate-success"), {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: themeMode,
            });
            setTimeout(() => {
              console.log("hello");
              navigate("/login");
            }, 1000);
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            Swal.fire({
              title: t("error-activate-dispatch"),
              text: t("error-activate-dispatch-token"),
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: t("ok"),
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login");
              }
            });
          } else if (error.response.status === 409) {
            console.log(error);
            Swal.fire({
              text: t("error-activate-true"),
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: t("ok"),
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login");
              }
            });
          }
        });
    }
  }, [uid, token]);

  return (
    <>
      <ToastContainer />
      {loading && !error && (
        <LoadingFetching>{t("activating")}</LoadingFetching>
      )}
    </>
  );
}

export default ActivationAccount;
