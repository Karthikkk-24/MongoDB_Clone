import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import './assets/css/General.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import Something from './components/Something';

function App() {
  
  return (
    <>
      <div className='main_container'>
        <div className="left_container">
          <Sidebar />
        </div>
        <div className="right_container">
          <Router>
            <Routes>
              <Route path="/" Component={Main} />
              <Route path="/main" Component={Something} />
            </Routes>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
