import React, { useEffect, useState } from "react";
import '../Css/ShowTransaction.css';
import { basic_url } from '../common/constant';
function ShowTranction(props) {
  const [income, setIncome] = useState([]);
  const ShowPerson = (idencode, contact_details, amount, status, type, child_transaction) => {
    localStorage.setItem('parent', idencode);
    props.setShowPersonDetail(true);
    props.onShowPersonal2(contact_details)
    var coData = { amount, type, idencode, child_transaction, status }
    props.onShowPersonal(coData);
  }
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("bearer", localStorage.getItem('bearer'));
    myHeaders.append("user-id", localStorage.getItem('user-id'));
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`${basic_url}/transactions/transactions/?type=${props.type}&contact=${props.contactId}&date=&upcoming=&status=${props.statusType}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('haaai', result);
        setIncome(result.results);
        setNext(result.next);
        setPrevious(result.previous);
      })
      .catch(error => console.log('error', error));
  }, [props.condition, props.type, props.statusType]);

  const onSwitchPage = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("bearer", localStorage.getItem('bearer'));
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
  const [showNote, setShowNote] = useState("")
  const checkNote = (id) => {
    if (showNote === id) {
      setShowNote("");
    }
    else
      setShowNote(id);
  }
  const findStatus = (status) => {
    if (status === 300)
      return "green"
    else if (status === 200)
      return "yellow"
    else
      return "red"
  }

  return (
    <div className="container" >
      <table>
        <thead>
          <tr>
            <th><label>Name</label></th>
            <th><label>Amount</label></th>
            <th><label>Due Date</label></th>
            {/* <th><label>Note</label></th> */}
            <th><label>Paid Amount</label></th>
            <th><label>Action</label></th>
          </tr>
        </thead>
        {income.map((con) => (
          <tbody>
            <tr key={con.idencode} >
              <td data-label="Name" className="StatusLine"><div style={{ backgroundColor: findStatus(con.status) }} className="statusDot"></div><div>{con.contact_details.name}</div></td>
              <td data-label="Amount" style={{ color: con.type === 200 ? "red" : "green" }}>&#8377; {con.amount}</td>
              <td data-label="Due Date">{con.last_date}</td>
              {/* <td data-label="Note">{con.note}</td> */}
              <td data-label="Paid Amount">&#8377; {con.child_transactions.amount ? con.child_transactions.amount : 0}<span style={{ fontSize: "10px" }}>({con.child_transactions.count})</span></td>
              <td data-label="Action"><button className="btn-invoice" style={{ marginRight: "0.5rem" }} onClick={() => checkNote(con.idencode)}>Note</button>
                <button onClick={() => ShowPerson(con.idencode, con.contact_details, con.amount, con.status, con.type, con.child_transactions)} className="btn-invoice">Details</button>
              </td>
            </tr>
            {showNote === con.idencode && <tr className="noteTr">
              <td style={{ paddingLeft: "35px", fontSize: "15px" }} colSpan={5}>{con.note}</td>
            </tr>}
          </tbody>
        ))}
      </table>
      <div className="switchbutton">
        <button className="nextbtn" disabled={previous === null ? true : false} value={previous} onClick={onSwitchPage}>&#8592;Previous</button>
        <button className="nextbtn" disabled={next === null ? true : false} value={next} onClick={onSwitchPage}>Next&#8594;</button>
      </div>
    </div>
  )
}
export default ShowTranction;