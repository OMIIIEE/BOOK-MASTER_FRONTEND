import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const ChartTopBooks = ({ purchases }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const calculateTopBooks = () => {
      // Calculate total quantity purchased for each book
      const bookMap = new Map();
      purchases.forEach(purchase => {
        if (purchase.bookId && purchase.bookId._id) {
          const bookId = purchase.bookId._id;
          if (bookMap.has(bookId)) {
            bookMap.get(bookId).quantity += purchase.quantity;
          } else {
            bookMap.set(bookId, {
              name: purchase.bookId.name,
              quantity: purchase.quantity,
            });
          }
        }
      });


      const booksArray = Array.from(bookMap.values());
      booksArray.sort((a, b) => b.quantity - a.quantity);

      
      const topBooks = booksArray.slice(0, 10);

     
      const labels = topBooks.map(book => book.name);
      const data = topBooks.map(book => book.quantity);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Top 10 Books Purchased',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.7)', 
          },
        ],
      };

      if (chartRef.current) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
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
                  font: {
                    size: 13,
                    weight: 'bold',
                  },
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'BOOKS',
                  font: {
                    size: 13,
                    weight: 'bold',
                  },
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

   
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [purchases]);

  return <canvas ref={chartRef} />;
};

export default ChartTopBooks;
