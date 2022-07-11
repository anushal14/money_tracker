import React from "react";
import '../Css/Dialogue.css';
function Dialog({ onDialog, onLogout }) {
  return (
    <div className="dialoguePage" onClick={() => onDialog(false)}>
      <div className="dialogueBox">
        <h3 className="DialogueTitle">Log Out?</h3>
        <p className="DialoguePara">Are you sure want to log out?</p>
        <div className="dialogueButtons">
          <button className="DialogueCancel" onClick={() => onDialog(false)}>Cancel</button>
          <button className="DialogueLogout" onClick={onLogout}>Log out</button>
        </div>
      </div>
    </div>
  );
}
export default Dialog;