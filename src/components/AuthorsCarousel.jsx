import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const AuthorsCarousel = () => {
  // Static data for authors
  const authors = [
    { id: 1, name: "Jerome K Jerome", image: "https://www.thefamouspeople.com/profiles/images/jerome-k-jerome-4.jpg" },
    { id: 2, name: "J. K. Rowling", image: "https://wallpapercave.com/wp/wp3635868.jpg" },
    { id: 3, name: "Kentaro Miura", image: "https://upload.wikimedia.org/wikipedia/en/1/1a/Kentaro_Miura.png" },
    { id: 4, name: "Isayama", image: "https://metagalaxia.com.br/wp-content/uploads/2023/09/Hajime-Isayama.webp" },
    { id: 5, name: "Eiichiro Oda", image: "https://images.mubicdn.net/images/cast_member/338108/cache-353994-1531355853/image-w856.jpg" },
    { id: 6, name: "Harper Lee", image: "https://www.thefamouspeople.com/profiles/images/harper-lee-9.jpg" },
    { id: 7, name: "J.R.R. Tolkien", image: "https://i.harperapps.com/hcuk/authors/005767/x500.JPG" },
    { id: 8, name: "J.D. Salinger", image: "https://m.media-amazon.com/images/M/MV5BYzUzY2FhNmYtNTU3MC00OThiLTgzOTUtZWY2OTE0MDRmMmRiXkEyXkFqcGdeQXVyMTc4MzI2NQ@@._V1_.jpg" },
    { id: 9, name: "Leo Tolstoy", image: "https://www.thefamouspeople.com/profiles/images/leo-tolstoy-21.jpg" },
    { id: 10, name: "Jane Austen", image: "https://www.telegraph.co.uk/content/dam/books/2017/07/14/TELEMMGLPICT000116857349-xlarge_trans_NvBQzQNjv4BqUSWEkhR4t6g-JrP4diCBRFAqbvmA8BqtmXF6ZGzjkX0.jpeg" },
    { id: 11, name: "Charles Dickens", image: "https://cdn.britannica.com/46/129246-050-C7633CD1/Charles-Dickens.jpg" },
    { id: 12, name: "William Shakespeare", image: "https://2.bp.blogspot.com/-wsfhHSqQEeg/WflspHRlMgI/AAAAAAAADkI/pR51e2dEQiMENaT4DH2TQ41vClUAQ55qACLcBGAs/s1600/william-shakespeare.jpg" },
    { id: 13, name: "Agatha Christie", image: "https://images.saymedia-content.com/.image/t_share/MTc0NDY3OTMwNTMxMDQ3MDQ2/agatha-christie-the-best-selling-mystery-writer-of-all-time.jpg" },
  ];

  return (
    <div className="mt-6 p-6">
      <h2 className="text-3xl md:text-5xl mb-4 text-[#FDC702] font-comforter text-center">Featured Authors</h2>
      <Carousel
        showArrows={true}
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={2000}
        centerMode={true}
        centerSlidePercentage={20}
        swipeable={true}
        emulateTouch={true}
      >
        {authors.map((author, index) => (
          <div key={index} className="py-6 px-4">
            <div className=" rounded-lg  flex flex-col items-center justify-center p-1 hover:scale-110 transition-transform duration-300">
              <img src={author.image} alt={author.name} className="w-1/5 h-64 object-cover rounded-full " />
              <div className="p-2 text-center">
                <p className="text-white font-abril">{author.name}</p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AuthorsCarousel;
