import React, { useState,useEffect} from 'react'
import userImg from './images/user.png'
import { Navigate } from 'react-router-dom';
import AddContacts from './AddContact';
import './App.css';
import {Row,Col,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignOutAlt,FaPlusCircle } from 'react-icons/fa';
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
      setNext(result.next);
      setPrevious(result.previous);
      })
      .catch(error => console.log('error', error));

    },[newTransaction,newContact])

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
      if(e.target.value==="100")
      setTypeName("Income");
      else
      setTypeName("Expense")
    }
    const [typeName,setTypeName]=useState("All Transactions")
    

    const[next,setNext]=useState("");
    const[previous,setPrevious]=useState("");
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
        setContactlist(result.results);
      setPrevious(result.previous);
      setNext(result.next);
      })
      .catch(error => console.log('error', error));
      }



  if(logout){
    return <div>
      <Navigate to='/'/>
      </div>
  }
 
  return (  
    <div className='full'>

<nav>
        <div class="logo-name">
            <div class="logo-image">
               $
            </div>

            <span class="logo_name">Money Tracker</span>
        </div>

        <div class="menu-items">
        <ul class="logout-mode">
                

                <li class="mode">
                    <a href="#">
                        <i class="uil uil-moon"></i>
                    <span class="contacts">Contacts</span>
                </a>

                <div class="mode-toggle">
                <div onClick={addContact} className='plus'><FaPlusCircle /></div>
                </div>
            </li>
            </ul>
            <ul class="nav-links">
            {contactList.map((con)=>(          
                <li class="mode" key={con.idencode}><a href="#">
                    <i class="uil uil-estate"></i>
                    <div className='contactdetails'>
                    <span class="link-name">{con.name}</span>
                    <div className='Contact_inc_exp'>
                    
                        <span style={{color:"black"}}>Income:<span style={{color:"darkgreen"}}>&#8377;{con.transactions_detail.total_income?con.transactions_detail.total_income:0}</span></span>
                        <span style={{color:"black",paddingLeft:"8px"}}>Expense:<span style={{color:"red"}}>&#8377;{con.transactions_detail.total_expense?con.transactions_detail.total_expense:0}</span></span>
                     </div>
                    </div>
                </a>
                <div class="mode-toggle">
                <img src={(con.image!==null)?con.image:userImg} alt="" className="user-img"/>
                </div></li>
                 ))}
            </ul>
            <div className="switchbutton">
        <button className="nextbtn" disabled={previous===null?true:false} value={previous} onClick={onSwitchPage}>&#8592;Previous</button>
        <button className="nextbtn" disabled={next===null?true:false} value={next} onClick={onSwitchPage}>Next&#8594;</button>
      </div>
            
            {/* <ul class="logout-mode">
                <li><a href="#">
                    <i class="uil uil-signout"></i>
                    <span class="link-name">Logout</span>
                </a></li>

                <li class="mode">
                    <a href="#">
                        <i class="uil uil-moon"></i>
                    <span class="link-name">Dark Mode</span>
                </a>

                <div class="mode-toggle">
                  <span class="switch"></span>
                </div>
            </li>
            </ul> */}
        </div>
    </nav>

    <section class="dashboard">
        <div class="top">
            <i class="uil uil-bars sidebar-toggle"></i>

            <div class="search-box">
                <i class="uil uil-search"></i>
                <input type="text" placeholder="Search here..."/>
                
            </div>
            <div className="right-zone">
            <img src="https://randomuser.me/api/portraits/women/71.jpg" alt="" className="user-img"/>
            <diV className="notification" onClick={onLogout}><FaSignOutAlt/></diV>
        </div>
        </div>

        <div class="dash-content">
            <div class="overview">
                <div onClick={addNewTransaction} class="title">
                    <div className='plus'><FaPlusCircle /></div>
                    <span class="text">New Transaction</span>
                </div>

                <div class="boxes">
                    <button value="100" onClick={changeType} class="box box1">
                        {/* <i class="uil uil-thumbs-up"></i> */}
                        <span class="text">Total Income</span>
                        <span class="number">&#8377;{total.Total_income}</span>
                    </button>
                    {/* <div class="box box2">
                        <i class="uil uil-comments"></i>
                        <span class="text">Comments</span>
                        <span class="number">20,120</span>
                    </div> */}
                    <button value="200" onClick={changeType} class="box box3">
                        <i class="uil uil-share"></i>
                        <span class="text">Total Expense</span>
                        <span class="number">&#8377;{total.total_expense}</span>
                    </button>
                </div>
            </div>

            <div class="activity">
                <div class="typetitle">
                    <i class="uil uil-clock-three"></i>
                    <span class="text">{typeName}</span>
                </div>
                <ShowTranction type={typeReturn} changeType={changeType} condition={newTransaction}  setShowPersonDetail={setShowPersonDetail} onShowPersonal={getPersonalData} onShowPersonal2={getPersonalData2}/>
               
            </div>
        </div>
    </section>



    {ShowPersonDetail && <ShowByPerson Personal={Personal} Personal2={Personal2} setShowPersonDetail={setShowPersonDetail}/>}

    {newContact && <AddContacts setNewContact={setNewContact} />}
    
    {newTransaction && <AddTransaction setNewTransaction={setNewTransaction} contactList={contactList}/>}
    </div>
  
  );
    
}

export default App;
