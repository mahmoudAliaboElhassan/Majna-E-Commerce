import React, { useState, useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Container, Typography } from '@material-ui/core';
import {
  Divider,
  IconButton, Card
} from "@mui/material";
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";
import UpdateIcon from '@mui/icons-material/Update';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { getReviews, deleteSpecifiedReview } from "@state/slices/reviews";
import AddReview from '@components/reviews/addReview';
import "@pages/shoppingCart/style.css";
import LoadingFetching from '@components/loadingFetching';

function Reviews({ productId }) {
  const { t } = useTranslation();
  const { Uid } = useSelector((state) => state.auth);
  const { reviews, countOfReviews, loadingGetRevies } = useSelector((state) => state.review);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews({ productId }));
  }, [countOfReviews, productId, dispatch]);

  const handleDeleteReview = (reviewId) => {
    Swal.fire({
      title: t("suring"),
      text: t("info-review"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("delete-confirm"),
      cancelButtonText: t("cancel-delete"),
      customClass: {
        confirmButton: "red-confirm-button swal2-confirm",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSpecifiedReview({ productId, reviewId })).unwrap()
          .then(() => {
            Swal.fire({
              title: t("deleting-review"),
              icon: "success",
              confirmButtonText: t("ok"),
            });
          });
      } else {
        Swal.fire({
          title: t("keeping-review"),
          icon: "info",
          confirmButtonText: t("ok"),
        });
      }
    });
  };

  return (
    <Container style={{ marginTop: "16px" }}>
      <div>
        {reviews?.length !== 0 && (
          <>
            {loadingGetRevies ? (
              <LoadingFetching>{t("loading-reviews")}</LoadingFetching>
            ) : (
              <>
                <Typography variant="h5" style={{ textAlign: "center", marginBottom: "8px" }}>
                  {t("all-reviews")}
                </Typography>
                <>
                  {reviews?.map(({ rating, content, customer_id, id, customer_username }) => (
                    <Card key={id} raised component="div" style={{ padding: "16px", marginBottom: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <Typography variant="body">{content}</Typography>
                          <div>
                            {[...Array(rating)]?.map((_, index) => (
                              <StarIcon key={index} sx={{ color: "yellow", fontSize: "2.5rem" }} />
                            ))}
                          </div>
                        </div>
                        {Uid == customer_id && (
                          <div>
                            <IconButton onClick={() => handleDeleteReview(id)} title={t("delete-review")}>
                              <DeleteIcon style={{ color: "#b81717", fontSize: "2.1rem" }} />
                            </IconButton>
                            <IconButton component={Link} title={t("update-review")}
                              to={`/update-review/${productId}/${id}`}>
                              <UpdateIcon style={{ fontSize: "2.1rem" }} />
                            </IconButton>
                            <Typography variant="body1">{customer_username}</Typography>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </>
              </>
            )}
          </>
        )}
      </div>
      <AddReview />
    </Container>
  );
}

export default Reviews;
