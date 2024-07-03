import React, { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Button } from "reactstrap";
import img1  from "../assets/home-enquiry.png"

const EnquiryForm = ({ closeModal }) => {
  const [enquiry, setEnquiry] = useState({
    name: "",
    email: "",
    subject:"",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnquiry((prevEnquiry) => ({
      ...prevEnquiry,
      [name]: value,
    }));
  };

  const submitEnquiry = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9004/api/enquiry", enquiry);

      if (response.data.success) {
        alert("Enquiry successfully sent!");

        // Reset form fields
        setEnquiry({
          name: "",
          email: "",
          subject: "",
          message: ""
        });

        // Optionally close modal after showing alert
        // closeModal();
      } else {
        alert("Failed to send enquiry. Please try again.");
      }
    } catch (error) {
      console.error("There was an error sending the enquiry!", error);
      alert("An error occurred while sending the enquiry. Please try again.");
    }
  };

  return (
    <div className="relative inset-0 bg-opacity-30 backdrop-blur-sm  flex justify-center items-center  p-4 z-10  flex-row gap-8">
      <div className="text-center text-white">
        <img src={img1} alt="" className="w-[400px]"/>
        <span className="text-5xl font-bold block mb-2 font-abril ">Have An Enquiry?</span>
        <h2 className="text-3xl font-pacifico mb-4">Get in Touch</h2>
      </div>
      <div className="border-yellow-500 border-r-4 border-t-4 rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl md:text-5xl mb-4 text-[#FDC702] font-comforter text-center">Enquiry Form</h2>
        <Form onSubmit={submitEnquiry}>
          <FormGroup className="mb-4">
            <label className="text-white font-medium" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={enquiry.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-2.5 rounded-lg border-none text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5AB2FF] focus:border-transparent"
              required
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <label className="text-white font-medium" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={enquiry.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2.5 rounded-lg border-none text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5AB2FF] focus:border-transparent"
              required
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <label className="text-white font-medium" htmlFor="email">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={enquiry.subject}
              onChange={handleChange}
              placeholder="Enter the Subject"
              className="w-full p-2.5 rounded-lg border-none text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5AB2FF] focus:border-transparent"
              required
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <label className="text-white font-medium" htmlFor="message">
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              value={enquiry.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows={3}
              className="w-full p-2.5 rounded-lg border-none text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5AB2FF] focus:border-transparent"
              required
            />
          </FormGroup>
          <Button
            type="submit"
            className="w-full py-3 bg-[#5AB2FF] text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Submit Enquiry
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EnquiryForm;
