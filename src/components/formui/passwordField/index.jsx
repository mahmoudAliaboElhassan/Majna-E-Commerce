import { useState } from "react"

import IconButton from "@mui/material/IconButton"
import OutlinedInput from "@mui/material/OutlinedInput"
import InputLabel from "@mui/material/InputLabel"
import InputAdornment from "@mui/material/InputAdornment"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useField } from "formik"
import { useTranslation } from "react-i18next"

function PasswordField({ name, ...otherProps }) {
  const [field, mata] = useField(name)
  const [showPassword, setShowPassword] = useState(false)
  const { i18n } = useTranslation()

  // Determine if current language is RTL
  const isRTL =
    i18n.language === "ar" || i18n.language === "he" || i18n.language === "fa"

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const configTextField = {
    fullWidth: true,
    variant: "outlined",
    ...field,
    ...otherProps,
  }

  if (mata && mata.touched && mata.error) {
    configTextField.error = true
    configTextField.helperText = mata.error
  }

  const visibilityIcon = (
    <InputAdornment position={isRTL ? "start" : "end"}>
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        edge={isRTL ? "start" : "end"}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  )

  return (
    <>
      <TextField
        {...configTextField}
        type={showPassword ? "text" : "password"}
        InputProps={{
          startAdornment: isRTL ? visibilityIcon : null,
          endAdornment: isRTL ? null : visibilityIcon,
        }}
      />
    </>
  )
}

export default PasswordField
