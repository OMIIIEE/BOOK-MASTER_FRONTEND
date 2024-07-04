// src/components/FeedbackCarousel.jsx
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import StarRating from '../components/StarRating';

const FeedbackCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get('https://book-master-backend-new-1.onrender.com/api/feedback');
        if (response.data.success) {
          setTestimonials(response.data.latestFeedbacks);
        } else {
          setError('Failed to fetch feedback');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeedback();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className=" py-8 bg-transparent">
      <div className="container mx-auto flex flex-col ">
        <h2 className="text-3xl md:text-5xl mb-4 text-[#FDC702] font-comforter text-center">Customer Feedback</h2>
        <Carousel showArrows={true} showStatus={false} showIndicators={true} infiniteLoop={true} autoPlay={true} interval={3000} >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex justify-center  p-8 ">
              <div className="testimonial  text-white p-8 rounded-3xl border-yellow-500 border-t-4 border-b-4 w-full md:w-1/2 mx-2 ">
                <div className="pic w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden">
                  <img src={testimonial.adminAvatar} className="w-full h-auto" alt={testimonial.adminName} />
                </div>
                <h3 className="title text-yellow-500 text-lg font-semibold uppercase">{testimonial.adminName}</h3>
                <p className="description text-base p-4">{testimonial.feedback.comment}</p>
                <StarRating rating={testimonial.feedback.bookRating} />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default FeedbackCarousel;
