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
                <div className="text"></div>
            </div>
            <div className="connection recent_connections">
                <span className="icon"></span>
                <div className="text"></div>
            </div>
            <div className="connection last_connected">
                <span className="icon"></span>
                <div className="text"></div>
            </div>
        </div>
      </div>
    </>
  )
}
