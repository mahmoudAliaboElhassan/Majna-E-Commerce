import React from "react";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Colors } from "@styles/theme";
import UseThemMode from "@hooks/use-theme";

const CheckboxWrapper = ({ name, label, legend, from, ...otherProps }) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt) => {
    const { checked } = evt.target;
    if (from === "add-album") {
      setFieldValue(name, checked === true ? "True" : "False");
    } else setFieldValue(name, checked);
  };

  const { themeMode } = UseThemMode();

  const { t } = useTranslation();

  const configCheckbox = {
    ...field,
    onChange: handleChange,
  };

  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
    configFormControl.helperText = meta.error;
  }

  return (
    <FormControl {...configFormControl}>
      <FormLabel
        component="legend"
        style={{
          color:
            meta.error && meta.touched
              ? Colors.labelError
              : themeMode == "dark"
              ? Colors.labelDark
              : Colors.labelLight,
          whiteSpace: "nowrap",
        }}
      >
        {from !== "add-album" && (
          <Link
            title={t("terms-conditions")}
            to="/terms-conditions"
            style={{ textDecoration: "underline" }}
          >
            {" "}
            {legend}
          </Link>
        )}
      </FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...configCheckbox} />}
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxWrapper;
