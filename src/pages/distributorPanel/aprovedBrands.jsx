

import { useEffect } from "react"

import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Container, Box, Typography } from "@mui/material";
import { Card } from "@mui/material";

import {
  getAtuthorizedBrands,
  cleanUpAuthorizedBrands,
} from "@state/slices/distributor";
import LoadingFetching from "@components/loadingFetching";
import { AppbarHeader } from "@styles/appbar";
import { NoCount,NoCountContainer } from "@styles/products";

function ApprovedBrands() {
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
  }, [dispatch, Uid]);

  return (
    <>
      {loadingAuthorized ? (
        <LoadingFetching>{t("loading-approved-brands")}</LoadingFetching>
      ) : approvedBrands.length ? (
        <>
          <AppbarHeader >{t("approved-brands")}</AppbarHeader>
          <Box>
            {approvedBrands?.map(({ name }, idx) => (
              <Typography variant="h4"
                data-aos="fade-up"
                data-aos-duration={`${3000 * idx}`}
                key={idx}
                sx={{ textAlign: "center" }}
              >
                {name}
              </Typography>
            ))}
          </Box>
        </>
      ) : (
        <NoCountContainer>
          <NoCount>
            {t("no_brands")}
          </NoCount>
        </NoCountContainer >
      )}
    </>
  );
}

export default ApprovedBrands;
