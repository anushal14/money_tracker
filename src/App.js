import React, { useState,useEffect} from 'react'
import { Link,Navigate } from 'react-router-dom';
import AddContacts from './AddContact';
import './App.css';
import {Container,Row,Col,Button,ListGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignOutAlt } from 'react-icons/fa';
import AddTransaction from './AddTransaction';
function App() {
  const[newContact,setNewContact]=useState(false);
  const[newTransaction,setNewTransaction]=useState(false);
  // const addNew=()=>setNewTransaction(true);
  const addContact=()=>setNewContact(!newContact);


  const[bearer,setBearer]=useState();
  const[userId,setUserId]=useState();

      useEffect(()=>{
      setBearer(localStorage.getItem('bearer'));
      setUserId(localStorage.getItem('user-id'));
    })

  const[contactList,setContactlist]=useState([])

  const addNewTransaction=()=>{
      setNewTransaction(true);
      var myHeaders = new Headers();
      myHeaders.append("bearer", bearer);
      myHeaders.append("user-id", userId);

      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };

      fetch("https://money-track-project.herokuapp.com/accounts/contact/", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);
      setContactlist(result.results);
      })
      .catch(error => console.log('error', error));
      }

  const[logout,setLogout]=useState(false);

  const onLogout=()=>{
      var myHeaders = new Headers();
      myHeaders.append("bearer",bearer);
      myHeaders.append("user-id", userId);

      var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
      };

      fetch("https://money-track-project.herokuapp.com//accounts/logout/", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
      localStorage.clear();
      setLogout(true);
      }



  const[income,setIncome]=useState([])

  const showTransaction=()=>{
      var myHeaders = new Headers();
      myHeaders.append("bearer",bearer);
      myHeaders.append("user-id", userId);

      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };

      fetch("https://money-track-project.herokuapp.com//transactions/transactions/?type=200", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);
      setIncome(result.results);
      })
      .catch(error => console.log('error', error));
      }

  const onDelete=(e)=>{
      e.preventDefault();
      var myHeaders = new Headers();
      myHeaders.append("bearer",bearer);
      myHeaders.append("user-id", userId);

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


  if(logout){
    return <div>
      <Navigate to='/'/>
      </div>
  }
 
  return (  
    <div className='full'>
    
      <div className="navbar">
        <h1 style={{color:'#a17f1a'}}>$Money Track</h1>
        
        <Button variant="danger" onClick={onLogout}>Logout <FaSignOutAlt/></Button>
      </div>
      
    <br></br>
    <Row>
      <Col className="text-center"><h2>Income : $xxxxx</h2></Col>
      <Col ><Row><Col className="text-end">
        <Button onClick={addNewTransaction}>Add New</Button></Col>
        <Col><Button onClick={addContact}>Add contacts</Button>
      </Col></Row></Col>
      <Col className="text-center"><h2>Expense: $xxxxx</h2></Col>
    </Row>
    
    <Row>
      <Col>
      
    <div className="container">
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Name</div>
          <div className="col col-2">Amount</div>
          <div className="col col-3">Note</div>
          <div className="col col-4">LastDate</div>
        </li>
        {income.map((con)=>(
        <li className="table-row" key={con.idencode}>
          <div className="col col-1" >{con.contact_details.name}</div>
          <div className="col col-2" >{con.amount}</div>
          <div className="col col-3" >{con.note}</div>
          <div className="col col-4" >{con.last_date}</div>
        </li>
        ))}
      </ul>
    </div>
        </Col>

        <Col>
        
        <div className="container">
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">Name</div>
          <div className="col col-2">Amount</div>
          <div className="col col-3">Note</div>
          <div className="col col-4">LastDate</div>
        </li>
        {income.map((con)=>(
        <li className="table-row" key={con.idencode}>
          <div className="col col-1" >{con.contact_details.name}</div>
          <div className="col col-2" >{con.amount}</div>
          <div className="col col-3" >{con.note}</div>
          <div className="col col-4" >{con.last_date}</div>
          <button className='deleteButton' value={con.idencode} onClick={onDelete}>Delete</button>
        </li>
        ))}
      </ul>
    </div>
        </Col>
    </Row>

<h3 style={{textAlign:"center",cursor:"pointer",}}  onClick={showTransaction}>Show Transaction</h3>
{/* <div class="price_table">
  
{income.map((con)=>(

  <div class="package package_free"  key={con.idencode}>
    <h2 className='h2'>{con.contact_details.name}</h2>
    <div class="price">Rs.<div class="big">{con.amount}</div></div>
    <ul>
      <li>Last Date: {con.last_date}</li>
      <li>Note: {con.note}</li>
    </ul>
    <button className='deleteButton' value={con.idencode} onClick={onDelete}>Delete</button>
  </div>
  
))}
</div> */}

    {newContact && <AddContacts setNewContact={setNewContact} />}
    {newTransaction && <AddTransaction setNewTransaction={setNewTransaction} contactList={contactList}/>}
    </div>
    
  );
    
}

export default App;
