import React, { useState, useEffect } from 'react';
import '../Css/AddTransaction.css';
import { FaWindowClose } from 'react-icons/fa';
import { basic_url } from '../common/constant';
import axios from 'axios';
function AddTransaction(props) {
  const [contact, setContact] = useState([]);
  const [transaction, setTransaction] = useState({
    contact: "",
    amount: "",
    note: "",
    lastDate: "",
    type: "100"
  });
  const handleChange = (e) => {
    setTransaction({
      ...transaction, [e.target.name]: e.target.value
    });
  }
  useEffect(() => {
    axios({
      method: 'get',
      url: `${basic_url}/accounts/contact/list/?limit=1000&offset=''`,
      headers: {
        //  'Authorization': `bearer ${token}`,
        'bearer': localStorage.getItem('bearer'),
        'user-id': localStorage.getItem('user-id'),
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log('contact', response)
      setContact(response.data.results);
    }
    )
      .catch((error) => {
        console.log('error', error.response.data)

      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(transaction)

    var myHeaders = new Headers();
    myHeaders.append("bearer", localStorage.getItem('bearer'));
    myHeaders.append("user-id", localStorage.getItem('user-id'));
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "contact": transaction.contact,
      "amount": transaction.amount,
      "note": transaction.note,
      "last_date": transaction.lastDate,
      "type": transaction.type
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${basic_url}/transactions/transactions/`, requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    setTransaction(
      {
        contact: "",
        amount: "",
        note: "",
        lastDate: "",
        type: "100"
      }
    )
  }

  const Cancel = (e) => {
    e.preventDefault()
    props.setNewTransaction(false)
  }
  return (
    <div className='popup'>
      <div className='popupinner'>
        <div >
          <div className="signupContainer">
            <div className="title"><span>Add Transaction </span>
              <span className='TransactionRight' onClick={Cancel}><FaWindowClose /></span>
            </div>
            <div className="content">
              <form>
                <div className="user-details">
                  <div className="input-box">
                    <span className="details">Contact</span>
                    <select className='dropdown' name="contact" value={transaction.contact} onChange={handleChange} id="cars">
                      <option>Select a contact</option>
                      {contact.map((con) => (
                        <option key={con.idencode} value={con.idencode} >{con.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="input-box">
                    <span className="details">Amount</span>
                    <input type="number" placeholder="Enter Amount" name="amount" value={transaction.amount} onChange={handleChange} required />
                  </div>
                  <div className="input-box">
                    <span className="details">Note</span>
                    <input type="text" placeholder="Enter any notes" name="note" value={transaction.note} onChange={handleChange} required />
                  </div>
                  <div className="input-box">
                    <span className="details">Last Date</span>
                    <input type="date" placeholder="Enter Dtae" name="lastDate" value={transaction.lastDate} onChange={handleChange} required />
                  </div>
                  <div className="input-box">
                    <span className="details">Type</span>
                    <select className='dropdown' name="type" value={transaction.type} onChange={handleChange} >
                      <option value="100">Income</option>
                      <option value="200">Expense</option>
                    </select>
                  </div>
                </div>
                <div className="button" onClick={handleSubmit}>
                  <input type="submit" value="Add" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddTransaction;