import React from "react";
import { useState } from "react";
import "remixicon/fonts/remixicon.css";
import { toast, ToastContainer } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../firebaseAuth";

const Navbar = ({
  openModal,
  searchText,
  onSearchChange,
  handleSearchImage,
  username,
  token,
  setLoginModalOpen,
  setToken,
  setUsername,
}) => {
  const notify = (text) => toast(text);
  const handleSignOut = () => {
    // const auth = getAuth();
    signOut(auth)
      .then(() => {
        notify("sign out successful!");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        setToken(null);
        setUsername(null);
      })
      .catch((error) => {
        // An error happened
        console.log(error);
        notify("couldn't sign out!");
      });
  };

  return (
    <>
      <ToastContainer />
      <nav className="w-full bg-white h-16 flex flex-row justify-between items-center py-2 px-3 lg:px-6 ">
        <div className="flex items-end gap-x-2">
          <i 
          onClick={()=>window.location.reload()} 
          className="ri-user-3-fill text-lg lg:text-4xl text-slate-600"></i>
          <h3 className="hidden md:block text-sm lg:text-lg font-mono font-medium">
            {username}
          </h3>
        </div>
        <form onSubmit={handleSearchImage} className=" md:w-[50%] ">
          <input
            type="search"
            value={searchText}
            placeholder="Search image with tag"
            onChange={onSearchChange}
            className="w-full bg-transparent border rounded-md p-1 shadow-sm text-center text-sm md:text-lg focus-within:outline-slate-400"
          />
        </form>
        <div className="flex items-end gap-x-2 md:gap-x-4">
          <i
            onClick={openModal}
            className="ri-price-tag-3-line text-base text-slate-600 md:text-2xl"
          ></i>
          {token ? (
            <button
              onClick={handleSignOut}
              className="text-sm md:text-lg font-mono font-medium"
            >
              sign out
            </button>
          ) : (
            <button
              onClick={() => setLoginModalOpen(true)}
              className="text-sm md:text-lg font-mono font-medium"
            >
              sign in
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
