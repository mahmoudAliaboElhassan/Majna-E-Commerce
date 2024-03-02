// import React from "react";
// import { useField, useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   InputLabel,
//   Input,
//   Button,
//   FormControl,
//   FormHelperText,
// } from "@material-ui/core";

// const MyForm = () => {
// //   const [field, meta] = useField("myFile");
//   const validationRules = Yup.object().shape({
//     myFile: Yup.mixed()
//       .required("required")
//       .test("fileFormat", "Only PDF files are allowed", (value) => {
//         if (value) {
//           const supportedFormats = ["pdf"];
//           return supportedFormats.includes(value.name.split(".").pop());
//         }
//         return true;
//       })
//       .test("fileSize", "File size must not be more than 3MB", (value) => {
//         if (value) {
//           return value.size <= 3145728;
//         }
//         return true;
//       }),
//   });

//   const formik = useFormik({
//     initialValues: {
//       myFile: "",
//     },
//     onSubmit: ({ values }) => {
//       console.log("Submitted");
//       console.log({ ...values });
//       console.log(values?.myFile );
//     },
//     validationSchema: validationRules,
//   });

//   const handleChange = (e) => {
//     formik.setFieldValue("myFile", e.target.files[0]);
//   };

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <FormControl>
//         <InputLabel htmlFor="myFile">File</InputLabel>
//         <Input
//           type="file"
//           id="myFile"
//           name="myFile"
//           accept=".pdf"
//           onChange={handleChange}
//         />
//         {/* <FormHelperText>{meta.touched && meta.error}</FormHelperText> */}
//       </FormControl>

//       <br />
//       <Button type="submit" variant="contained" color="primary">
//         Submit
//       </Button>
//     </form>
//   );
// };

// export default MyForm;
