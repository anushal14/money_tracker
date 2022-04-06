import React from "react";
import './ShowByPerson.css';
function ShowByPerson(props){


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
    <div>
       
    <div className='popup'>
    
    <div className="price_table">
  


  <div className="package package_free"  >
  <div className="boom" onClick={()=>props.setShowPersonDetail(false)}>close</div>
    <h2 className='h2'>{props.Personal2.name}</h2>
    <div className="price">    <div className="big"> &#8377; {props.Personal.amount}</div></div>
    
      <li style={{fontSize:"18px",fontWeight:"bold"}}>Last Date : {props.Personal.last_date}</li>
      <li style={{fontSize:"18px",fontWeight:"bold"}}>Note : {props.Personal.note}</li>
    
    <button className='deleteButton' value={props.Personal.idencode} onClick={onDelete} >Delete</button>
  </div>
  
  </div>
</div> 
</div>
)
}
export default ShowByPerson;