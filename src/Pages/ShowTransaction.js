import React, { useEffect,useState } from "react";
import '../Css/ShowTransaction.css';
import { basic_url } from '../common/constant';
function ShowTranction(props){
    const[income,setIncome]=useState([]);
    

    const ShowPerson=(idencode,contact_details,amount,status,type,child_transaction)=>{
      localStorage.setItem('parent',idencode);
      props.setShowPersonDetail(true);
      props.onShowPersonal2(contact_details)
      var coData={amount,type,idencode,child_transaction,status}
      props.onShowPersonal(coData);
      
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
  
        fetch(`${basic_url}/transactions/transactions/?type=${props.type}&contact=${props.contactId}&date=&upcoming=`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log('haaai',result);
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
          {/* <th><label>Note</label></th> */}
          <th><label>Paid Amount</label></th>
        </tr>
      </thead>
      <tbody>
        {income.map((con)=>(
        <tr key={con.idencode} onClick={()=>ShowPerson(con.idencode,con.contact_details,con.amount,con.status,con.type,con.child_transactions)}>
      <td data-label="Name">{con.contact_details.name}</td>
          <td data-label="Amount" style={{color:con.type===200?"red":"green"}}>&#8377; {con.amount}</td>
          <td data-label="Due Date">{con.last_date}</td>
          {/* <td data-label="Note">{con.note}</td> */}
          <td data-label="Paid Amount">&#8377; {con.child_transactions.amount?con.child_transactions.amount:0}<span style={{fontSize:"10px"}}>({con.child_transactions.count})</span></td>
          {/* <td data-label="Action"><button onClick={()=>ShowPerson(con.idencode,con.contact_details,con.amount,con.type)} className="btn-invoice">View Details</button></td> */}
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