import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Container, Grid, Typography, makeStyles } from "@material-ui/core";

import { getAtuthorizedBrands } from "@state/slices/distributor";
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
  }, []);
  return (
    <>
      {loadingAuthorized ? (
        <LoadingFetching>{t("loading-brands")}</LoadingFetching>
      ) : approvedBrands.length ? (
        approvedBrands.map((brand) => brand.name)
      ) : (
        <Typography style={{ fontSize: "18px" }}>{t("no_brands")}</Typography>
      )}
    </>
  );
}

export default AprovedBrands;
