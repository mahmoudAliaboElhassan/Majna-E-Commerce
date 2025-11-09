import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"

import { PdfContainer } from "@styles/reviewer"
import UseThemMode from "@hooks/use-theme"
import { Colors } from "@styles/theme"

const PdfViewer = ({ fileAuthorize, fileIdntity }) => {
  const { t } = useTranslation()
  const [view, setView] = useState(false)
  const toggleFile = () => setView(!view)
  const { themeMode } = UseThemMode()

  return (
    <>
      <Button
        component={Typography}
        sx={{
          display: "flex",
          mb: 1,
          fontSize: "18px",
          backgroundColor: themeMode === "dark" ? Colors.info : Colors.primary,
        }}
        onClick={toggleFile}
        variant="contained"
      >
        {view ? t("hide") : t("show")} {t("documents")}
      </Button>

      {view && (
        <>
          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            {t("authorizeDocument")}
          </Typography>
          <PdfContainer>
            <iframe
              src={fileAuthorize}
              style={{ width: "100%", height: "600px", border: "none" }}
              title={t("authorizeDocument")}
            />
          </PdfContainer>

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            {t("idDocument")}
          </Typography>
          <PdfContainer>
            <iframe
              src={fileIdntity}
              style={{ width: "100%", height: "600px", border: "none" }}
              title={t("idDocument")}
            />
          </PdfContainer>
        </>
      )}
    </>
  )
}

export default PdfViewer
