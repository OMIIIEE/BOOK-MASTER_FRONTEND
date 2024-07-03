import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const items = [
  {
    src: "https://coolwallpapers.me/picsup/3111813-bookcase_books_business_colors_colours_data_document_education_indoors_knowledge_library_literature_research_school_shelf_text_university_wisdom.jpg",
    altText: "Slide 1",
    caption:
      "The only limit to our realization of tomorrow is our doubts of today.",
  },
  {
    src: "https://c4.wallpaperflare.com/wallpaper/935/849/231/background-tree-book-wallpaper-preview.jpg",
    altText: "Slide 2",
    caption:
      "The future belongs to those who believe in the beauty of their dreams.",
  },
  {
    src: "https://wallpaperbat.com/img/169860-book-wallpaper-hd.jpg",
    altText: "Slide 3",
    caption:
      "Do not wait to strike till the iron is hot; but make it hot by striking.",
  },
];

const UserCarousel = () => {
  return (
    <div className="w-full max-w-7xl mx-auto mt-8 h-[60vh] z-10">
      <Carousel 
        showArrows={true} 
        autoPlay={true} 
        infiniteLoop={true} 
        dynamicHeight={true} 
        showIndicators={false}
        showThumbs={false}
      >
        {items.map((item, index) => (
          <div key={index}>
            <img
              className="w-full h-[60vh] object-cover "
              src={item.src}
              alt={item.altText}
            />
            <div className="legend bg-black bg-opacity-50 p-4 rounded-md text-white ">
              {item.caption}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default UserCarousel;
