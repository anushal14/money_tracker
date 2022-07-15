import React, { useState, useEffect } from "react";
import './Dropdown.css';
function Dropdown(props) {
  const [value, setValue] = useState()
  const [show, setShow] = useState(false)
  const [dropdownValue, setDropdownValue] = useState([])
  useEffect(() => {
    setDropdownValue(props.ddData);
    setValue(props.ddData[0].title)
  }, [])
  const handleChange = (ddvalue, value) => {
    setValue(ddvalue);
    setShow(false);
    props.setTypeReturn(value)
  }
  const handleChangeStatus = (ddvalue, value) => {
    setValue(ddvalue);
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
      <ul className="dropdown-list" hidden={!show}>
        {
          dropdownValue.map((ddvalue) => (
            <li
              className="option"
              onClick={() => props.DropdownData ? handleChange(ddvalue.title, ddvalue.value) : handleChangeStatus(ddvalue.title, ddvalue.value)}
              style={{ color: ddvalue.color }}
            >
              {ddvalue.title}
            </li>
          ))}
      </ul>
    </div>
  );
}
export default Dropdown;