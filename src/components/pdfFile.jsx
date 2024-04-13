import React, { useState } from "react";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { pdfjs } from "react-pdf";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

import { PdfContainer } from "@styles/reviewer";
import UseThemMode from "@hooks/use-theme";
import { Colors } from "@styles/theme";
import ImageUploader from "@components/formui/multipleImages";

const PdfViewer = ({ file, label }) => {
  const { t } = useTranslation();
  const [view, setView] = useState(false);
  const toggleFile = () => setView(!view);
  const { themeMode } = UseThemMode();
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
        {view ? t("hide") : t(`show`)}
        {t(label)}
      </Button>
      {view && (
        <PdfContainer>
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={file} />
          </Worker>
        </PdfContainer>
      )}
      {/* <ImageUploader /> */}
    </>
  );
};

export default PdfViewer;
