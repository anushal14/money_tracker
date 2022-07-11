import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from './Pages/Dialogue';
import userImg from './images/user.png';
import logo from './images/logo.png';
import search from './images/search.png';
import { basic_url } from './common/constant';
import { Navigate } from 'react-router-dom';
import AddContacts from './Pages/AddContact';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignOutAlt, FaPlusCircle, FaUser, FaPlus, FaAngleDoubleDown, FaAngleUp, FaAngleDown } from 'react-icons/fa';
import AddTransaction from './Pages/AddTransaction';
import ShowTranction from './Pages/ShowTransaction';
import ShowByPerson from './Pages/ShowByPerson';
function App() {
  const [newContact, setNewContact] = useState(false);
  const [newTransaction, setNewTransaction] = useState(false);
  const [ShowPersonDetail, setShowPersonDetail] = useState(false);
  const addContact = () => setNewContact(!newContact);
  const [mobile, setMobile] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [total, setTotal] = useState([]);
  //   disable back button
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function (event) {
    window.history.go(1);
  }

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setMobile(true);
    }
  }, [])

  useEffect(() => {
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
      .then(result => {
        console.log(result);
        setTotal(result);
      }).catch(error => console.log('error', error));

    fetch(`${basic_url}accounts/contact/`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setContactlist(result.results);
        setNext(result.next);
      }).catch(error => console.log('error', error));

    const handleSize = () => {
      if (window.innerWidth < 1000) {
        setMobile(true);
      }
      else {
        setMobile(false);
      }
    };
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };


  }, [newTransaction, newContact, ShowPersonDetail])

  const [contactList, setContactlist] = useState([])

  const addNewTransaction = () => {
    setNewTransaction(true);
    var myHeaders = new Headers();
    myHeaders.append("bearer", localStorage.getItem('bearer'));
    myHeaders.append("user-id", localStorage.getItem('user-id'));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${basic_url}accounts/contact/`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setContactlist(result.results);
      })
      .catch(error => console.log('error', error));
  }

  const [logout, setLogout] = useState(false);

  const onLogout = () => {
    axios({
      method: 'post',
      url: `${basic_url}/accounts/logout/`,
      headers: {
        //  'Authorization': `bearer ${token}`,
        'bearer': localStorage.getItem('bearer'),
        'user-id': localStorage.getItem('user-id'),
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log("logout Successfully", response);
    }).catch((error) => {
      console.log('error', error.response.data)
    })
    localStorage.clear();
    setLogout(true);
  }


  //for transaction details
  const [Personal, setPersonal] = useState([]);
  const getPersonalData = (data) => {
    setPersonal(data);
  }
  //for contact name and id
  const [Personal2, setPersonal2] = useState([]);
  const getPersonalData2 = (data) => {
    setPersonal2(data);
  }
  const [typeReturn, setTypeReturn] = useState("")
  const changeType = (e) => {
    setTypeReturn(e.target.value);
  }
  const [statusType, setStatusType] = useState("")
  const changeStatus = (e) => {
    setStatusType(e.target.value);
  }

  const [contactId, setContactId] = useState("")


  const [next, setNext] = useState("");
  const [loading, setLoading] = useState("")
  const onSwitchPage = (e) => {
    setLoading("Loading.....")
    var myHeaders = new Headers();
    myHeaders.append("bearer", localStorage.getItem('bearer'));
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
        setContactlist([...contactList, ...(result.results)]);
        setNext(result.next);
        setLoading("");
      })
      .catch(error => {
        console.log('error', error)
        setLoading("");
      });
  }

  const handleScroll = (e) => {
    const bottom = Math.round(e.target.scrollHeight - e.target.scrollTop) === e.target.clientHeight;
    if (bottom) {
      next &&
        onSwitchPage();
    }
  }

  const [classna, setClassna] = useState("void")
  const [dialogue, setDialogue] = useState(false)

  if (logout) {
    return <div>
      <Navigate to='/' />
    </div>
  }

  return (
    <div className='full'>
      <nav onScroll={handleScroll}>
        <div className="logo-name">
          <div className="logo-image"><img src={logo} /></div>
          <span className="logo_name">Money Tracker</span>
          {mobile && <div onClick={() => setSidebar(false)} style={{ fontSize: "25px", transform: "rotate(-90deg)" }}><FaAngleDown /></div>}
        </div>
        <div className="menu-items">
          <ul className="logout-mode">
            <div className="contactMode">
              <span className="contacts">Contacts</span>
              <div className="mode-toggle">
                <div onClick={addContact} className='plus'><FaPlusCircle /></div>
              </div>
            </div>
          </ul>
          <div className='contactSearch'>
            <img src={search} />
            <input className='ContactSearchBox' type="text" placeholder="Find a Person..." />
          </div>
          <ul className="nav-links">
            {contactList.map((con) => (
              <li className="mode" key={con.idencode} onClick={() => (setContactId(con.idencode), setSidebar(false))}><a href='#'>
                <i className="uil uil-estate"></i>
                <div className='contactdetails'>
                  <span className="link-name">{con.name}</span>
                  <div className='Contact_inc_exp'>
                    <span style={{ color: "black" }}>Balance: <span style={{ color: `${con.transactions_detail.type === 100 ? "darkgreen" : "red"}` }}>&#8377;{con.transactions_detail.amount ? con.transactions_detail.amount : 0}</span></span>
                  </div>
                </div>
              </a>
                <div className="mode-toggle">
                  <img src={(con.image !== null) ? con.image : userImg} alt="" className="user-img" />
                </div></li>
            ))}
            <div>{loading}</div>
          </ul>
        </div>
      </nav>
      {!sidebar &&
        <section className="dashboard">
          <div className="top">
            {mobile && <div className='userDiv'><div className='userplus' onClick={() => setSidebar(true)}><FaUser /></div></div>}
            <i className="uil uil-bars sidebar-toggle"></i>
            <div className="search-box">
              <i className="uil uil-search"></i>
              <input type="text" placeholder="Search here..." />
            </div>
            <div className="right-zone">
              <img src="https://randomuser.me/api/portraits/women/71.jpg" alt="" className="user-img" />
              <div className="notification" onClick={() => setDialogue(true)}><FaSignOutAlt /></div>
            </div>
          </div>
          <div className="dash-content">
            <div className="overview">
              {mobile && (classna === "void") && <button className='downAngle' onClick={() => setClassna("box")}><FaAngleDoubleDown /></button>}
              <div className="boxes">
                <div className={mobile ? classna : "box"}>
                  <span className="number">&#8377;{total.Total_income}</span>
                </div>
                <div className={mobile ? classna : "box"} style={{ backgroundColor: "rgba(222, 0, 0, 0.6)" }}>
                  <span className="number">&#8377;{total.total_expense}</span>
                </div>
              </div>
              {mobile && (classna === "box") && <button className='downAngle' onClick={() => setClassna("void")}><FaAngleUp /></button>}
            </div>
            <div className="activity">
              <div className="typetitle">
                <select onChange={changeType} className='selectBox'>
                  <option value="">All Transaction</option>
                  <option value="100">Income</option>
                  <option value="200">Expense</option>
                </select>
                <select onChange={changeStatus} className='selectBox'>
                  <option value="">Select Status</option>
                  <option value="100">Initiated</option>
                  <option value="200">Ongoing</option>
                  <option value="300">Completed</option>
                </select>
              </div>
              <ShowTranction contactId={contactId} type={typeReturn} changeType={changeType} condition={newTransaction} statusType={statusType}
                changeStatus={changeStatus} setShowPersonDetail={setShowPersonDetail} onShowPersonal={getPersonalData} onShowPersonal2={getPersonalData2} />
            </div>
          </div>
          <div onClick={addNewTransaction} className='circle'><FaPlus /></div>
        </section>}
      {ShowPersonDetail && <ShowByPerson Personal={Personal} Personal2={Personal2} setShowPersonDetail={setShowPersonDetail} />}
      {newContact && <AddContacts setNewContact={setNewContact} />}
      {newTransaction && <AddTransaction setNewTransaction={setNewTransaction} contactList={contactList} />}
      {dialogue && <Dialog onDialog={setDialogue} onLogout={onLogout} />}
    </div>
  );
}

export default App;
