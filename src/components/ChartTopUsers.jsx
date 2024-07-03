import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartTopUsers = ({ users }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const calculateTopUsers = () => {
      // Calculate total quantity of books purchased for each user
      const usersWithTotalPurchases = users.map(user => {
        const totalQuantity = user.purchases.reduce((acc, purchase) => acc + purchase.quantity, 0);
        return {
          username: user.username,
          totalQuantity: totalQuantity,
        };
      });

      // Sort users by total quantity in descending order
      usersWithTotalPurchases.sort((a, b) => b.totalQuantity - a.totalQuantity);

      // Take top 5 users with maximum total quantity
      const topUsers = usersWithTotalPurchases.slice(0, 5);

      // Prepare data for chart
      const labels = topUsers.map(user => user.username);
      const data = topUsers.map(user => user.totalQuantity);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Top Users with Maximum Books Purchased',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.7)', // Example color
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
                text: 'Top Users with Maximum Books Purchased',
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
                  text: 'Number of Books Purchased',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Users',
                },
              },
            },
          },
        });
      }
    };

    calculateTopUsers();

    // Clean up on component unmount
    return () => {
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, [users]); // Watch for changes in users prop

  return <canvas ref={chartRef} />;
};

export default ChartTopUsers;
