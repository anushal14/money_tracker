import React, { useState, useEffect } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { basic_url } from '../common/constant';
import axios from 'axios';
import '../Css/AddTransaction.css'
function AddChildTransaction(props) {
  const amountValue = props.Completed ? props.balance : ""
  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth() + 1}-0${current.getDate()}`;
  const [transaction, setTransaction] = useState({
    contact: props.personal2,
    parentTransaction: props.personal.idencode,
    amount: amountValue,
    note: "",
    lastDate: date,
    type: props.personal.type
  });
  const handleChange = (e) => {
    setTransaction({
      ...transaction, [e.target.name]: e.target.value
    });
  }
  const [bearer, setBearer] = useState();
  const [userId, setUserId] = useState();
  useEffect(() => {
    setBearer(localStorage.getItem('bearer'));
    setUserId(localStorage.getItem('user-id'))
  })
  const [error, setError] = useState()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (transaction.amount > props.balance) {
      setError(`Amount should be in range of 0-${props.balance}`)
    }
    else if (transaction.amount === '0') {
      setError(`Amount should be greater than 0`)
    }
    else {
      
      console.log(transaction.lastDate)
      console.log("date", date)
      const payload = {
        contact: transaction.contact.idencode,
        parent_transaction: transaction.parentTransaction,
        amount: transaction.amount,
        note: transaction.note,
        last_date: transaction.lastDate,
        type: transaction.type
      }

      axios({
        method: 'post',
        url: `${basic_url}/transactions/transactions/`,
        data: payload,
        headers: {
          //  'Authorization': `bearer ${token}`,
          'bearer': bearer,
          'user-id': userId,
          'Content-Type': 'application/json'
        },
      }).then((response) => {
        console.log("hai", response);
        props.setNewChildTransaction(false)
        props.setShowPersonDetail(false)
      }
      )
        .catch((error) => {
          console.log('error', error.response.data)

        })
    }

  }

  const Cancel = (e) => {
    e.preventDefault()
    props.setNewChildTransaction(false)
  }
  return (
    <div className='popup'>
      <div className='popupinner'>
        <div >
          <div className="signupContainer">
            <div className="title"><span>Add Transaction </span>
              <span className='right' onClick={Cancel}><FaWindowClose /></span>
            </div>
            <div className="content">
              {!props.Completed &&
                <form>
                  <div className="user-details">
                    <div className="input-box">
                      <span className="details">Amount</span>
                      <input type="number" placeholder="Enter Amount" name="amount" value={transaction.amount} onChange={handleChange} required />
                      <div style={{ color: "red" }}>{error}</div>
                    </div>
                    <div className="input-box">
                      <span className="details">Note</span>
                      <input type="text" placeholder="Enter any notes" name="note" value={transaction.note} onChange={handleChange} required />
                    </div>
                    {/* <div className="input-box">
                      <span className="details">Date</span>
                      <input type="date" placeholder="Enter Dtae" name="lastDate" value={transaction.lastDate} readOnly required />
                    </div> */}
                  </div>
                  <div className="button" onClick={handleSubmit}>
                    <input type="submit" value="Add" />
                  </div>
                </form>}
              {props.Completed &&
                <form>
                  <div className="user-details">
                    <div className="input-box">
                      <span className="details">Note</span>
                      <input type="text" placeholder="Enter any notes" name="note" value={transaction.note} onChange={handleChange} required />
                    </div>
                    {/* <div className="input-box">
                      <span className="details">Date</span>
                      <input type="date" placeholder="Enter Dtae" name="lastDate" value={transaction.lastDate} readOnly required />
                    </div> */}
                  </div>
                  <div className="button" onClick={handleSubmit}>
                    <input type="submit" value="Add" />
                  </div>
                </form>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddChildTransaction;