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
        className="bg-white rounded-lg px-4 md:px-6 py-3 pb-4 z-10 w-[90%] h-[42%] sm:h-[44%] md:h-[49%] md:w-[60%] flex flex-col"
      >
        <div className="flex flex-row justify-end">
          <button
            className="top-0 text-gray-600 hover:font-medium hover:text-red-600"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
        <div className="w-full flex flex-col h-full  items-center py-4 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
