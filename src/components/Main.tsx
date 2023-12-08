import React from "react";

export default function Main() {
  return (
    <>
      <div className="new_connection_container">
        <div className="split_section">
          <div className="left">
            <div className="new_connection_container">
              <div className="heading">New Connection</div>
              <div className="sub_heading">Create a new connection</div>
              <div className="new_connection_form"></div>
            </div>
          </div>
          <div className="right">
            <div className="favorite">
              <div className="icon">
			  <i className="fa-solid fa-bullseye"></i>
			  </div>
              <div className="text"></div>
            </div>
          </div>
        </div>
        <div className="content_container">
            <label htmlFor="">URI</label>
            <textarea name="content" id="" cols="30" rows="10"></textarea>
        </div>
      </div>
    </>
  );
}
