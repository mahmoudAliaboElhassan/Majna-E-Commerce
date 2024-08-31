import React, { useState, useRef } from "react";
import { useField, useFormikContext } from "formik";
import { helperStyle } from "@styles/error";

import {
  Button,
  FormControl,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputLabel from "@mui/material/InputLabel";
import { useTranslation } from "react-i18next";

import UseThemMode from "@hooks/use-theme";
import UseDirection from "@hooks/use-direction";
import { Colors } from "@styles/theme";

const ImageUploader = () => {
  const formik = useFormikContext();
  const { t } = useTranslation();
  const [field, meta] = useField("album");
  const [moreFour, setMoreFour] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const { themeMode } = UseThemMode();
  const { Direction } = UseDirection();
  const [oneIsCover, setOneIsCover] = useState(false);
  const [lessTwo, setLessTwo] = useState(false);

  const inputFileRef = useRef(null);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = Array.from(files);

    // Reset state before processing
    setSelectedImages([]);
    formik.setFieldValue("album", []);

    // If there is only one file selected
    if (imagesArray.length === 1) {
      e.preventDefault();
      setLessTwo(true);
      setOneIsCover(true);
      setMoreFour(false);
      return;
    }

    // If more than three files are selected
    if (imagesArray.length > 3) {
      e.preventDefault();
      setMoreFour(true);
      setLessTwo(false);
      setOneIsCover(true);
      return;
    }

    // Reset the error states
    setMoreFour(false);
    setLessTwo(false);
    setOneIsCover(false);

    // Process selected images
    imagesArray.forEach((img, idx) => {
      formik.setFieldValue(`album.${idx}.image`, `image-${idx}`);
      formik.setFieldValue(`image-${idx}`, img);
    });
    setSelectedImages(imagesArray);
  };

  const handleIconClick = () => {
    inputFileRef.current.click();
  };

  const handleIsCover = (index) => {
    selectedImages.forEach((img, idx) => {
      formik.setFieldValue(
        `album.${idx}.is_cover`,
        idx === index ? "True" : "False"
      );
    });
    setOneIsCover(true);
  };

  return (
    <div>
      <FormControl
        error={
          Boolean(formik?.touched["album"]) &&
          formik?.errors["album"] !== undefined
        }
        fullWidth
      >
        <InputLabel htmlFor="myFile">{t("choose-img")}</InputLabel>
        <Button
          variant="outlined"
          onClick={handleIconClick}
          endIcon={<CloudUploadIcon style={{ fontSize: "30px" }} />}
          style={{
            color:
              Boolean(formik?.touched["album"]) &&
              formik?.errors["album"] !== undefined
                ? Colors.labelError
                : themeMode === "dark"
                ? Colors.labelDark
                : Colors.labelLight,
          }}
        />
        <input
          type="file"
          onChange={handleImageChange}
          multiple
          ref={inputFileRef}
          style={{ display: "none" }}
          fullWidth={true}
        />
        <FormHelperText style={helperStyle}>
          {moreFour && t("more-four")}
          {lessTwo && t("less-two")}
        </FormHelperText>
      </FormControl>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {selectedImages.map((image, index) => (
          <div key={index}>
            <input
              type="radio"
              name="cover"
              onChange={() => handleIsCover(index)}
              id={`id${index}`}
            />
            <label htmlFor={`id${index}`} style={{ cursor: "pointer" }}>
              <img
                src={URL.createObjectURL(image)}
                alt={`Image ${index}`}
                style={{ width: "100px", height: "100px", margin: "5px" }}
              />
            </label>
            <div>{formik.errors?.album && formik.errors.album[index]?.img}</div>
            <div>
              {formik.errors?.album && formik.errors.album[index]?.is_cover}
            </div>
          </div>
        ))}
      </div>

      <FormHelperText style={helperStyle}>
        {selectedImages.length && !oneIsCover ? t("required-img") : null}
      </FormHelperText>
    </div>
  );
};

export default ImageUploader;
