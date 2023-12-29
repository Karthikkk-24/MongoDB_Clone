import axios from "axios";
import React, { useEffect } from "react";

export default function Main() {
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get(
        "http://localhost:3000/getAllDatabaseList"
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleConnectClick = () => {
    try {
        
      const textarea = document.querySelector('textarea[name="content"]');
      const uri = textarea ? textarea : "";

      axios
        .post("http://localhost:3000/connectToHost/", { uri })
        .then((response) => {
          console.log("Connection successful!", response.data);
          // You can add more logic here if needed
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
            id=""
            placeholder="mongodb://localhost:27017"
            cols={30}
            rows={10}
          >
            mongodb://localhost:27017
          </textarea>
          <button onClick={handleConnectClick}>Connect</button>
        </div>
      </div>
    </>
  );
}
