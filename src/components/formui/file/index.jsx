import React, { useRef } from "react";

import { useField, useFormikContext } from "formik";
import { Button, FormControl, FormHelperText } from "@material-ui/core";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import InputLabel from "@mui/material/InputLabel";

import UseThemMode from "@hooks/use-theme";
import UseDirection from "@hooks/use-direction";
import { Colors } from "@styles/theme";

const FileInput = ({ name, label, ...otherProps }) => {
  const { setFieldValue, errors, touched } = useFormikContext();
  const [field, meta] = useField("myFile");
  const inputFileRef = useRef(null);

  const handleIconClick = () => {
    inputFileRef.current.click();
  };

  const handleChange = (e) => {
    setFieldValue(name, e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const { themeMode } = UseThemMode();
  const { Direction } = UseDirection();
  const configFile = {
    ...otherProps,
    ...field,
    style: { display: "none" }, // Hide the original input
    onChange: handleChange,
    type: "file",
    // accept: ".pdf",
    fullWidth: true,
  };

  if (meta && meta.touched && meta.error) {
    configFile.error = true;
    configFile.helperText = meta.error;
  }

  return (
    <FormControl error={touched[name] && Boolean(errors[name])} fullWidth>
      <InputLabel htmlFor="myFile">{label}</InputLabel>
      <Button
        variant="outlined"
        onClick={handleIconClick}
        endIcon={<CloudUploadIcon style={{ fontSize: "30px" }} />}
        style={{
          color:
            touched[name] && errors[name]
              ? Colors.labelError
              : themeMode === "dark"
              ? Colors.labelDark
              : Colors.labelLight,
        }}
      >
        {/* <div style={{ [Direction.marginRight]: "10px" }}>{label}</div> */}
      </Button>

      <input {...configFile} ref={inputFileRef} />
      <FormHelperText>{touched[name] && errors[name]}</FormHelperText>
    </FormControl>
  );
};

export default FileInput;
