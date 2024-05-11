import React, { useState, useEffect } from "react";

import { useFormikContext } from "formik";

const ImageUploader = () => {
  const formik = useFormikContext();
  const [selectedImages, setSelectedImages] = useState([]);
  const handleImageChange = (e) => {
    // if (selectedImages.length >= 4) return;
    const files = e.target.files;
    console.log(files);
    const imagesArray = Array.from(files);
    imagesArray.map((img, idx) => {
      formik?.setFieldValue(`imgs.${idx}.img`, img);
    });
    setSelectedImages(imagesArray);
    console.log(imagesArray.length);
  };
  const handleIsCover = (index) => {
    selectedImages.forEach((img, idx) => {
      formik?.setFieldValue(`imgs.${idx}.isCover`, idx === index);
    });
  };

  // useEffect(() => {
  //   console.log("selectedImages", selectedImages);
  // }, [selectedImages]);

  return (
    <div>
      <input type="file" multiple onChange={handleImageChange} />
      <div>
        {selectedImages.map((image, index) => (
          <>
            <input
              type="radio"
              name="cover"
              value={URL.createObjectURL(image)}
              onChange={() => handleIsCover(index)}
            />
            <img
              key={index}
              src={URL.createObjectURL(image)}
              alt={`Image ${index}`}
              style={{ width: "100px", height: "100px", margin: "5px" }}
              onClick={(e) => console.log(e.target)}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
