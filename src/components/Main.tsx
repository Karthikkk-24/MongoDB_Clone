import React from "react";

export default function Main() {
  const handleConnectClick = () => {
    try {
      // Get the URI from the textarea
      const uri = document.querySelector('textarea[name="content"]').value;

      // Send a POST request to the Node.js server using jQuery AJAX
      $.ajax({
        url: "http://localhost:3000/connectToHost/",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ uri }),
        success: function (data) {
          console.log("Connection successful!", data);
          // You can add more logic here if needed
        },
        error: function (error) {
          console.error("Connection failed", error);
        },
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
          <textarea name="content" id="" cols={30} rows={10}>
            mongodb://localhost:27017
          </textarea>
          <button onClick={handleConnectClick}>Connect</button>
        </div>
      </div>
    </>
  );
}
