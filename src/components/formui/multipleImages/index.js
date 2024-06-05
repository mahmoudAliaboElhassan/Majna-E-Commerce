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

import UseThemMode from "@hooks/use-theme";
import UseDirection from "@hooks/use-direction";
import { Colors } from "@styles/theme";
import { useTranslation } from "react-i18next";
const ImageUploader = () => {
  const formik = useFormikContext();
  const { t } = useTranslation();
  const [field, meta] = useField("album");
  const [moreFour, setMoreFour] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  // console.log(meta);
  // console.log(meta.error);
  // console.log(meta.error?.[0]);
  // console.log(meta.error?.[0]?.img);

  const { themeMode } = UseThemMode();
  const { Direction } = UseDirection();
  const [oneIsCover, setOneIsCover] = useState(false);
  const handleImageChange = (e) => {
    const files = e.target.files;
    const imagesArray = Array.from(files);

    // Check if the number of selected files exceeds 4
    if (imagesArray.length > 4) {
      // Prevent further processing
      e.preventDefault();
      setMoreFour(true);
      // Inform the user that only 4 files are allowed
      // alert("You can only select up to 4 files.");
      return;
    }

    imagesArray.forEach((img, idx) => {
      setMoreFour(false);
      formik?.setFieldValue(`album.${idx}.image`, `image-${idx}`);
      formik?.setFieldValue(`image-${idx}`, img);
    });
    setSelectedImages(imagesArray);
  };

  const inputFileRef = useRef(null);

  const handleIconClick = () => {
    inputFileRef.current.click();
  };
  const handleIsCover = (index) => {
    selectedImages.forEach((img, idx) => {
      formik?.setFieldValue(
        `album.${idx}.is_cover`,
        idx === index ? "True" : "False"
      );
    });
    setOneIsCover(true);
  };

  console.log("error is ");
  console.log(formik?.errors["album.[0]?.img"]);
  console.log(formik?.errors["album"]);
  console.log(formik.errors["album.[0]"]);
  console.log(formik.errors["album.0"]);
  console.log(formik.errors["album[0]"]);
  console.log(formik?.errors["album"] !== undefined);
  console.log(Boolean(formik?.touched["album"]));
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
        >
          {/* <div style={{ [Direction.marginRight]: "10px" }}>{label}</div> */}
        </Button>

        <input
          type="file"
          onChange={handleImageChange}
          multiple
          ref={inputFileRef}
          style={{ display: "none" }}
          fullWidth={true}
        />
        <FormHelperText>
          {moreFour
            ? "You can not select more than 4 images"
            : !selectedImages.length && meta.error?.[0]?.img}
        </FormHelperText>
      </FormControl>
      {/* <input type="file" multiple onChange={handleImageChange} /> */}

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
                onClick={(e) => console.log(e.target)}
              />
            </label>
            <div>{formik.errors?.album && formik.errors.album[index]?.img}</div>
            <div>
              {formik.errors?.album && formik.errors.album[index]?.is_cover}
            </div>
          </div>
        ))}
      </div>

      <FormHelperText>
        {selectedImages.length && !oneIsCover
          ? "One Image is Required to be the Cover"
          : null}
      </FormHelperText>
    </div>
  );
};

export default ImageUploader;
