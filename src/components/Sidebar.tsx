import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Serverport from "./Serverport";

export default function Sidebar({ globalData, updateGlobalData }) {
  const [isConnected, setIsConnected] = useState(false);
  const databaseElements = [];
  useEffect(() => {
    // Retrieve the value of 'connect' from localStorage
    const connectFlag = localStorage.getItem('connect');
    // Update state based on the presence of 'connect' flag
    setIsConnected(connectFlag === 'true');

    // Send a request when the component is mounted
    sendRequest();
  }, []);

  useEffect(() => {
    console.log('globalData in Sidebar:', globalData);
    // Perform actions with globalData
  }, [globalData]);

  const sendRequest = async () => {
    try {
      const response = await axios.get(`${Serverport}/getAllDatabaseList`);
      // console.log('Response from the server:', response.data);

      // Update globalData with the response data
      updateGlobalData(response.data);
      

      for (let i = 0; i < globalData.length; i++) {
        console.log(i)
        databaseElements.push(
          <div key={i} className="database" style={{ color: 'white' }}>
            {globalData[i]}
          </div>
        );
      }
      
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <>
      <div className="navbar_container">
        <Navbar />
      </div>
      <div className="sidebar_container">
        {isConnected ? (
          // Render content when 'connect' flag is present
          <div>
            <div className="new_database">
              Databases <span className="icon"><i className="fa-solid fa-plus"></i></span>
            </div>
            <div className="search_connection">
              <input
                type="text"
                placeholder="Search..."
                
              />
            </div>
            <div className="database" style={{ color: 'white' }}>
              {/* Check if globalData is an array before mapping */}
              {databaseElements}
            </div>
            {/* Add other content as needed */}
          </div>
        ) : (
          // Render content when 'connect' flag is not present
          <div className="connections">
            <div className="connection saved_connections">
              <span className="icon"><i className="fa-solid fa-bullseye"></i></span>
              <div className="text">Saved Connections</div>
            </div>
            <div className="connection recent_connections">
              <span className="icon"><i className="fa-solid fa-clock-rotate-left"></i></span>
              <div className="text">Recent Connections</div>
            </div>
            <div className="connection last_connected">
              <span className="icon"><i className="fa-solid fa-plus"></i></span>
              <div className="text">Other Connections</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
