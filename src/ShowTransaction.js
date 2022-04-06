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

<div className="DisplayTable">
		<tr>
			<th><div className="h1table">Name</div></th>
			<th><div className="h1table">Amount</div></th>
			<th><div className="h1table">Note</div></th>
			<th><div className="h1table">Last Date</div></th>
		</tr>
  {income.map((con)=>(
        <tr className="table-row" key={con.idencode} onClick={()=>ShowPerson(con.idencode)}>
          <td >{con.contact_details.name}</td>
          <td className="col col-2" style={{color:"rgba(104, 11, 11, 0.907)",fontWeight:"bold"}}> &#8377; {con.amount} </td>
          <td className="col col-3" >{con.note}</td>
          <td className="col col-4" >{con.last_date}</td>
        </tr>
        ))}
        
  </div>
  <div className="switchbutton">
        <button className="nextbtn" disabled={previous===null?true:false} value={previous} onClick={onSwitchPage}>&#8592;Previous</button>
        <button className="nextbtn" disabled={next===null?true:false} value={next} onClick={onSwitchPage}>Next&#8594;</button>
      </div>


      {/* <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Name</div>
          <div className="col col-2">Amount</div>
          <div className="col col-3">Note</div>
          <div className="col col-4">LastDate</div>
        </li>
        {income.map((con)=>(
        <li className="table-row" key={con.idencode} onClick={()=>ShowPerson(con.idencode)}>
          <div className="col col-1" >{con.contact_details.name}</div>
          <div className="col col-2" >{con.amount}</div>
          <div className="col col-3" >{con.note}</div>
          <div className="col col-4" >{con.last_date}</div>
        </li>
        ))}
        <div class="switchbutton">
        <button disabled={previous===null?true:false} value={previous} onClick={onSwitchPage}>Previous</button>
        <button disabled={next===null?true:false} value={next} onClick={onSwitchPage}>next</button>
      </div>
      </ul> */}
    </div>
    )
}
export default ShowTranction;