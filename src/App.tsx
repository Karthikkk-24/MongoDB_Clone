import './App.css';
import './assets/css/General.css';
import Main from './components/Main';
import Sidebar from './components/Sidebar';

function App() {

  return (
    <>
      <div className='main_container'>
        <div className="left_container">
            <Sidebar />
        </div>
        <div className="right_container">
            <Main />
        </div>
      </div>
    </>
  )
}

export default App
