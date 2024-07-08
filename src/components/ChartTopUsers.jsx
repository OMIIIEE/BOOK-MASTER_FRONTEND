import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartTopUsers = ({ users }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const calculateTopUsers = () => {
      
      const usersWithTotalPurchases = users.map(user => {
        const totalQuantity = user.purchases.reduce((acc, purchase) => acc + purchase.quantity, 0);
        return {
          username: user.username,
          totalQuantity: totalQuantity,
        };
      });

      usersWithTotalPurchases.sort((a, b) => b.totalQuantity - a.totalQuantity);

     
      const topUsers = usersWithTotalPurchases.slice(0, 5);

      
      const labels = topUsers.map(user => user.username);
      const data = topUsers.map(user => user.totalQuantity);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Top Users with Maximum Books Purchased',
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.7)', 
          },
        ],
      };

      if (chartRef.current) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');
        chartInstanceRef.current = new Chart(ctx, {
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
                  font: {
                    size: 13,
                    weight: 'bold',
                  },
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'USERS',
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

    calculateTopUsers();

   
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [users]); 

  return <canvas ref={chartRef} />;
};

export default ChartTopUsers;
