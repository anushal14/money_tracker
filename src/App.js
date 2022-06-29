import React, { useState,useEffect} from 'react'
import userImg from './images/user.png';
import { basic_url } from './common/constant';
import { Navigate } from 'react-router-dom';
import AddContacts from './Pages/AddContact';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignOutAlt,FaPlusCircle,FaUser,FaWindowClose,FaPlus } from 'react-icons/fa';
import AddTransaction from './Pages/AddTransaction';
import ShowTranction from './Pages/ShowTransaction';
import ShowByPerson from './Pages/ShowByPerson';
function App() {
  const[newContact,setNewContact]=useState(false);
  const[newTransaction,setNewTransaction]=useState(false);
  const[ShowPersonDetail,setShowPersonDetail]=useState(false);
  // const addNew=()=>setNewTransaction(true);
  const addContact=()=>setNewContact(!newContact);
  
const[mobile,setMobile]=useState(false);
const[sidebar,setSidebar]=useState(false);
  const[bearer,setBearer]=useState();
  const[userId,setUserId]=useState();

  const[total,setTotal]=useState([]);
  useEffect(()=>{
      if(window.innerWidth<1000){
          setMobile(true);
      }
  },[])
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

      fetch(`${basic_url}/accounts/dashboard/`, requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);
      setTotal(result);
    })
      .catch(error => console.log('error', error));
      fetch(`${basic_url}accounts/contact/`, requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result);
      setContactlist(result.results);
      setNext(result.next);
    //   setPrevious(result.previous);
      })
      .catch(error => console.log('error', error));

      const handleSize=()=>{
        if(window.innerWidth<1000){
            setMobile(true);
        }
        else{
            setMobile(false);
        }
    };
    window.addEventListener("resize",handleSize);
    return()=>{
        window.removeEventListener("resize",handleSize);  
    };


    },[newTransaction,newContact,ShowPersonDetail])

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

      fetch(`${basic_url}accounts/contact/`, requestOptions)
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

      fetch(`${basic_url}/accounts/logout/`, requestOptions)
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

    const [contactId,setContactId]=useState("")
    

    const[next,setNext]=useState("");
    const[loading,setLoading]=useState("")
    const onSwitchPage=(e)=>{
        setLoading("Loading.....")
        var myHeaders = new Headers();
      myHeaders.append("bearer",localStorage.getItem('bearer'));
      myHeaders.append("user-id", localStorage.getItem('user-id'));

      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };

      fetch(next, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result.results[0]);
        setContactlist([...contactList,...(result.results)]);
      setNext(result.next);
      setLoading("");
      })
      .catch(error => {console.log('error', error)
      setLoading("");});
      }

      const handleScroll=(e)=>{
          const bottom=Math.round(e.target.scrollHeight-e.target.scrollTop)===e.target.clientHeight;
          if(bottom){
              next &&
              onSwitchPage();
          }
      }



  if(logout){
    return <div>
      <Navigate to='/'/>
      </div>
  }
 
  return (  
    <div className='full'>

<nav onScroll={handleScroll}>
        <div className="logo-name">
            <div className="logo-image">
               $
            </div>

            <span className="logo_name">Money Tracker</span>
            {mobile && <div onClick={()=>setSidebar(false)} style={{fontSize:"24px",paddingLeft:"75px",color:"red"}} ><FaWindowClose/></div>}
        </div>

        <div className="menu-items">
        <ul className="logout-mode">
                

                <li className="mode">
                    <a href='#'>
                        <i className="uil uil-moon"></i>
                    <span className="contacts">Contacts</span>
                </a>
                

                <div className="mode-toggle">
                <div onClick={addContact} className='plus'><FaPlusCircle /></div>
                </div>
            </li>
            </ul>
            <ul className="nav-links">
            {contactList.map((con)=>(          
                <li className="mode" key={con.idencode} onClick={()=>(setContactId(con.idencode),setSidebar(false))}><a href='#'>
                    <i className="uil uil-estate"></i>
                    <div className='contactdetails'>
                    <span className="link-name">{con.name}</span>
                    <div className='Contact_inc_exp'>
                    
                        <span style={{color:"black"}}>Balance: <span style={{color:`${con.transactions_detail.type===100?"darkgreen":"red"}`}}>&#8377;{con.transactions_detail.amount?con.transactions_detail.amount:0}</span></span>
                
                     </div>
                    </div>
                </a>
                <div className="mode-toggle">
                <img src={(con.image!==null)?con.image:userImg} alt="" className="user-img"/>
                </div></li>
                 ))}
                 <div>{loading}</div>
            </ul>
            {/* <div className="switchbutton">
        <button className="nextbtn" disabled={previous===null?true:false} value={previous} onClick={onSwitchPage}>&#8592;Previous</button>
        <button className="nextbtn" disabled={next===null?true:false} value={next} onClick={onSwitchPage}>Next&#8594;</button>
      </div> */}
            
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
{!sidebar &&
    <section className="dashboard">
        <div className="top">
            {mobile &&
                <div className='userDiv'>
                <div className='userplus' onClick={()=>setSidebar(true)}><FaUser /></div>
                </div>
            }
            <i className="uil uil-bars sidebar-toggle"></i>

            <div className="search-box">
                <i className="uil uil-search"></i>
                <input type="text" placeholder="Search here..."/>
                
            </div>
            <div className="right-zone">
            <img src="https://randomuser.me/api/portraits/women/71.jpg" alt="" className="user-img"/>
            <div className="notification" onClick={onLogout}><FaSignOutAlt/></div>
        </div>
        </div>
           
        <div className="dash-content">
            <div className="overview">
                {/* <div onClick={addNewTransaction} className="title">
                    <div className='plus'><FaPlusCircle /></div>
                    <span className="text">New Transaction</span>
                </div> */}
                
                <div className="boxes">
                    <div className="box box1">
                        {/* <span className="text">Total Income</span> */}
                        <span className="number">&#8377;{total.Total_income}</span>
                    </div>
                    {/* <div class="box box2">
                        <i class="uil uil-comments"></i>
                        <span class="text">Comments</span>
                        <span class="number">20,120</span>
                    </div> */}
                    <div className="box box3">
                        {/* <span className="text">Total Expense</span> */}
                        <span className="number">&#8377;{total.total_expense}</span>
                    </div>
                </div>
            </div>

            <div className="activity">
                <div className="typetitle">
                    {/* <i className="uil uil-clock-three"></i> */}
                    
                    <select onChange={changeType} className='selectBox'>
                        <option value="">All Transaction</option>
                        <option value="100">Income</option>
                        <option value="200">Expense</option>
                    </select>
                    <select className='selectBox'>
                        <option value="100">Initiated</option>
                        <option value="200">Ongoing</option>
                        <option value="300">Completed</option>
                    </select>
                </div>
                <ShowTranction contactId={contactId} type={typeReturn} changeType={changeType} condition={newTransaction}  setShowPersonDetail={setShowPersonDetail} onShowPersonal={getPersonalData} onShowPersonal2={getPersonalData2}/>
               
            </div>
        </div>
        <div onClick={addNewTransaction} className='circle'><FaPlus/></div>
    </section>}



    {ShowPersonDetail && <ShowByPerson Personal={Personal} Personal2={Personal2} setShowPersonDetail={setShowPersonDetail}/>}

    {newContact && <AddContacts setNewContact={setNewContact} />}
    
    {newTransaction && <AddTransaction setNewTransaction={setNewTransaction} contactList={contactList}/>}
    </div>
  
  );
    
}

export default App;
