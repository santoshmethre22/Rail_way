


import React, { useState } from 'react';
import { userData } from '../../context/userContext.jsx';

function Upload() {
  const { uploadPhoto } = userData();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview before upload
    }
  };

  // Upload file
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    setUploading(true);
    try {
      await uploadPhoto(image); // Call function from context
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover mx-auto mb-3 rounded-lg" />}

      <button
        onClick={handleUpload} // ✅ FIXED: Call handleUpload instead of uploadPhoto directly
        disabled={uploading} // ✅ FIXED: Added uploading state
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default Upload;




/*
import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  //-------------------->-------------------------------------------------------->

  //-------------------->
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview before upload
    }
  };

  // Upload file to server
  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadedUrl(response.data.imageUrl); // Save uploaded image URL
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error.message);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md w-96 mx-auto text-center">
      <h2 className="text-lg font-bold mb-2">Upload an Image</h2>
      
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-3" />

      {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover mx-auto mb-3 rounded-lg" />}

      <button
        onClick={handleUpload}
        disabled={uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {uploadedUrl && (
        <div className="mt-4">
          <p className="text-green-600 font-semibold">Uploaded Image:</p>
          <img src={uploadedUrl} alt="Uploaded" className="w-40 h-40 object-cover mx-auto rounded-lg" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

*/
