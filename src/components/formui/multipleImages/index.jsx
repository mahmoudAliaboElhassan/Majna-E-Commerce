import React, { useState, useEffect } from "react";

const ImageUploader = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    if (selectedImages.length >= 4) return;
    const files = e.target.files;
    const imagesArray = Array.from(files);
    setSelectedImages(imagesArray);
  };

  useEffect(() => {
    console.log("selectedImages", selectedImages);
  }, [selectedImages]);

  return (
    <div>
      <input type="file" multiple onChange={handleImageChange} />
      <div>
        {selectedImages.map((image, index) => (
          <img
            key={index}
            src={URL.createObjectURL(image)}
            alt={`Image ${index}`}
            style={{ width: "100px", height: "100px", margin: "5px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
