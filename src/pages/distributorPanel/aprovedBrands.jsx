import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";

import {
  getAtuthorizedBrands,
  cleanUpAuthorizedBrands,
} from "@state/slices/distributor";
import LoadingFetching from "@components/loadingFetching";

function AprovedBrands() {
  const { t } = useTranslation();
  const { Uid } = useSelector((state) => state.auth);
  const { approvedBrands, loadingAuthorized } = useSelector(
    (state) => state.distributor
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAtuthorizedBrands({ Uid }));
    return () => {
      dispatch(cleanUpAuthorizedBrands());
    };
  }, [dispatch]);
  return (
    <>
      {loadingAuthorized ? (
        <LoadingFetching>{t("loading-brands")}</LoadingFetching>
      ) : approvedBrands.length ? (
        approvedBrands.map((brand, idx) => (
          <>
            <div data-aos="fade-up" data-aos-duration={`${3000 * idx}`}>
              {brand.name}
            </div>
            {/* <div data-aos="fade-up">Mahmoud Ali hassan</div> */}
          </>
        ))
      ) : (
        <>
          <div
            data-aos="fade-up"
            // data-aos-duration="3000"
            // style={{ fontSize: "18px" }}
          >
            {t("no_brands")}
          </div>
          <div data-aos="fade-up">Mahmoud Ali hassan</div>
        </>
      )}
    </>
  );
}

export default AprovedBrands;
