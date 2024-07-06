
// ChartComponentB.jsx

import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const ChartComponentB = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get('https://book-master-backend-new-1.onrender.com/api/auth/books/book');
        const books = response.data.books;

        // Calculate total books per category
        const categories = {};
        books.forEach(book => {
          const category = book.category;
          if (categories[category]) {
            categories[category] += 1;
          } else {
            categories[category] = 1;
          }
        });

        // Prepare data for chart
        const chartData = {
          labels: Object.keys(categories),
          datasets: [
            {
              label: 'Total Books per Category',
              data: Object.values(categories),
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
          ],
        };

        
        if (chartRef.current) {
          
          if (chartRef.current.chartInstance) {
            chartRef.current.chartInstance.destroy();
          }

          
          const ctx = chartRef.current.getContext('2d');
          chartInstanceRef.current = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Total Books per Category',
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
                    text: 'Number of Books',
                    font: {
                      size: 13,
                      weight: 'bold',
                    },
                  },
                },
                x: {
                  title: {
                    display: true,
                    text: 'CATEGORIES',
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
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();

    // Clean up on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default ChartComponentB;

