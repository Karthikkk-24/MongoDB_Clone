import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Serverport from "./Serverport";
import Navbar from './Navbar';

export default function Sidebar({ globalData, updateGlobalData }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Retrieve the value of 'connect' from localStorage
    const connectFlag = localStorage.getItem('connect');
    // Update state based on the presence of 'connect' flag
    setIsConnected(connectFlag === 'true');

    // Send a request when the component is mounted
    sendRequest();
  }, [updateGlobalData]);

  useEffect(() => {
    console.log('globalData in Sidebar:', globalData);
    // Perform actions with globalData
  }, [globalData]);

  const sendRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getAllDatabaseList`);
      // console.log('Response from the server:', response.data);

      // Update globalData with the response data
      updateGlobalData(response.data);
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
            <div className="new_connection">
              Databases <span className="icon"><i className="fa-solid fa-plus"></i></span>
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
