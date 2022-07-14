import React, { useEffect, useState } from "react";
import './ContactDropdown.css';
function ContactDropdown(props) {
    const [value, setValue] = useState("Select a Contact")
    const [show, setShow] = useState(false)
    const [contact, setContact] = useState([])
    const handleChange = (contact, value) => {
        setValue(contact);
        setShow(false);
        props.setDropdownContact(value);
    }
    useEffect(() => {
        setContact(props.conta);
    })
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
        <div className="ContactDropdown-container">
            <label className="arrow">
                <textarea
                    type="button"
                    value={value}
                    className="dropdown-btn"
                    onClick={handleToggle}
                    onBlur={handleBlur}
                />
            </label>
            <ul className="dropdown-list" hidden={!show}>
                {
                    contact.map((con) => (
                        <li
                            className="option"
                            onClick={() => handleChange(con.name, con.idencode)}
                        >
                            {con.name}
                        </li>
                    ))}
            </ul>
        </div>
    );
}
export default ContactDropdown;