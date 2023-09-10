import React, { useState } from 'react';
import { CloudinaryContext } from 'cloudinary-react';

const ImageUpload = ({onImageUpload}) => {
  const [image, setImage] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Display the selected image in the component
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload the image to Cloudinary
      uploadImageToCloudinary(file);
    }
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const cloudName = 'dnjt2uroo';
    const uploadPreset = 'xb9gduyp'; 

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.secure_url;
        console.log('Image uploaded to Cloudinary:', imageUrl);
        onImageUpload(imageUrl);
      } else {
        console.error('Failed to upload image to Cloudinary');
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {image && (
        <div>
          <h3>Selected Image:</h3>
          <img src={image} alt="Selected" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
