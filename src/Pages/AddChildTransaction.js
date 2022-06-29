import React,{useState,useEffect} from 'react';
import { basic_url } from '../common/constant';
import axios from 'axios';
import '../Css/AddTransaction.css'
function AddChildTransaction(props){

  const[transaction,setTransaction]=useState({
    contact: props.personal2,
    parentTransaction:props.personal.idencode,
    amount: "",
    note: "",
    lastDate:"",
    type:props.personal.type
    });
    const handleChange=(e)=>{
      setTransaction({
          ...transaction,[e.target.name]:e.target.value
  });
}
const[bearer,setBearer]=useState();
    const[userId,setUserId]=useState();
    useEffect(()=>{
      setBearer(localStorage.getItem('bearer'));
      setUserId(localStorage.getItem('user-id'))
    })
    const handleSubmit=(e)=>{
      e.preventDefault();
      props.setNewChildTransaction(false)
      console.log(transaction)
      const payload = {
        contact: transaction.contact.idencode,
        parent_transaction: transaction.parentTransaction,
        amount: transaction.amount,
        note: transaction.note,
        last_date:transaction.lastDate,
        type:transaction.type
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
        console.log("hai",response); 
        }
        )
    .catch((error) => {console.log('error', error.response.data)
    
      })

    }

    const Cancel=(e)=>{
        e.preventDefault()
        props.setNewChildTransaction(false)
    }
    return(
        <div className='popup'>
            <div className='popupinner'>
            
        <div >
        
        <div className="signupContainer">
        <div className="title"><span>Add Transaction </span>
        <span className='right' onClick={Cancel}>cancel</span>
        </div>
        
        <div className="content">
          <form>
            <div className="user-details">
              {/* <div className="input-box">
                <span className="details">Contact</span>
                <input type="text" placeholder="Select contact" name="contact" value={transaction.contact} onChange={handleChange} required/>
              </div> */}
              <div className="input-box">
              <span className="details">Contact</span>
              <select className='dropdown' name="contact" value={transaction.contact.name} onChange={handleChange}  id="cars">
                <option>{props.personal2.name}</option>
              </select>
              </div>
            
              <div className="input-box">
                <span className="details">Amount</span>
                <input type="number" placeholder="Enter Amount" name="amount" value={transaction.amount} onChange={handleChange}  required/>
              </div>
              <div className="input-box">
                <span className="details">Note</span>
                <input type="text" placeholder="Enter any notes" name="note" value={transaction.note} onChange={handleChange} required/>
              </div>
              <div className="input-box">
                <span className="details">Last Date</span>
                <input type="date" placeholder="Enter Dtae" name="lastDate" value={transaction.lastDate} onChange={handleChange} required/>
              </div>
              <div className="input-box">
                <span className="details">Type</span>
                <select className='dropdown' name="type" value={transaction.type} onChange={handleChange} >
                {/* <option>Select a Type</option> */}
                 <option >{props.personal.type===100?"Income":"Expense"}</option>
                </select>
                
              </div>
            </div>
            
            <div className="button" onClick={handleSubmit}>
              <input type="submit" value="Add"/>
             
            </div>
          </form>
        </div>
        
      </div>
      </div>
      </div>
      </div>
      );
    }
    export default AddChildTransaction;