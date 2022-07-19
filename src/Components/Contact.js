import React,{useEffect} from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import search from '../images/search.png';
import userImg from '../images/user.png';
function Contact(props) {
    useEffect(()=>{
            
    },[props.contactList])
    return (
        <div className="menu-items">
            <ul className="logout-mode">
                <div className="contactMode">
                    <span className="contacts">Contacts</span>
                    <div className="mode-toggle">
                        <div onClick={props.addContact} className='plus'><FaPlusCircle /></div>
                    </div>
                </div>
            </ul>
            <div className='contactSearch'>
                <img src={search} alt="" />
                <input className='ContactSearchBox' type="text" name="contactName" onChange={props.searchContact} placeholder="Find a Person..." />
            </div>
            <ul className="nav-links">
                {props.contactList.map((con) => (
                    <li className="mode" key={con.idencode} onClick={() => (props.setContactId(con.idencode), props.setSidebar(false))}><a href='#'>
                        <i className="uil uil-estate"></i>
                        <div className='contactdetails'>
                            <span className="link-name">{con.name}</span>
                            <div className='Contact_inc_exp'>
                                <span style={{ color: "black" }}>Balance: <span style={{ color: `${con.transactions_detail.type === 100 ? "darkgreen" : "red"}` }}>&#8377;{con.transactions_detail.amount ? con.transactions_detail.amount : 0}</span></span>
                            </div>
                        </div>
                    </a>
                        <div className="mode-toggle">
                            <img src={(con.image !== null) ? con.image : userImg} alt="" className="user-img" />
                        </div></li>
                ))}
                <div>{props.loading}</div>
            </ul>
        </div>
    );
}

export default Contact;