import React, { useState } from "react";

const Modal = ({ isOpen, closeModal, children, modalRef}) => {
  // console.log(isOpen)
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center z-50"
    : "hidden";

  return (
    <div className={modalClasses}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        ref={modalRef}
        className="bg-white rounded-lg px-4 md:px-6 py-3 pb-4 z-10 w-[90%] md:w-[50%] h-[35%] md:h-[40%] flex flex-col"
      >
        <div className="flex flex-row justify-end">
          <button
            className="top-0 text-gray-600 hover:text-gray-800"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col items-center mt-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
