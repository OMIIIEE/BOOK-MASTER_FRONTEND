
import axios from 'axios';

export const fetchBooks = async (setBooks, setError) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://book-master-backend-new-1.onrender.com/api/auth/books/book", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setBooks(res.data.books);
  } catch (error) {
    console.error("Error fetching books data:", error);
    setError(error.message);
  }
};
