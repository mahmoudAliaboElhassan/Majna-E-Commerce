import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Button, Container } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { getReviews } from "@state/slices/reviews"
function Reviews({ productId }) {
    const { t } = useTranslation()
    const [showForm, setShowForm] = useState(false)
    const dispatch = useDispatch();
    const { reviews } = useSelector((state) => state.review)
    useEffect(() => {
        dispatch(getReviews({ productId }))
    }, [])
    return (
        <Container>
            <Button onClick={() => setShowForm(true)}>{t("add-review")}</Button>

            {showForm && <div>hello</div>}

        </Container>
    )
}

export default Reviews
