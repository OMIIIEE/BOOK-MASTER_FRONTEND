import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const ChartTopBooks = ({ token }) => {
  const chartRef = useRef(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get("https://book-master-backend-new-1.onrender.com/api/purchases", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPurchases(response.data);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, []);

  useEffect(() => {
    const calculateTopBooks = () => {
      // Calculate total quantity purchased for each book
      const bookMap = new Map();
      purchases.forEach(purchase => {
        const bookId = purchase.bookId._id;
        if (bookMap.has(bookId)) {
          bookMap.get(bookId).quantity += purchase.quantity;
        } else {
          bookMap.set(bookId, {
            name: purchase.bookId.name,
            quantity: purchase.quantity,
          });
        }
      });

      // Convert the map to an array and sort by quantity in descending order
      const booksArray = Array.from(bookMap.values());
      booksArray.sort((a, b) => b.quantity - a.quantity);

      // Take top 10 books with maximum quantity
      const topBooks = booksArray.slice(0, 10);

      // Prepare data for chart
      const labels = topBooks.map(book => book.name);
      const data = topBooks.map(book => book.quantity);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Top 10 Books Purchased',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.7)', // Example color
          },
        ],
      };

      if (chartRef.current) {
        if (chartRef.current.chartInstance) {
          chartRef.current.chartInstance.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartRef.current.chartInstance = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Top 10 Books Purchased',
                font: {
                  size: 30,
                  weight: 'bold',
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Quantity Purchased',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Books',
                },
              },
            },
          },
        });
      }
    };

    if (purchases.length > 0) {
      calculateTopBooks();
    }

    // Clean up on component unmount
    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, [purchases]);

  return <canvas ref={chartRef} />;
};

export default ChartTopBooks;
