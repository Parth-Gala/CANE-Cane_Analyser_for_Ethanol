import React, { useState } from "react";
import { useDropzone } from "react-dropzone"; // Import the useDropzone hook
import config from "../utils/url.js";
import wrongdetails from "../assets/wrongdetails.png";
import correct from "../assets/correct.png";
import CModal from "../components/CModal.js";
import { FaIndustry, FaLeaf, FaRuler } from 'react-icons/fa';
import { GiSugarCane } from "react-icons/gi";
const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const [responseData, setResponseData] = useState(null);
  // const [loading, setLoading] = useState(null);

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
        setIsModalOpen(true);
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      setUploadStatus("uploading");

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
      // console.log("Response Data:", await response.json());
      if (response.ok) {
        const responseData = await response.json();
        console.log("Response Data:", responseData);
        setResponseData(responseData);
        // const imageData = responseData.drawn_image;
        // const totalPixels = responseData["Total number of pixels in the image"];
        // const segmentAreas = responseData["Area of segment 1"]; // Example, you can access other areas similarly

        // setImageData(imageData);
        // setTotalPixels(totalPixels);
        // setSegmentAreas(segmentAreas);

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
        {}
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
            disabled={uploadStatus === "uploading"}
          >
            Upload
          </button>
        </div>

        {uploadStatus === "uploading" && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-gray-900 bg-opacity-50">
            <div id="loader" className="w-20 h-20 relative rounded-lg animate-spin hover:bg-gray-700">
              <div className="w-14 h-14 absolute rounded-lg bg-green-600 -top-5 -left-5"></div>
              <div className="w-14 h-14 absolute rounded-lg bg-blue-600 -bottom-5 -right-5"></div>
            </div>
          </div>
        )}

<div>
  {responseData && (
    <div className="my-5 text-lg ">
      <div className=" font-titleFont text-lg">Output Analysed Image</div>
      <img
        src={`data:image/jpeg;base64,${responseData["drawn_image"]}`}
        alt="panoptic segmented "
      />

      <div className=" flex items-center justify-evenly  my-3">

      <p className="border-2 border-green-600 rounded-xl p-3">
        <FaIndustry className="inline text-center text-lg text-red-400" /> Ethanol production:{" "}
        {responseData["ethanol_production_prediction"]} Litres{" "}
        {/* <span className="tooltip">
          <i className="fas fa-info-circle"></i>
          <span className="tooltiptext">
            Ethanol production value is calculated based on the density of ethanol at 25°C.
          </span>
        </span> */}
      </p>
              
      <p className="border-2 border-green-600 rounded-xl p-3">   
        <FaLeaf className="inline text-center text-lg text-green-500"/> Sugarcane production:{" "}
        {responseData["total_sugarcane_production"]} kg
      </p>
      <p className=" border-2 border-green-600 rounded-xl p-3">
        <FaRuler className="inline text-center text-lg text-yellow-600" /> Total Sugarcane area: {responseData["total_sugarcane_area"]}m^2
      </p>

      </div>
      <p className=" font-semibold"><GiSugarCane className="inline text-center text-2xl text-green-600"/>The area of sugarcane fields detected (in px)</p>
      {Object.entries(responseData).map(([key, value]) => {
        // Check if the key has already been rendered
        if (!key.startsWith("Area of segment")) {
          return null; // Skip rendering these keys
        }
        return (
          <div>
          <ul key={key}>
            <li>
              {key}: {value} px
            </li>
          </ul>
          </div>
        );
      })}
    </div>
  )}
</div>
      </div>

      {isModalOpen && (
        <CModal
          title={
            uploadStatus === "success" ? "Image Uploaded" : "Network Error"
          }
          desc={
            uploadStatus === "success"
              ? "Field is Analysed"
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
