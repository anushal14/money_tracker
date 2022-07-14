import React, { useState } from "react";
import './Dropdown.css';
const fonts = [{ title: 'All Transaction', value: "", color: "" }, { title: 'Income', value: "100", color: "green" }, { title: 'Expense', value: "200", color: "red" }];
const statusData = [{ title: 'Select Status', value: "", color: "" }, { title: 'Initiated', value: "100", color: "red" }, { title: 'Ongoing', value: "200", color: "orange" }, { title: 'Completed', value: "300", color: "green" }];
function Dropdown(props) {
  const mainTitle = props.DropdownData ? "All Transaction" : "Select Status"
  const [value, setValue] = useState(mainTitle)
  const [show, setShow] = useState(false)

  const handleChange = (font, value) => {
    setValue(font);
    setShow(false);
    props.setTypeReturn(value)
  }
  const handleChangeStatus = (font, value) => {
    setValue(font);
    setShow(false);
    props.setStatusType(value)
  }

  const handleToggle = (e) => {
    e.target.focus();
    setShow(!show);
  }

  const handleBlur = (e) => {
    // firefox onBlur issue workaround
    if (e.nativeEvent.explicitOriginalTarget &&
      e.nativeEvent.explicitOriginalTarget === e.nativeEvent.originalTarget) {
      return;
    }

    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 200);
    }
  }

  return (
    <div className="dropdown-container">
      <label className="arrow">
        <input
          type="button"
          value={value}
          className="dropdown-btn"
          onClick={handleToggle}
          onBlur={handleBlur}
        />
      </label>
      {props.DropdownData ? <ul className="dropdown-list" hidden={!show}>
        {
          fonts.map((font) => (
            <li
              className="option"
              onClick={() => handleChange(font.title, font.value)}
              style={{ color: font.color }}
            >
              {font.title}
            </li>
          ))}
      </ul> : <ul className="dropdown-list" hidden={!show}>
        {
          statusData.map((font) => (
            <li
              className="option"
              onClick={() => handleChangeStatus(font.title, font.value)}
              style={{ color: font.color }}
            >
              {font.title}
            </li>
          ))}
      </ul>}
    </div>
  );
}
export default Dropdown;