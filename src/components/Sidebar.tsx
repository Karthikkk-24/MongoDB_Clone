import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function Sidebar() {
  // Use state to track the presence of 'connect' flag
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Retrieve the value of 'connect' from localStorage
    const connectFlag = localStorage.getItem('connect');
    console.log('connect from localStorage:', connectFlag);

    // Update state based on the presence of 'connect' flag
    setIsConnected(connectFlag === 'true');
  }, []);

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
