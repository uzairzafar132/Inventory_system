import React, { useState } from 'react';

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpload = async () => {
   
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', selectedImage);
      const accessToken = localStorage.getItem('token')
      console.log(accessToken)
      try {
        const response = await fetch('http://localhost:8080/api/users/upload-image', {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
          },
        });
      
        if (response.ok) {
          // Image uploaded successfully
          console.log('Image uploaded successfully');
          // You can handle the response or perform any other action
        } else {
          // Handle error if needed
          console.error('Image upload failed');
        }
      }  catch (error) {
        console.error('Image upload failed', error);
      }
    } else {
      // Handle no selected image error
      console.error('No image selected');
    }
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ImageUpload;
