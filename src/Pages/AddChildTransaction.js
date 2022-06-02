import React,{useState,useEffect} from 'react';
import '../Css/AddTransaction.css'
function AddChildTransaction(props){

  const[transaction,setTransaction]=useState({
    contact: props.personal2,
    amount: "",
    note: "",
    lastDate:"",
    type:props.personal
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
      console.log(transaction)

//       var myHeaders = new Headers();
//       myHeaders.append("bearer", bearer);
//       myHeaders.append("user-id", userId);
//       myHeaders.append("Content-Type", "application/json");

//       var raw = JSON.stringify({
//       "contact": transaction.contact,
//       "amount": transaction.amount,
//       "note": transaction.note,
//       "last_date": transaction.lastDate,
//       "type": transaction.type
//     });

//     var requestOptions = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };

// fetch("https://money-track-project.herokuapp.com//transactions/transactions/", requestOptions)
//   .then(response => response.json())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
//   setTransaction(
//     {
//       contact: "",
//       amount: "",
//       note: "",
//       lastDate:"",
//       type:"100"
//    }
//    )
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
              <select className='dropdown' name="contact" value={transaction.contact} onChange={handleChange}  id="cars">
                <option>{props.personal2}</option>
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
                <option >{props.personal===100?"Income":"Expense"}</option>
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