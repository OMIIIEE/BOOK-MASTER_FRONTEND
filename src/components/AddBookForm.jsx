import React, { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Button } from "reactstrap";
import { X } from "lucide-react";

const AddBookForm = ({ isAdmin, closeModal }) => {
  const [book, setBook] = useState({
    name: "",
    authorName: "",
    publisherName: "",
    publishDate: "",
    copies: 0,
    price: 0,
    imageLink: "",  
    summary:"",
    category:"",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const addBook = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:9003/api/auth/books",
        { ...book },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBook({
        name: "",
        authorName: "",
        publisherName: "",
        publishDate: "",
        copies: 0,
        price: 0,
        imageLink: "",
        summary:"",
        category:"",
      });
      alert(res.data.message);
      closeModal();
    } catch (error) {
      console.error(error);
      alert("Book submission failed. Please try again.");
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm bg-[#5AB2FF] flex flex-col justify-center items-center h-auto overflow-y-auto z-50 -mt-6">
    <div className="mt-10 flex flex-col gap-2 h-[100vh] ">
      <button className="place-self-end" onClick={closeModal}>
        <X size={30} />
      </button>
      <div className="rounded-xl px-8 py-8 bg-indigo-600 flex flex-col gap-2 items-center mx-4">
        <h2 className="text-center mb-2 text-4xl text-white font-comforter">Add Book</h2>
        <Form onSubmit={addBook} className="grid grid-cols-2 gap-4 w-full">
          <FormGroup className="col-span-1">
            <label className="text-white">Book Name:</label>
            <input
              type="text"
              name="name"
              value={book.name}
              onChange={handleChange}
              placeholder="Enter Book Name"
              className="w-full p-2.5 rounded-lg border-none text-base"
              required
            />
          </FormGroup>
          <FormGroup className="col-span-1">
            <label className="text-white">Author Name:</label>
            <input
              type="text"
              name="authorName"
              value={book.authorName}
              onChange={handleChange}
              placeholder="Enter Author Name"
              className="w-full p-2.5 rounded-lg border-none text-base"
              required
            />
          </FormGroup>
          <FormGroup className="col-span-1">
            <label className="text-white">Publisher Name:</label>
            <input
              type="text"
              name="publisherName"
              value={book.publisherName}
              onChange={handleChange}
              placeholder="Enter Publisher Name"
              className="w-full p-2.5 rounded-lg border-none text-base"
              required
            />
          </FormGroup>
          <FormGroup className="col-span-1">
            <label className="text-white">Publishing Date:</label>
            <input
              type="date"
              name="publishDate"
              value={book.publishDate}
              onChange={handleChange}
              className="w-full p-2.5 rounded-lg border-none text-base"
              required
            />
          </FormGroup>
          <FormGroup className="col-span-1">
            <label className="text-white">Number of Copies:</label>
            <input
              type="number"
              name="copies"
              value={book.copies}
              onChange={handleChange}
              placeholder="Enter Number of Copies"
              className="w-full p-2.5 rounded-lg border-none text-base"
              required
            />
          </FormGroup>
          <FormGroup className="col-span-1">
            <label className="text-white">Price:</label>
            <input
              type="number"
              name="price"
              value={book.price}
              onChange={handleChange}
              placeholder="Enter Price"
              className="w-full p-2.5 rounded-lg border-none text-base"
              required
            />
          </FormGroup>
          <FormGroup className="col-span-2">
            <label className="text-white">Book Image Link:</label>
            <input
              type="text"
              name="imageLink"
              value={book.imageLink}
              onChange={handleChange}
              placeholder="Enter Book Image Link"
              className="w-full p-2.5 rounded-lg border-none text-base"
              required
            />
          </FormGroup>
          <FormGroup className="col-span-2">
            <label className="text-white">Summary:</label>
            <textarea
              name="summary"
              value={book.summary}
              onChange={handleChange}
              placeholder="Enter Book Summary"
              className="w-full p-2.5 rounded-lg border-none text-base h-16"
              required
            />
          </FormGroup>
          <FormGroup className="col-span-2">
            <label className="text-white">Genre:</label>
            <input
              type="text"
              name="category"
              value={book.category}
              onChange={handleChange}
              placeholder="Enter Book Genre"
              className="w-full p-2.5 rounded-lg border-none text-base"
              required
            />
          </FormGroup>
          <Button
            className="col-span-2 inline-block px-6 py-2 bg-white text-[#5AB2FF] font-medium border-2 rounded hover:bg-transparent hover:text-white transition-colors duration-300 mt-4"
            type="submit"
            color="success"
          >
            Add Book
          </Button>
        </Form>
      </div>
    </div>
  </div>
  );
};

export default AddBookForm;



