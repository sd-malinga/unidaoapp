import React from "react";
 
const Popup = props => {
  return (
    <div className="popup-box" style={{color:'white'}}>
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;