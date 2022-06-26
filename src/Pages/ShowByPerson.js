import React,{useState,useEffect} from "react";
import '../Css/ShowByPerson.css';
import axios from 'axios';
import userImg from '../images/user.png'
import AddChildTransaction from "./AddChildTransaction";
function ShowByPerson(props){
  const[contact,setContact]=useState([]);
useEffect(()=>{
  axios({
    method: 'get',
    url: `https://money-track-project.herokuapp.com//transactions/child_transactions/${localStorage.getItem('parent')}`,
    headers: {
    //  'Authorization': `bearer ${token}`,
     'bearer': localStorage.getItem('bearer'),
     'user-id': localStorage.getItem('user-id'),
    'Content-Type': 'application/json'
    }, 
  }).then((response) => {
    setContact(response.data.results); 
    }
    )
.catch((error) => {console.log('error', error.response.data)

  })
},[])

  const[newChildTransaction,setNewChildTransaction]=useState(false);
    const onDelete=(e)=>{
        e.preventDefault();
        props.setShowPersonDetail(false);
        var myHeaders = new Headers();
        myHeaders.append("bearer",localStorage.getItem('bearer'));
        myHeaders.append("user-id", localStorage.getItem('user-id'));
  
        var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
        };
  
        fetch(`https://money-track-project.herokuapp.com//transactions/transactions/${e.target.value}`, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      }

return(
  <div className='per_popup'>
<div className="per_Container">
<div className="title">
<img src={(props.Personal2.image!==null)?props.Personal2.image:userImg} alt="" className="user-img"/>
<span style={{marginLeft:"10px"}}>{props.Personal2.name}</span>
<span className='right'onClick={()=>props.setShowPersonDetail(false)}>cancel</span>
</div>
<div className="Child_btn">
<button className='newButton' onClick={()=>setNewChildTransaction(true)}>New Transaction</button>
<button className='deleteButton' value={props.Personal.idencode} onClick={onDelete}>Delete</button>
<span className="forTotal">Total Amount: <span style={{color:props.Personal.type===200?"red":"green"}}>&#8377; {props.Personal.amount}</span></span>
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
      {contact.map((con)=>(
        <tr key={con.idencode}>
          <td data-label="Amount">&#8377; {con.amount}</td>
          <td data-label="Due Date">{con.date}</td>
          <td data-label="Note">{con.note}</td>
          <td data-label="Action"><button  className="deleteButton">Delete</button></td>
        </tr>
      ))}
        
       
      </tbody>
      
    </table>

  

    </div>
</div>

</div>
{newChildTransaction && <AddChildTransaction setNewChildTransaction={setNewChildTransaction} personal2={props.Personal2} personal={props.Personal}/>}
</div>
)
}
export default ShowByPerson;