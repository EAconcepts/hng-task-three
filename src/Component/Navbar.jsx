import React from 'react'
import { useState } from "react";
import "remixicon/fonts/remixicon.css";

const Navbar = ({openModal, searchText, onSearchChange, handleSearchImage}) => {
    
  return (
    <>
      <nav className=" bg-white h-16 w-full flex flex-row justify-between items-center py-2 px-4">
        <div className="flex items-end gap-x-2">
          <i className="ri-user-3-fill text-4xl text-slate-600"></i>
          <h3 className="text-lg font-mono font-medium">Username</h3>
        </div>
        <form onSubmit={handleSearchImage} className="w-[70%]">
          <input
            type="search"
            value={searchText}
            placeholder="Search image with tag"
            onChange={onSearchChange}
            className="w-full bg-transparent border rounded-md p-1 shadow-sm text-center text-lg focus-within:outline-slate-400"
          />
        </form>
        <div className="flex items-end gap-x-4">
          <i onClick={openModal} className="ri-price-tag-3-line text-slate-600 text-2xl"></i>
          <button className="text-lg font-mono font-medium">Sign in</button>
        </div>
      </nav>
    </>
  );
}

export default Navbar