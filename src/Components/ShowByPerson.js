import React, { useState, useEffect } from "react";
import '../Css/ShowByPerson.css';
import { FaWindowClose, FaTrash, FaPlus } from 'react-icons/fa';
import { basic_url } from '../common/constant';
import axios from 'axios';
import userImg from '../images/user.png'
import AddChildTransaction from "../Components/AddChildTransaction";
function ShowByPerson(props) {
  const [contact, setContact] = useState([]);
  useEffect(() => {
    axios({
      method: 'get',
      url: `${basic_url}/transactions/child_transactions/${localStorage.getItem('parent')}`,
      headers: {
        //  'Authorization': `bearer ${token}`,
        'bearer': localStorage.getItem('bearer'),
        'user-id': localStorage.getItem('user-id'),
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      setContact(response.data.results);
      console.log("hai2", response.data.results)
    }
    )
      .catch((error) => {
        console.log('error', error.response.data)

      })
  }, [setNewChildTransaction])
  const completeTransaction = (e) => {
    setNewChildTransaction(true);
    setCompleted(true);
  }
  const newCTransaction = (e) => {
    setNewChildTransaction(true);
    setCompleted(false);
  }
  const [Completed, setCompleted] = useState(false);
  const [newChildTransaction, setNewChildTransaction] = useState(false);
  const onDelete = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("bearer", localStorage.getItem('bearer'));
    myHeaders.append("user-id", localStorage.getItem('user-id'));
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${basic_url}/transactions/transactions/${id}`, requestOptions)
      .then(response => {response.json();
      props.setShowPersonDetail(false)})
      .then(result => console.log(result))
      .catch(error => console.log('error', error));  
  }

  return (
    <div className='per_popup'>
      <div className="per_Container">
        <div className="title">
          <img src={(props.Personal2.image !== null) ? props.Personal2.image : userImg} alt="" className="user-img" />
          <span style={{ marginLeft: "10px" }}>{props.Personal2.name}</span>
          <span className='right' onClick={() => props.setShowPersonDetail(false)}><FaWindowClose /></span>
        </div>
        <div className="Child_btn">
          {!(props.Personal.status === 300) && <>
            <button className='actionButton' style={{ background: "rgba(0, 55, 255, 0.767)" }} onClick={newCTransaction}><FaPlus /></button>
            <button className='actionButton' style={{ background: "rgba(0, 128, 0, 0.6)", marginLeft: "10px", marginRight: "10px" }} onClick={completeTransaction}>Completed</button></>}
          <button className='actionButton' style={{ background: "rgba(255, 0, 0, 0.664)"}} onClick={() => onDelete(props.Personal.idencode)}><FaTrash /></button>
          <span className="forTotal">Total Amount: <span style={{ color: props.Personal.type === 200 ? "red" : "green" }}>&#8377; {props.Personal.amount}</span></span>
          <br />
          <span className="forTotal">Balance Amount: <span >&#8377; {props.Personal.amount - props.Personal.child_transaction.amount}</span></span>
        </div>
        <div className="content">
          <div className="container" >
            <table>
              <thead>
                <tr>
                  <th><label>Amount</label></th>
                  <th><label>Date</label></th>
                  <th><label>Note</label></th>
                  <th><label>Action</label></th>
                </tr>
              </thead>
              <tbody>
                {contact.map((con) => (
                  <tr key={con.idencode}>
                    <td data-label="Amount">&#8377; {con.amount}</td>
                    <td data-label="Due Date">{con.date}</td>
                    <td data-label="Note">{con.note}</td>
                    <td data-label="Action"><button style={{ background: "rgba(255, 0, 0, 0.73)", marginLeft: "10px" }} onClick={() => onDelete(con.idencode)} className="actionButton">Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {newChildTransaction && <AddChildTransaction setShowPersonDetail={props.setShowPersonDetail} Completed={Completed} balance={props.Personal.amount - props.Personal.child_transaction.amount} setNewChildTransaction={setNewChildTransaction} personal2={props.Personal2} personal={props.Personal} />}
    </div>
  )
}
export default ShowByPerson;