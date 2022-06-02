import React,{useState} from "react";
import '../Css/ShowByPerson.css';
import userImg from '../images/user.png'
import AddChildTransaction from "./AddChildTransaction";
function ShowByPerson(props){

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
        <tr >
          <td data-label="Amount">&#8377; 333</td>
          <td data-label="Due Date">fffff</td>
          <td data-label="Note">tyyyyy</td>
          <td data-label="Action"><button  className="deleteButton">Delete</button></td>
        </tr>
        <tr >
          <td data-label="Amount">&#8377; 333</td>
          <td data-label="Due Date">fffff</td>
          <td data-label="Note">tyyyyy</td>
          <td data-label="Action"><button  className="deleteButton">Delete</button></td>
        </tr>
        <tr >
          <td data-label="Amount">&#8377; 333</td>
          <td data-label="Due Date">fffff</td>
          <td data-label="Note">tyyyyy</td>
          <td data-label="Action"><button  className="deleteButton">Delete</button></td>
        </tr>
        <tr >
          <td data-label="Amount">&#8377; 333</td>
          <td data-label="Due Date">fffff</td>
          <td data-label="Note">tyyyyy</td>
          <td data-label="Action"><button  className="deleteButton">Delete</button></td>
        </tr>
        <tr >
          <td data-label="Amount">&#8377; 333</td>
          <td data-label="Due Date">fffff</td>
          <td data-label="Note">tyyyyy</td>
          <td data-label="Action"><button  className="deleteButton">Delete</button></td>
        </tr>
        <tr >
          <td data-label="Amount">&#8377; 333</td>
          <td data-label="Due Date">fffff</td>
          <td data-label="Note">tyyyyy</td>
          <td data-label="Action"><button  className="deleteButton">Delete</button></td>
        </tr>
        <tr >
          <td data-label="Amount">&#8377; 333</td>
          <td data-label="Due Date">fffff</td>
          <td data-label="Note">tyyyyy</td>
          <td data-label="Action"><button  className="deleteButton">Delete</button></td>
        </tr>
     
      </tbody>
      
    </table>

  

    </div>
</div>

</div>
{newChildTransaction && <AddChildTransaction setNewChildTransaction={setNewChildTransaction} personal2={props.Personal2.name} personal={props.Personal.type}/>}
</div>
)
}
export default ShowByPerson;