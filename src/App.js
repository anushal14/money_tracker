import React, { useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom';
import AddContacts from './AddContact';
import './App.css';
import {Row,Col,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignOutAlt } from 'react-icons/fa';
import AddTransaction from './AddTransaction';
import ShowTranction from './ShowTransaction';
import ShowByPerson from './ShowByPerson';
function App() {
  const[newContact,setNewContact]=useState(false);
  const[newTransaction,setNewTransaction]=useState(false);
  const[ShowPersonDetail,setShowPersonDetail]=useState(false);
  // const addNew=()=>setNewTransaction(true);
  const addContact=()=>setNewContact(!newContact);
  

  const[bearer,setBearer]=useState();
  const[userId,setUserId]=useState();

  const[total,setTotal]=useState([])
      useEffect(()=>{
      setBearer(localStorage.getItem('bearer'));
      setUserId(localStorage.getItem('user-id'));

      var myHeaders = new Headers();
      myHeaders.append("bearer", localStorage.getItem('bearer'));
      myHeaders.append("user-id", localStorage.getItem('user-id'));

      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

      fetch("https://money-track-project.herokuapp.com//accounts/dashboard/", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);
      setTotal(result);
    })
      .catch(error => console.log('error', error));
      fetch("https://money-track-project.herokuapp.com/accounts/contact/", requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);
      setContactlist(result.results);
      })
      .catch(error => console.log('error', error));

    },[])

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


  //for transaction details
    const[Personal,setPersonal]=useState([]);
    const getPersonalData=(data)=>{
      setPersonal(data);
    }
  //for contact name and id
    const[Personal2,setPersonal2]=useState([]);
    const getPersonalData2=(data)=>{
      setPersonal2(data);
    }
    const [typeReturn,setTypeReturn]=useState("")
    const changeType=(e)=>{
      setTypeReturn(e.target.value);
    }



  if(logout){
    return <div>
      <Navigate to='/'/>
      </div>
  }
 
  return (  
    <div className='full'>
    
    <div className="header">
  <div className="left-zone">
    
    <div className="logo">
      <h2 >&#8377; Money Tracker</h2>
    </div>
  </div>
  <div className="search-input">
    <input type="text" className="search"></input>
  </div>
  <div className="right-zone">
    
      <img src="https://randomuser.me/api/portraits/women/71.jpg" alt="" className="user-img"/>
      <div className="notification" onClick={onLogout}>
      <FaSignOutAlt/>
    </div>
  </div>
</div>

    
    <div className='appbody'>
    <div className="table_head">
      <div className="text-center"><h2 style={{color:"green",fontWeight:"bold"}}>INCOME:  &#8377;{total.Total_income}</h2></div>
      
        <Button onClick={addNewTransaction}>New Transaction</Button>
        <Button value="100" onClick={changeType}>Show Income</Button>
        <Button value="200" onClick={changeType}>Show Expense</Button>
        <Button value="" onClick={changeType}>Show All</Button>
      
      <div className="text-center"><h2 style={{color:"red",fontWeight:"bold"}}>EXPENSE:  &#8377;{total.total_expense}</h2></div>
    </div>
<nav className="menu">
	<div className="smartphone-menu-trigger"></div>
  <header className="avatar">
 
    <h2 className='menu_h2'>Contacts</h2>
    <div onClick={addContact} className='plus'>&#43;</div>
  </header>
	<ul className='menu_ul'>
  {contactList.map((con)=>(          
    <li key={con.idencode} className="menu_li"><span className='menu_span'>{con.name}</span></li>
    ))}
  </ul>
</nav>

<main className="main">
  <div className="helper">
  <ShowTranction type={typeReturn} changeType={changeType} condition={newTransaction}  setShowPersonDetail={setShowPersonDetail} onShowPersonal={getPersonalData} onShowPersonal2={getPersonalData2}/>
  </div>
</main>
</div>
{/* 
    <Row> 
      <Col>
        <ShowTranction type="100" condition={newTransaction}  setShowPersonDetail={setShowPersonDetail} onShowPersonal={getPersonalData} onShowPersonal2={getPersonalData2}/>
      </Col>

      <Col>
        <ShowTranction type="200" condition={newTransaction}  setShowPersonDetail={setShowPersonDetail} onShowPersonal={getPersonalData} onShowPersonal2={getPersonalData2}/>
      </Col>
    </Row> */}

    {ShowPersonDetail && <ShowByPerson Personal={Personal} Personal2={Personal2} setShowPersonDetail={setShowPersonDetail}/>}

    {newContact && <AddContacts setNewContact={setNewContact} />}
    
    {newTransaction && <AddTransaction setNewTransaction={setNewTransaction} contactList={contactList}/>}
    </div>
  
  );
    
}

export default App;
