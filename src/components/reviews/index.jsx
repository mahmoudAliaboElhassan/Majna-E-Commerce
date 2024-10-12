import React, { useState, useEffect } from 'react'

import StarIcon from '@mui/icons-material/Star';
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Container, Typography, Card } from '@material-ui/core';
import {
    Divider,
    IconButton,
} from "@mui/material";
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from "sweetalert2";

import { getReviews, deleteSpecifiedReview } from "@state/slices/reviews"
import AddReview from '@components/reviews/addReview';
import "@pages/shoppingCart/style.css"
import { toast } from 'react-toastify';

function Reviews({ productId }) {
    const { t } = useTranslation()
    const [showForm, setShowForm] = useState(false)
    const { Uid } = useSelector((state) => state.auth)
    const { reviews, countOfReviews } = useSelector((state) => state.review)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getReviews({ productId }))
    }, [countOfReviews])

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
                dispatch(deleteSpecifiedReview({ productId, reviewId })).unwrap().
                    then(() => {
                        Swal.fire({
                            title: t("deleting-review"),
                            icon: "success",
                            confirmButtonText: t("ok"),
                        });
                    })
            }
            else {
                Swal.fire({
                    title: t("keeping-review"),
                    icon: "info",
                    confirmButtonText: t("ok"),
                });
            }
        })
    }

    return (
        <Container style={{ marginTop: "16px" }}>
            <div>
                {reviews?.length && <>
                    <Typography variant="h5" style={{ textAlign: "center", marginBottom: "8px" }}>{t("all-reviews")}</Typography>
                    <Box>
                        {reviews.map(({ rating, content, customer, id }) => (
                            <>
                                <Card raised style={{ padding: "16px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div>
                                            <Typography variant="body">{content}</Typography>
                                            <div>
                                                {[...Array(rating)]?.map((_, index) => (
                                                    <StarIcon sx={{ color: "yellow", fontSize: "2.5rem" }} />
                                                ))}
                                            </div>

                                        </div>
                                        {Uid == customer && (
                                            <IconButton onClick={() => handleDeleteReview(id)}>
                                                <DeleteIcon style={{ color: "#b81717", fontSize: "2.1rem" }} />
                                            </IconButton>
                                        )}
                                    </div>
                                </Card>
                                <Divider color="white" variant="middle" />
                            </>
                        ))}
                    </Box>
                </>
                }
            </div>
            <AddReview />
        </Container>
    )
}

export default Reviews
