import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import Modal from "./Modal";
import Gallery from "./Gallery";
import { useEffect } from "react";
import Login from "../Auth/Login";
import "remixicon/fonts/remixicon.css";

const Home = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || null
  );
  const [imageList, setImageList] = useState([
    {
      id: 1,
      url: "https://www.lovepanky.com/wp-content/uploads/2014/07/how-to-impress-a-girl-on-the-first-date.jpg",
      tag: "relationship",
    },
    {
      id: 2,
      url: "https://www.usnews.com/cmsmedia/9d/61/76c926f3471d93eeb59718a3955f/aston-martin-dbx707-2.jpg",
      tag: "",
    },
    {
      id: 3,
      url: "https://img.freepik.com/premium-photo/sports-equipment-green-grass-top-view_51195-1154.jpg",
      tag: "sport",
    },
    {
      id: 4,
      url: "https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg",
      tag: "nature",
    },
    {
      id: 5,
      url: "https://advice.cdn.betterhelp.com/md/advancing-the-relationship-what-to-text-after-first-date-1-SR-sr.jpg",
      tag: "relationship",
    },
    {
      id: 6,
      url: "https://s2.research.com/wp-content/uploads/2020/07/24120329/university-statistics-featured-image-1-1200x600.jpg",
      tag: "education",
    },
    {
      id: 7,
      url: "https://cc-prod.scene7.com/is/image/CCProdAuthor/AdobeStock_288559400?$pjpeg$&jpegSize=200&wid=690",
      tag: "",
    },
    {
      id: 8,
      url: "https://plus.unsplash.com/premium_photo-1689700526278-f5096144422f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFuJTIwY29kaW5nfGVufDB8fDB8fHww&w=1000&q=80",
      tag: "tech",
    },
    {
      id: 9,
      url: "https://pd-beamliving-cd.beamliving.com/-/media/14-to-bl/2021-funny-memes-cats-1000x666px.jpg",
      tag: "memes",
    },
    {
      id: 10,
      url: "https://thewhistler.ng/wp-content/uploads/2020/02/Muritala-Muhammud-International-Airport-Lagos-1.jpg",
      tag: "aviation",
    },
    {
      id: 11,
      url: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
      tag: "",
    },
    {
      id: 12,
      url: "https://t4.ftcdn.net/jpg/02/66/31/75/360_F_266317554_kr7DPOoM5Uty0YCeFU9nDZTt4a2LeMJF.jpg",
      tag: "animal",
    },
    {
      id: 13,
      url: "https://www.boredpanda.com/blog/wp-content/uploads/2022/09/relatable-funny-memes-22-63284d45ebe28__700.jpg",
      tag: "",
    },
    {
      id: 14,
      url: "https://media.istockphoto.com/id/1137939519/photo/young-african-american-programmer-working-on-desktop-pc-in-the-office.jpg?s=612x612&w=0&k=20&c=wUof-pz7PzIeWANe31DyUclQZGg4f9bpiePXIFHNuJk=",
      tag: "",
    },
    {
      id: 15,
      url: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWlycG9ydHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
      tag: "aviation",
    },
    {
      id: 16,
      url: "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?cs=srgb&dl=pexels-godisable-jacob-949670.jpg&fm=jpg",
      tag: "fashion",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredImages, setFilteredImages] = useState(null);
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    setIsPending(true);
    setTimeout(() => {
      setIsPending(false);
    }, 300);
  }, []);
  const onSearchChange = () => {
    event.preventDefault();
    let text = event.target.value;
    setSearchText(event.target.value);
    setIsPending(true);
    setFilteredImages(
      imageList.filter((image) =>
        image.tag.toLowerCase().includes(text?.toLowerCase())
      )
    );
    setTimeout(() => {
      setIsPending(false);
    }, 100);
  };
  const handleSearchTag = (tagValue) => {
    setIsPending(true);
    setFilteredImages(
      imageList.filter((image) =>
        image.tag.toLowerCase().includes(tagValue.toLowerCase())
      )
    );
    setTimeout(() => {
      setIsPending(false);
    }, 100);
  };
  const modalRef = useRef(null);
  const clickOutside = (e) => {
    const element = e.target;
    if (isModalOpen && !modalRef.current.contains(element)) {
      closeModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  let imageWithTags = imageList.filter((image) => image.tag !== "");
  let tags = new Set(imageWithTags?.map((item) => item.tag));
  const allTags = (
    <div  className="w-full flex flex-col gap-y-1 h-full overflow-y-auto px-4">
      {" "}
      {[...tags]?.map((item, index) => (
        <button
          key={index}
          className="flex gap-x-3 capitalize"
          onClick={() => {
            setSearchText(item);
            handleSearchTag(item);
            closeModal();
          }}
        >
          <i className="ri-price-tag-3-line  text-base text-slate-600 md:text-2xl"></i>
          {item}
        </button>
      ))}
    </div>
  );
  return (
    <div
      onClick={clickOutside}
      className=" w-full min-h-screen bg-slate-50 flex flex-col"
    >
      <Modal
        isOpen={loginModal}
        closeModal={() => setLoginModal(false)}
        // modalRef={modalRef}
      >
        <Login
          setLoginModalOpen={setLoginModal}
          setToken={setToken}
          setUsername={setUsername}
        />
      </Modal>
      <>
        <Navbar
          openModal={openModal}
          searchText={searchText}
          onSearchChange={onSearchChange}
          handleSearchImage={onSearchChange}
          username={username}
          token={token}
          setLoginModalOpen={setLoginModal}
          setToken={setToken}
          setUsername={setUsername}
        />
        <div className="relative mt-2">
          <Modal
            isOpen={isModalOpen}
            closeModal={closeModal}
            modalRef={modalRef}
          >
            {allTags}
          </Modal>
        </div>
        <h1 className="w-full text-center uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold font-mono tracking-widest ">Pictures Gallery</h1>
        <Gallery
          imageList={imageList}
          setImageList={setImageList}
          searchResult={filteredImages}
          isPending={isPending}
          token={token}
          setLoginModalOpen={setLoginModal}
          openModal={openModal}
        />
      </>
    </div>
  );
};

export default Home;
