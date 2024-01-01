import axios from "axios";
import React, { useEffect } from "react";
import Serverport from "./Serverport";
import { useNavigate } from 'react-router-dom';


export default function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(`${Serverport}/getAllDatabaseList`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function saveConnection(param: string) {
    try {
        const response = await axios.post(`${Serverport}/createDatabaseAndCollection`, param);
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
  }

  const handleConnectionSave = () => {
    const connectionText = document.getElementById("connectionText") as HTMLInputElement;
    if (connectionText.value != ''){
        console.log(connectionText.value);
        saveConnection(connectionText.value);
    } else {
      alert("Please enter a connection string !!");
    }
  };


  const handleConnectClick = () => {
    try {
      const textarea = document.querySelector('textarea[name="content"]');
      const uri = textarea ? textarea.textContent : "";
      // const navigate = useNavigate();

      axios
        .post("http://localhost:3000/connectToHost/", { uri })
        .then((response) => {
          console.log("Connection successful!", response.data);
          
          if(response.data.success){
            console.log('hello');
            navigate('/main');
          }
        })
        .catch((error) => {
          console.error("Connection failed", error);
        });
    } catch (error) {
      console.error("Error connecting to the server:", error);
    }
  };

  return (
    <>
      <div className="new_connection_container">
        <div className="split_section">
          <div className="left">
            <div className="main_container">
              <div className="heading">New Connection</div>
              <div className="sub_heading">Create a new connection</div>
              <div className="new_connection_form"></div>
            </div>
          </div>
          <div className="right">
            <div className="main_container">
              <div className="favorite">
                <div className="icon">
                  <i className="fa-solid fa-bullseye"></i>
                </div>
                <div className="text">Favorite</div>
              </div>
            </div>
          </div>
        </div>
        <div className="content_container">
          <label htmlFor="">URI</label>
          <textarea
            name="content"
            id="connectionText"
            placeholder="mongodb://localhost:27017"
            cols={30}
            rows={10}
          >
            mongodb://localhost:27017
          </textarea>
          <br />
          <div className="flex_row">
            <button className="save" onClick={handleConnectionSave}>Save</button>
            <button className="save_btn">Save & Connect</button>
            <button className="connection_btn" onClick={handleConnectClick}>
              Connect
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
