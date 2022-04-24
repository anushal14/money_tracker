import React, { useEffect,useState } from "react";
import './ShowTransaction.css';
function ShowTranction(props){
    const[income,setIncome]=useState([]);
    

    const ShowPerson=(id)=>{
      props.setShowPersonDetail(true);
      var myHeaders = new Headers();
      myHeaders.append("bearer", localStorage.getItem('bearer'));
      myHeaders.append("user-id", localStorage.getItem('user-id'));

      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

      fetch(`https://money-track-project.herokuapp.com//transactions/transactions/${id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
      
      props.onShowPersonal(result)
      props.onShowPersonal2(result.contact_details)
      })
      .catch(error => console.log('error', error));
    }

    const[next,setNext]=useState("");
    const[previous,setPrevious]=useState("");
    useEffect(()=>{
        var myHeaders = new Headers();
        myHeaders.append("bearer",localStorage.getItem('bearer'));
        myHeaders.append("user-id", localStorage.getItem('user-id'));
  
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
  
        fetch(`https://money-track-project.herokuapp.com//transactions/transactions/?type=${props.type}`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
        setIncome(result.results);
        setNext(result.next);
        setPrevious(result.previous);
        })
        .catch(error => console.log('error', error));
        },[props.condition,props.changeType]);


        const onSwitchPage=(e)=>{

          var myHeaders = new Headers();
        myHeaders.append("bearer",localStorage.getItem('bearer'));
        myHeaders.append("user-id", localStorage.getItem('user-id'));
  
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
  
        fetch(e.target.value, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
        setIncome(result.results);
        setPrevious(result.previous);
        setNext(result.next);
        })
        .catch(error => console.log('error', error));
        }

    

    return(
        <div className="container" >
  <table>
     <thead>
        <tr>
          <th><label>Name</label></th>
          <th><label>Amount</label></th>
          <th><label>Due Date</label></th>
          <th><label>Note</label></th>
          <th><label>Action</label></th>
        </tr>
      </thead>
      <tbody>
        {income.map((con)=>(
        <tr key={con.idencode}>
      <td data-label="Name">{con.contact_details.name}</td>
          <td data-label="Amount">&#8377; {con.amount}</td>
          <td data-label="Due Date">{con.last_date}</td>
          <td data-label="Note">{con.note}</td>
          <td data-label="Action"><button onClick={()=>ShowPerson(con.idencode)} className="btn-invoice">View Details</button></td>
        </tr>
      ))}
      </tbody>
      
    </table>

  <div className="switchbutton">
        <button className="nextbtn" disabled={previous===null?true:false} value={previous} onClick={onSwitchPage}>&#8592;Previous</button>
        <button className="nextbtn" disabled={next===null?true:false} value={next} onClick={onSwitchPage}>Next&#8594;</button>
      </div>

    </div>
    )
}
export default ShowTranction;