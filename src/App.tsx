import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import './assets/css/General.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Something from './components/Something';

function App() {
  const [globalData, setGlobalData] = useState('hello');

  const updateGlobalData = (newData) => {
    setGlobalData(newData);
  };

  return (
    <>
      <div className='main_container'>
        <div className="left_container">
          <Sidebar globalData={globalData} updateGlobalData={updateGlobalData} />
        </div>
        <div className="right_container">
          <Router>
            <Routes>
              <Route path="/" element={<Main globalData={globalData} />} />
              <Route path="/main" element={<Something globalData={globalData} />} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
