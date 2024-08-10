import React, { useState } from "react";

// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { pdfjs } from "react-pdf";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

import { PdfContainer } from "@styles/reviewer";
import UseThemMode from "@hooks/use-theme";
import { Colors } from "@styles/theme";
import ImageUploader from "@components/formui/multipleImages";
import jadwalPdf from './jadwal.pdf';


const PdfViewer = ({ fileAuthorize, fileIdntity }) => {
  const { t } = useTranslation();
  const [view, setView] = useState(false);
  const toggleFile = () => setView(!view);
  const { themeMode } = UseThemMode();

  const docs = [
    { uri: fileAuthorize, fileType: "pdf", fileName: t("authorizeDocument") }, // Remote file
    { uri: fileIdntity, fileType: "pdf", fileName: t("idDocument") }, // Remote file
    { uri: jadwalPdf, fileType: "pdf" }, // Local File}
    // {
    //   uri: require("./files/mahmoud.pdf"),
    //   fileType: "pdf",
    //   fileName: "mahmoud",
    // }, // Local File
  ];
  return (
    <>
      {/* <Button
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
          // <Worker
            // // workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={file} />
          // </Worker>
        </PdfContainer>
      )}
      <ImageUploader /> */}
      <DocViewer
        documents={docs}
        initialActiveDocument={docs[0]}
        pluginRenderers={DocViewerRenderers}
        stye={{ height: "100vh" }}
      />
    </>
  );
};

export default PdfViewer;
