import React, { useState } from "react";
import { useDropzone } from "react-dropzone"; // Import the useDropzone hook
import config from "../utils/url.js";
import wrongdetails from "../assets/wrongdetails.png";
import correct from "../assets/correct.png"
import CModal from "../components/CModal.js";

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setSelectedFile(acceptedFiles[0]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
  });

  // const ngrokUrl = process.env.REACT_APP_NGROK;
  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error("Please select or drop a file");
        setIsModalOpen(true)
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(`${config}/analysis`, {
        method: "POST",
        body: formData,
      });

      // console.log('check:', process.env);
      // console.log("Form Data:", formData);
      // console.log("NGROK", config);
      // for (const entry of formData.entries()) {
      //   console.log("Entries:", entry);
      // }

      console.log("Response Status:", response.status);
      console.log("Response Data:", await response.text());
      if (response.ok) {
        // If response is successful, set upload status and open modal
        setUploadStatus("success");
        setIsModalOpen(true);
      } else {
        // If response is not successful, set upload status and open modal
        setUploadStatus("failure");
        setIsModalOpen(true);
      }
    } catch (error) {
      setIsModalOpen(true);
      console.error("Error uploading file:", error);
    }
  };

 const closeModal = () => {
    // Reset upload status and close modal
    setIsModalOpen(false);
    setUploadStatus(null);
  };

  return (
    <>
      <div className=" m-3">
        <div
          className={`border-2 rounded-2xl border-dashed border-gray-400 p-5 text-center cursor-pointer mb-3 h-[300px] ${
            isDragActive ? " bg-green-500 h-auto" : " h-auto"
          }`}
          {...getRootProps()}
        >
          <input {...getInputProps()} type="file" />
          {isDragActive ? (
            <p className="text-center font-semibold text-black">
              Drop the files here...
            </p>
          ) : (
            <p className="text-center font-semibold">
              Drag & drop or click to select a file (images only).
            </p>
          )}
          {selectedFile && (
            <div className=" mt-3">
              <p className="font-semibold text-lg">
                Selected Image: {selectedFile.name}
              </p>
              {previewImage && <img src={previewImage} alt="selected file" />}
            </div>
          )}
        </div>
        <div className=" flex justify-center items-center">
          <button
            className="p-2 bg-designColor border-2 rounded-xl font-semibold"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>

      {isModalOpen && (
          <CModal 
          title={
            uploadStatus === "success" ? "Image Uploaded" : "Network Error"
          }
          desc={
            uploadStatus === "success"
              ? "Analyzing your field"
              : "404!! Please Check the error"
          }
          image={uploadStatus === "success" ? correct : wrongdetails}
          isOpen={isModalOpen}
          onClose={closeModal}
            />
        )}
    </>
  );
};

export default FileUploadForm;
