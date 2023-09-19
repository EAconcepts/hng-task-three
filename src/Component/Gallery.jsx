import React from "react";
import { useState } from "react";
import Reorder, {
  reorder,
  reorderImmutable,
  reorderFromTo,
  reorderFromToImmutable,
} from "react-reorder";
import PuffLoader from "react-spinners/PuffLoader";
import {toast, ToastContainer} from 'react-toastify'

const Gallery = ({
  imageList,
  setImageList,
  searchResult,
  isPending,
  token,
  setLoginModalOpen,
}) => {
  const notify = (text) => toast(text);
  const onReorder = (event, previousIndex, nextIndex, fromId, toId) => {
    // console.log(previousIndex, nextIndex)
    if (token) {
      const items = Array.from(imageList);
      const [reorderedItem] = items.splice(previousIndex, 1);
      // console.log(reorderedItem)
      items.splice(nextIndex, 0, reorderedItem);
      setImageList(items);
    } else {
      notify("Please login to drag n drop");
      setLoginModalOpen(true);
    }
  };
  let images = searchResult ? searchResult : imageList;

  return (
    <div className="w-full">
      <ToastContainer />
      <div className="w-full px-2 md:px-8">
        {isPending ? (
          <div className="w-full flex justify-center lg:my-40">
            {" "}
            <PuffLoader size={100} />{" "}
          </div>
        ) : (
          <Reorder
            className="w-full mt-2 md:mt-10 grid place-items-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 rounded-lg border drop-shadow-lg"
            reorderId="my-list" // Unique ID that is used internally to track this list (required)
            reorderGroup="reorder-group" // A group ID that allows items to be dragged between lists of the same group (optional)
            // getRef={this.storeRef.bind(this)} // Function that is passed a reference to the root node when mounted (optional)
            component="div" // Tag name or Component to be used for the wrapping element (optional), defaults to 'div'
            placeholderClassName="border border-blue-600" // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
            draggedClassName="dragged" // Class name to be applied to dragged elements (optional), defaults to 'dragged'
            lock="" // Lock the dragging direction (optional): vertical, horizontal (do not use with groups)
            holdTime={200} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
            touchHoldTime={200} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
            mouseHoldTime={200} // Hold time before dragging begins with mouse (optional), defaults to holdTime
            onReorder={onReorder} // Callback when an item is dropped (you will need this to update your state)
            autoScroll={true} // Enable auto-scrolling when the pointer is close to the edge of the Reorder component (optional), defaults to true
            disabled={false} // Disable reordering (optional), defaults to false
            disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
            placeholder={
              <div className="" /> // Custom placeholder element (optional), defaults to clone of dragged element
            }
          >
            {images?.map((image, index) => (
              <div key={index} className=" relative w-36 h-36 sm:w-72 sm:h-72 border">
                <img
                  src={image.url}
                  alt={`${image.tag} image`}
                  className="w-full h-full object-cover rounded"
                  loading="lazy"
                />
                <span className="absolute bottom-1 right-1 p- bg-gradient-to-t from-slate-200 rounded text-sm text-slate-800">
                  #{image.tag}
                </span>
              </div>
            ))}
          </Reorder>
        )}
      </div>
    </div>
  );
};

export default Gallery;
