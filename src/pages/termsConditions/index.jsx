import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"
import { Container, Typography } from "@mui/material";

import { AppbarHeader } from "@styles/appbar";
import UseTermsConditons from "@hooks/use-terms-conditions";
import QuestionsAnswers from "@components/dataListing";


function TermsConditions() {
    const { t } = useTranslation()
    const { termsConditions } = UseTermsConditons()
    return (
        <Container maxWidth="md">
            <AppbarHeader>{t('here-terms-conditions')}</AppbarHeader>
            <QuestionsAnswers data={termsConditions} />
            <Typography variant="h5" sx={{ textAlign: " center" }}>{t("if-agreed")} <Link to="/signup" style={{ textDecoration: "underline" }}>{t("signup")}</Link>  </Typography>
        </Container >


    )
}



export default TermsConditions