import './App.css';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {

  return (
    <>
      <div className='main_container'>
        <div className="left_container"></div>
        <div className="right_container">
            <Main />
        </div>
      </div>
    </>
  )
}

export default App
