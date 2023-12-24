import React from 'react';
import Navbar from './Navbar';

export default function Sidebar() {
  return (
    <>
      <div className="navbar_container">
        <Navbar />
      </div>
      <div className="sidebar_container">
        <div className="new_connection">
            New Connection <span className="icon"><i className="fa-solid fa-plus"></i></span>
        </div>
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
      </div>
    </>
  )
}
