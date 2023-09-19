import React, { useState, useRef } from 'react'
import Navbar from './Navbar';
import TagModal from './TagModal';
import Gallery from './Gallery';

const Home = () => {
    const [imageList, setImageList] = useState([
      {
        url: "https://www.lovepanky.com/wp-content/uploads/2014/07/how-to-impress-a-girl-on-the-first-date.jpg",
        tag: "relationship",
      },
      {
        url: "https://img.freepik.com/premium-photo/sports-equipment-green-grass-top-view_51195-1154.jpg",
        tag: "sport",
      },
      {
        url: "https://advice.cdn.betterhelp.com/md/advancing-the-relationship-what-to-text-after-first-date-1-SR-sr.jpg",
        tag: "relationship",
      },
      {
        url: "https://s2.research.com/wp-content/uploads/2020/07/24120329/university-statistics-featured-image-1-1200x600.jpg",
        tag: "education",
      },
      {
        url: "https://thewhistler.ng/wp-content/uploads/2020/02/Muritala-Muhammud-International-Airport-Lagos-1.jpg",
        tag: "aviation",
      },
      {
        url: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWlycG9ydHxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
        tag: "avaition",
      },
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb90WPPzjn2eWRPqlfI__Xmzrx3WduF8l7Ug&usqp=CAU",
        tag: "education",
      },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tagValue, setTagValue] = useState("")
    const [searchText, setSearchText] = useState("");
    const [filteredImages, setFilteredImages] = useState(null)
    const onSearchChange = () => {
        let text = event.target.value
     setSearchText(event.target.value)
     setFilteredImages(imageList.filter((image)=>image.tag.toLowerCase().includes(text.toLowerCase())))
    };
    const handleSearchImage = (event) => {
      event.preventDefault();
    };
    const modalRef = useRef(null)
    const clickOutside=(e)=>{
        const element= e.target
        if(isModalOpen && !modalRef.current.contains(element)){
        closeModal()
    }
    }

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };
    const handleAddTag=()=>{
        event.preventDefault()
        
    }
    const addNewTag=(
        <div className='flex flex-col'>
            <h2>Add a new tag to Image</h2>
            <form onSubmit={handleAddTag}>
                <input
                    type='text'
                    value={tagValue}
                    onChange={(e)=>setTagValue(e.target.value)}
                    className=''
                />
                <button>Add</button>
            </form>
        </div>
    )
  return (
    <div
      onClick={clickOutside}
      className=" w-full min-h-screen bg-slate-50 flex flex-col"
    >
      <Navbar openModal={openModal} searchText={searchText} onSearchChange={onSearchChange} handleSearchImage={handleSearchImage} />
      <div  className='relative mt-2'>
        <TagModal isOpen={isModalOpen} closeModal={closeModal} modalRef={modalRef}>
          {addNewTag}
        </TagModal>
      </div>
      <Gallery imageList={imageList} setImageList={setImageList} searchResult={filteredImages} />
    </div>
  );
}

export default Home