import React, { useRef } from "react";
import { useState } from "react";
import Reorder from "react-reorder";
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
}) => {
  const notify = (text) => toast(text);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tagValue, setTagValue] = useState("");
  const [imageId, setImageId] = useState(null);
  const [editTag, setEditTag] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);
  const tagRef = useRef(null);
  const [imageDropped, setImageDropped] = useState(null);

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
  const addTag = (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-center font-mono font-semibold text-lg">
        {" "}
        {editTag ? <>Edit tag value</> : <>Add a new tag to Image</>}
      </h2>
      <form
        onSubmit={handleAddTag}
        className="w-full mt-5 lg:mt-8 flex flex-col items-center"
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
          className={`md:w-64 rounded border px-2 py-[2px] md:text-lg text-center drop-shadow-lg focus-within:outline-none ${
            error && "border-red-600"
          }`}
        />
        <button className="lg:mt-8 mt-5 rounded border border-slate-500 shadow-lg px-8 md:px-12 py-1 md:py-1 md:text-lg tracking-wider font-medium active:bg-slate-300 hover:bg-slate-500 hover:text-white hover:border-none">
          {editTag ? <>Update</> : <>Add</>}
        </button>
      </form>
    </div>
  );
  const onReorder = (event, previousIndex, nextIndex) => {
    if (token) {
      const items = Array.from(imageList);
      const [reorderedItem] = items.splice(previousIndex, 1);
      items.splice(nextIndex, 0, reorderedItem);
      setImageList(items);
      setImageDropped(imageList[previousIndex].id);
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
            className="w-full mt-2 md:mt-6 grid place-items-center grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-2 rounded-lg border drop-shadow-lg fade-in "
            reorderId="my-list" // Unique ID that is used internally to track this list (required)
            reorderGroup="reorder-group" // A group ID that allows items to be dragged between lists of the same group (optional)
            component="div"
            placeholderClassName="bg-slate-50 border-2 w-full h-full border-green-600 opacity-30" // Class name to be applied to placeholder elements (optional), defaults to 'placeholder'
            draggedClassName="dragged border border-green-600 z-30 " // Class name to be applied to dragged elements (optional), defaults to 'dragged'
            lock=""
            holdTime={100} // Default hold time before dragging begins (mouse & touch) (optional), defaults to 0
            touchHoldTime={150} // Hold time before dragging begins on touch devices (optional), defaults to holdTime
            mouseHoldTime={100} // Hold time before dragging begins with mouse (optional), defaults to holdTime
            onReorder={onReorder} // Callback when an item is dropped (you will need this to update your state)
            disabled={false}
            autoScroll={true}
            disableContextMenus={true} // Disable context menus when holding on touch devices (optional), defaults to true
          >
            {images?.map((image, index) => (
              <div
                key={index}
                className={` relative w-[11rem] h-[11rem] sm:w-[15rem] sm:h-[15rem] md:w-[16rem]  md:h-[16rem] lg:w-[17rem] lg:h-[17rem] xl:w-[19rem] xl:h-[19rem] ${
                  imageDropped === image.id && "shake"
                } `}
              >
                <img
                  src={image.url}
                  alt={`${image.tag} image`}
                  className="w-full h-full object-cover rounded"
                  loading="lazy"
                />
                {image.tag && image.tag.length > 0 ? (
                  <span
                    className="absolute bottom-1 right-1 p-1 bg-gradient-to-t from-slate-900 to-transparent px-2 font-medium font-mono rounded text-sm text-slate-100 hover:cursor-pointer z-20"
                    onClick={() => {
                      if (token) {
                        setTagValue(image.tag);
                        setEditTag(true);
                        setImageId(image.id);
                        setIsModalOpen(true);
                      } else {
                        notify("Login to edit tags");
                        setLoginModalOpen(true);
                      }
                    }}
                  >
                    #{image.tag}
                  </span>
                ) : (
                  <i
                    onClick={() => {
                      if (token) {
                        setTagValue("");
                        setEditTag(false);
                        setIsModalOpen(true);
                        setImageId(image.id);
                        tagRef.current.focus();
                      } else {
                        notify("Login to add new tags");
                        setLoginModalOpen(true);
                      }
                    }}
                    className="ri-price-tag-3-line absolute bottom-1 right-1 text-lg text-slate-100 pr-1 md:text-2xl hover:cursor-pointer z-20"
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
        {addTag}
      </Modal>
    </div>
  );
};

export default Gallery;
