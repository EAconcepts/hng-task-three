import React, { useRef } from "react";
import { useState } from "react";
import Reorder, {
  reorder,
  reorderImmutable,
  reorderFromTo,
  reorderFromToImmutable,
} from "react-reorder";
import PuffLoader from "react-spinners/PuffLoader";
import { toast, ToastContainer } from "react-toastify";
import "remixicon/fonts/remixicon.css";
import Modal from "./Modal";

const Gallery = ({
  imageList,
  setImageList,
  searchResult,
  isPending,
  token,
  setLoginModalOpen,
  openModal,
}) => {
  const notify = (text) => toast(text);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tagValue, setTagValue] = useState("");
  const [imageId, setImageId] = useState(null);
  const [editTag, setEditTag] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);
  const tagRef = useRef(null);
  const clickOutside = (e) => {
    const element = e.target;
    if (isModalOpen && !modalRef.current.contains(element)) {
      closeModal();
    }
  };
  const handleAddTag = () => {
    event.preventDefault();
    if (tagValue) {
      const update = imageList.map((item) => {
        if (imageId === item.id) {
          return { ...item, tag: tagValue };
        }
        return item;
      });
      setImageList(update);
      notify("Successful!");
      setTagValue("");
      setEditTag(false);
      setIsModalOpen(false);
    } else {
      setError("empty field!");
      notify("Tag name cannot be empty");
    }
  };
  const addNewTag = (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-center font-mono font-semibold text-lg">
        {" "}
        {editTag ? <>Edit tag value</> : <>Add a new tag to Image</>}
      </h2>
      <form
        onSubmit={handleAddTag}
        className="w-full mt-4 flex flex-col items-center"
      >
        <input
          ref={tagRef}
          type="text"
          value={tagValue}
          autoFocus
          maxLength="15"
          onChange={(e) => {
            setTagValue(e.target.value);
            setError(null);
          }}
          className={`md:w-64 rounded border px-2 py-[2px] md:text-lg drop-shadow-lg focus-within:outline-none ${
            error && "border-red-600"
          }`}
        />
        <button className="md: mt-3 rounded border shadow-lg px-8 md:px-12 md:py-1 md:text-lg tracking-wider font-medium active:bg-slate-300 hover:bg-slate-500 hover:text-white hover:border-none">
          {editTag ? <>Update</> : <>Add</>}
        </button>
      </form>
    </div>
  );
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
              <div
                key={index}
                className=" relative w-36 h-36 sm:w-72 sm:h-72 border"
              >
                <img
                  src={image.url}
                  alt={`${image.tag} image`}
                  className="w-full h-full object-cover rounded"
                  loading="lazy"
                />
                {image.tag && image.tag.length > 0 ? (
                  <span
                    className="absolute bottom-1 right-1 p- bg-gradient-to-t from-slate-200 rounded text-sm text-slate-800"
                    onClick={() => {
                      setTagValue(image.tag);
                      setEditTag(true);
                      setImageId(image.id);
                      setIsModalOpen(true);
                    }}
                  >
                    #{image.tag}
                  </span>
                ) : (
                  <i
                    onClick={() => {
                      // openModal
                      setIsModalOpen(true);
                      setImageId(image.id);
                      tagRef.current.focus();
                    }}
                    className="ri-price-tag-3-line absolute bottom-1 right-1  text-base text-slate-600 md:text-2xl"
                  ></i>
                )}
              </div>
            ))}
          </Reorder>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        modalRef={modalRef}
      >
        {addNewTag}
      </Modal>
    </div>
  );
};

export default Gallery;
