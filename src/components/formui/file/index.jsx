import React, { useRef, useState } from "react"

import { useField, useFormikContext } from "formik"
import {
  Button,
  FormControl,
  FormHelperText,
  Typography,
} from "@material-ui/core"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import InputLabel from "@mui/material/InputLabel"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"

import UseThemMode from "@hooks/use-theme"
import UseDirection from "@hooks/use-direction"
import { Colors } from "@styles/theme"

const FileInput = ({ name, label, ...otherProps }) => {
  const { setFieldValue, errors, touched, values } = useFormikContext()
  const [field, meta] = useField(name)
  const inputFileRef = useRef(null)
  const [fileName, setFileName] = useState("")

  const handleIconClick = () => {
    inputFileRef.current.click()
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFieldValue(name, file)
      setFileName(file.name)
      console.log(file)
    }
  }

  const { themeMode } = UseThemMode()
  const { Direction } = UseDirection()

  const configFile = {
    ...otherProps,
    style: { display: "none" },
    onChange: handleChange,
    type: "file",
    fullWidth: true,
  }

  return (
    <FormControl error={touched[name] && Boolean(errors[name])} fullWidth>
      <InputLabel htmlFor={name}>{label}</InputLabel>
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
          justifyContent: "center",
          
        }}
      >
        
      </Button>

      <input {...configFile} ref={inputFileRef} id={name} name={name} />

      {fileName && !errors[name] && (
        <Typography
          variant="caption"
          style={{
            marginTop: "4px",
            display: "flex",
            alignItems: "center",
            color: themeMode === "dark" ? Colors.labelDark : Colors.labelLight,
          }}
        >
          <InsertDriveFileIcon
            style={{ fontSize: "16px", marginRight: "4px" }}
          />
          {fileName}
        </Typography>
      )}

      <FormHelperText>{touched[name] && errors[name]}</FormHelperText>
    </FormControl>
  )
}

export default FileInput
