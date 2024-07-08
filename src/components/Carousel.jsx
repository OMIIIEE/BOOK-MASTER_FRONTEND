import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import img2 from '../assets/carousel/a4.jpg';
import img3 from '../assets/carousel/a6.jpg';
import img4 from '../assets/carousel/a2.png';
import img1 from '../assets/carousel/Desktop.png';
import img5 from '../assets/carousel/a5.png';
import img6 from '../assets/carousel/a7.webp';
import AOS from "aos";
import "aos/dist/aos.css";

const Carousel = () => {
  const location = useLocation();
  const [timeRunning, setTimeRunning] = useState(3000);
  const [timeAutoNext, setTimeAutoNext] = useState(3000);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesRef = useRef([]);
  const autoNextTimeoutRef = useRef(null);
  const runTimeoutRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1700 });
  }, []);

  useEffect(() => {
    autoNextTimeoutRef.current = setTimeout(() => {
      showSlider('next');
    }, timeAutoNext);

    return () => {
      clearTimeout(autoNextTimeoutRef.current);
      clearTimeout(runTimeoutRef.current);
    };
  }, [currentSlide, timeAutoNext]);

  const showSlider = (type) => {
    if (type === 'next') {
      setCurrentSlide((prev) => (prev + 1) % slidesRef.current.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + slidesRef.current.length) % slidesRef.current.length);
    }

    clearTimeout(runTimeoutRef.current);
    runTimeoutRef.current = setTimeout(() => {
    }, timeRunning);

    clearTimeout(autoNextTimeoutRef.current);
    autoNextTimeoutRef.current = setTimeout(() => {
      showSlider('next');
    }, timeAutoNext);
  };

  return (
    <div className="carousel h-[90vh] w-full overflow-hidden relative ">
      <div className="list absolute inset-0 ">
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => (slidesRef.current[index] = el)}
            className={`item absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}` } 
          >
            <img src={slide.img} alt="" className="w-full h-full object-cover center z-10 m-auto " />
            <div className="content flex flex-col justify-center absolute top-1/2 left-0 transform -translate-y-1/2 text-white shadow-lg p-4 bg-black bg-opacity-70 rounded-r-full h-[80vh] w-1/3 z-20" data-aos="" >
              <div className="title text-5xl leading-tight font-abril" data-aos="fade-up">{slide.title}</div>
              <div className="topic text-5xl leading-tight text-orange-500 font-abril"  >{slide.topic}</div>
              <div className=" mt-4 font-pacifico text-xl"  >{slide.description}</div>
              <div className="buttons mt-4 grid grid-cols-2 gap-2">
                {location.pathname === '/' && (
                  <>
                    <Link to="/login">
                      <button className="bg-gray-200 text-black font-medium py-2 w-full">SEE MORE</button>
                    </Link>
                    <Link to="/login">
                      <button className="bg-transparent border border-white text-white font-medium py-2 w-full">FOLLOW US</button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="arrows absolute top-4/5 right-1/2 transform translate-x-1/2 flex gap-2">
        <button id="prev" className="w-10 h-10 bg-gray-300 bg-opacity-50 text-white rounded-full" onClick={() => showSlider('prev')}>{'<'}</button>
        <button id="next" className="w-10 h-10 bg-gray-300 bg-opacity-50 text-white rounded-full" onClick={() => showSlider('next')}>{'>'}</button>
      </div> */}

      <div className="time absolute top-0 left-0 w-0 h-1 bg-orange-500"></div>
    </div>
  );
};

const slides = [
  {
    img: img2,
    title: 'THE BOOK MASTER',
    topic: 'TALES',
    description: 'An intriguing dive into captivating stories and narratives.',
    
  },
  {
    img: img3,
    title: 'THE BOOK MASTER',
    topic: ' MANGA MANIA',
    description: 'Dive into the captivating world of anime and mangas.',
  },
  {
    img: img1,
    title: 'THE BOOK MASTER',
    topic: 'MARVEL',
    description: "Exploring the wonders of Marvel's universe through literature.",
  },
  {
    img: img4,
    title: 'THE BOOK MASTER',
    topic: 'STORY TIME',
    description: 'Join us for enchanting tales and magical stories.',
  },
  {
    img: img5, 
    title: 'THE BOOK MASTER',
    topic: 'FICTION',
    description: 'Discover the most popular books that are capturing the hearts and minds of readers everywhere.'
  },
  {
    img: img6,
    title: 'THE BOOK MASTER',
    topic: 'NEW RELEASES',
  description: 'Explore the latest additions to our collection, from thrilling mysteries to captivating stories.'
},
];

export default Carousel;
