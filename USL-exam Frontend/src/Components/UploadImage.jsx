import React, { useState } from 'react';

const UploadImage = () => {
  // State to store the selected file
  const [selectedFile, setSelectedFile] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = () => {
    if (selectedFile) {
      // You can perform any necessary operations with the selected file here, such as uploading it to a server
      console.log("Selected file:", selectedFile);
      // Clear the selected file after upload
      setSelectedFile(null);
    } else {
      alert("Please select a file.");
    }
  };

  return (
    <div>
      {/* Input element for file selection */}
      <input type="file" onChange={handleFileChange} />

      {/* Button to trigger file upload */}
      <button onClick={handleUpload}>Upload</button>

      {/* Display the selected file name */}
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
    </div>
  );
};

export default UploadImage;
