import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const tags = ["one", "two", "three"];

const validationSchema = Yup.object().shape({
  tags: Yup.array()
     .test('exact-length', 'Please select exactly two tags.', (tags) => tags.length === 2)

    // .max(2, "You can select only up to two tags.")
    .required("Please select at least one tag."),
});

const ProjectsForm = () => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tags: [],
    },
    validationSchema: validationSchema, // Add the validation schema here
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleChange = (e) => {
    const { checked, name, value } = e.target;
    console.log(`e.targe is  `);
    console.log({ ...e.target });
    if (checked) {
      formik.setFieldValue("tags", [...formik.values.tags, value]);
      console.log(value);
    } else {
      formik.setFieldValue(
        "tags",
        formik.values.tags.filter((v) => v !== value)
      );
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {tags.map((tag) => (
        <div key={tag}>
          <input
            id={tag}
            type="checkbox"
            name="tag"
            value={tag}
            checked={formik.values.tags.includes(tag)}
            onChange={handleChange}
          />
          <label htmlFor={tag}>{tag}</label>
        </div>
      ))}
      {formik.errors.tags ? (
        <div style={{ color: "red" }}>{formik.errors.tags}</div>
      ) : null}
      <button type="submit">Submit</button>
    </form>
  );
};
export default ProjectsForm;
