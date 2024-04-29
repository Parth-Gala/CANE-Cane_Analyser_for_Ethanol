import React from "react";

const CModal = ({ title, desc, image, isOpen, onClose }) => {
  const handleClose = () => {
    if (isOpen && onClose) {
      onClose();
    }
  };
  return (
    <div
      className={`w-screen h-screen bg-black bg-opacity-40 fixed top-0 left-0 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
      onClick={handleClose}
    >
      <div className="bg-slate-100 p-4 rounded-2xl border-2 border-black w-full max-w-xl">
        <div className="flex justify-between items-center">
          <div className=" w-1/2 h-1/2">
            <img src={image} alt="desc" />
          </div>

          <div className=" text-center">
            <div className="text-2xl font-semibold mt-4">{title}</div>
            <div className="font-titleFont font-semibold text-lg mt-2">
              {desc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CModal;
