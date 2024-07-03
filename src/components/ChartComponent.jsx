import React from "react";

const ChartComponent = () => {
  return (
    <div className="chart-container flex flex-wrap justify-center">
      <iframe
        style={{
          background: '#FFFFFF',
          border: 'none',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
          margin: '10px',
          flex: '1 0 calc(50% - 20px)'
        }}
        width="640"
        height="480"
        src="https://charts.mongodb.com/charts-dummy-admin-user-oauvbvw/embed/charts?id=667bd5cc-5447-40ba-81fe-a4da6d14f6f3&maxDataAge=60&theme=light&autoRefresh=true"
        frameBorder="0"
        allowFullScreen
        title="MongoDB Chart 1"
      ></iframe>
      
     
    
      <iframe
        style={{
          background: '#FFFFFF',
          border: 'none',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
          margin: '10px',
          flex: '1 0 calc(50% - 20px)'
        }}
        width="640"
        height="480"
        src="https://charts.mongodb.com/charts-dummy-admin-user-oauvbvw/embed/charts?id=667bd7c2-e2e9-4ee9-80ba-c6cf8b7ae74e&maxDataAge=60&theme=light&autoRefresh=true"
        frameBorder="0"
        allowFullScreen
        title="MongoDB Chart 3"
      ></iframe>
       <iframe
        style={{
          background: '#FFFFFF',
          border: 'none',
          borderRadius: '2px',
          boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
          margin: '10px',
          flex: '1 0 calc(50% - 20px)'
        }}
        width="640"
        height="480"
        src="https://charts.mongodb.com/charts-dummy-admin-user-oauvbvw/embed/charts?id=667bd2b0-df31-44ed-8735-a0a4a5fa6918&maxDataAge=60&theme=light&autoRefresh=true"
        frameBorder="0"
        allowFullScreen
        title="MongoDB Chart 2"
      ></iframe>
    </div>
  );
};

export default ChartComponent;
