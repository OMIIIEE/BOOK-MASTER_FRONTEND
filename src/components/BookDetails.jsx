import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaSave, FaTimes, FaTrashAlt } from "react-icons/fa";

const BookDetails = ({}) => {
  const [publishers, setPublishers] = useState([]);
  const [editingBookId, setEditingBookId] = useState(null);
  const [editedBook, setEditedBook] = useState({});

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axios.get("https://book-master-backend-new-1.onrender.com/api/auth/books/publishers");
        setPublishers(response.data.publishers);
      } catch (error) {
        console.error("Error fetching publishers:", error);
      }
    };

    fetchPublishers();
  }, []);

  const handleEdit = (book) => {
    setEditingBookId(book._id);
    setEditedBook({ ...book });
  };

  const handleCancelEdit = () => {
    setEditingBookId(null);
    setEditedBook({});
  };

  const handleSaveEdit = async () => {
    try {
      // Update the book in the backend
      await axios.put(`https://book-master-backend-new-1.onrender.com/api/auth/books/${editedBook._id}`, editedBook);
      
      // Update the book in the frontend
      const updatedPublishers = publishers.map(publisher => ({
        ...publisher,
        authors: publisher.authors.map(author => ({
          ...author,
          books: author.books.map(book => (book._id === editedBook._id ? editedBook : book))
        }))
      }));
      setPublishers(updatedPublishers);
      
      // Clear edit mode
      setEditingBookId(null);
      setEditedBook({});
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDelete = async (bookId) => {
    try {
      // Delete the book from the backend
      await axios.delete(`https://book-master-backend-new-1.onrender.com/api/auth/books/${bookId}`);
      
      // Delete the book from the frontend
      const updatedPublishers = publishers.map(publisher => ({
        ...publisher,
        authors: publisher.authors.map(author => ({
          ...author,
          books: author.books.filter(book => book._id !== bookId)
        }))
      }));
      setPublishers(updatedPublishers);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container p-8 w-full flex flex-col items-center">
      <h2 className="text-3xl mb-6 font-abril">Book Details</h2>
      {publishers.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto w-[1400px] h-[550px] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-lg">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Publisher Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Authors
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Book Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Total Available
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Publish Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Genre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {publishers.map((publisher) => {
                const authorCount = publisher.authors.reduce(
                  (count, author) => count + author.books.length,
                  0
                );

                return (
                  <React.Fragment key={publisher._id}>
                    {publisher.authors.map((author, authorIndex) => (
                      <React.Fragment key={author._id}>
                        {author.books.map((book, bookIndex) => (
                          <tr key={book._id}>
                            {authorIndex === 0 && bookIndex === 0 && (
                              <td
                                rowSpan={authorCount}
                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300"
                              >
                                {publisher.publisherName}
                              </td>
                            )}
                            {bookIndex === 0 && (
                              <td
                                rowSpan={author.books.length}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300"
                              >
                                <div className="font-bold">{author._id}</div>
                              </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                              {editingBookId === book._id ? (
                                <input
                                  type="text"
                                  name="name"
                                  value={editedBook.name}
                                  onChange={handleChange}
                                  className="border border-gray-300 px-2 py-1 rounded-md"
                                />
                              ) : (
                                book.name
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                              {editingBookId === book._id ? (
                                <input
                                  type="number"
                                  name="copies"
                                  value={editedBook.copies}
                                  onChange={handleChange}
                                  className="border border-gray-300 px-2 py-1 rounded-md"
                                />
                              ) : (
                                book.copies
                              )}
                            </td>
                            <td className="pl-4 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                            {new Date(book.publishDate).toISOString().substr(0, 10)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                            {editingBookId === book._id ? (
                                <input
                                  type="number"
                                  name="price"
                                  value={editedBook.price}
                                  onChange={handleChange}
                                  className="border border-gray-300 px-2 py-1 rounded-md"
                                />
                              ) : (
                                book.price
                              )}
                            </td>
                            <td className="pl-4 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                            {book.category}
                            </td>
                            <td className="pl-4 py-4 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                              {editingBookId === book._id ? (
                                <>
                                  <button
                                    className="text-green-500 px-2 py-2 mr-2"
                                    onClick={handleSaveEdit}
                                  >
                                    <FaSave />
                                  </button>
                                  <button
                                    className="text-gray-500 px-2 py-2"
                                    onClick={handleCancelEdit}
                                  >
                                    <FaTimes />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="text-yellow-500 px-2 py-2 mr-2"
                                    onClick={() => handleEdit(book)}
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    className="text-red-500 px-2 py-2"
                                    onClick={() => handleDelete(book._id)}
                                  >
                                    <FaTrashAlt />
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
