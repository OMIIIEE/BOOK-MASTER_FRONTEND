// src/components/PopularBooksCarousel.jsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PopularBooks = ({ popularBooks }) => {
  return (
    <div className=" pt-4 pb-1 w-full">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl mb-4 text-[#FDC702] font-comforter text-center ">Popular Books</h2>
        <Carousel
          showArrows={true}
          showStatus={false}
          showIndicators={true}
          infiniteLoop={true}
          autoPlay={true}
          interval={2000}
          centerMode={true}
          centerSlidePercentage={20}
          swipeable={true}
          emulateTouch={true}
        >
          {popularBooks.map((book, index) => (
            <div key={index} className="py-6 px-4">
              <div className=" bg-white rounded-lg shadow-xl flex flex-col items-center justify-center p-1 hover:scale-110 transition-transform duration-300 ">
                <img src={book.image} alt={book.title} className=" h-[42vh] w-1/5 object-fit rounded-t-md  " />
                <div className="p-2 text-center">
                  <p className="text-black font-abril uppercase" >{book.title}</p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default PopularBooks;
