import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Contact from './Components/Contact';
import Dialog from './Components/Dialogue';
import logo from './images/logo.png';
import Book from './images/Book.gif';
import { basic_url } from './common/constant';
import { Navigate } from 'react-router-dom';
import AddContacts from './Components/AddContact';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSignOutAlt, FaUser, FaPlus, FaAngleDoubleDown, FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { typeDropdownData, statusDropdownData } from './common/constant';
import AddTransaction from './Components/AddTransaction';
import Dropdown from './Dropdown/Dropdown';
import ShowTranction from './Components/ShowTransaction';
import ShowByPerson from './Components/ShowByPerson';
function App() {
  const [newContact, setNewContact] = useState(false);
  const [newTransaction, setNewTransaction] = useState(false);
  const [ShowPersonDetail, setShowPersonDetail] = useState(false);
  const addContact = () => setNewContact(!newContact);
  const [mobile, setMobile] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [total, setTotal] = useState([]);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  //   disable back button
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function (event) {
    window.history.go(1);
  }

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setMobile(true);
    }

    const timer = setTimeout(() => {
      setClassna("box")
    }, 2100);
    return () => clearTimeout(timer);
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

    fetch(`${basic_url}accounts/contact/?&list_by=100&order_by=700`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setContactlist(result.results);
        setNext(result.next);
        setDashboardLoading(false)
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


  }, [newTransaction === false, newContact, ShowPersonDetail])

  const [contactList, setContactlist] = useState([])

  const searchContact = (e) => {
    var myHeaders = new Headers();
    myHeaders.append("bearer", localStorage.getItem('bearer'));
    myHeaders.append("user-id", localStorage.getItem('user-id'));

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch(`${basic_url}accounts/contact/?name=${e.target.value}&list_by=100&order_by=700`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setContactlist(result.results);
        setNext(result.next);
      }).catch(error => console.log('error', error));
  }

  const addNewTransaction = () => {
    setNewTransaction(true);
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
  const [statusType, setStatusType] = useState("")
  const [noteKeyword, setNoteKeyword] = useState("")
  const changeNoteKeyword = (e) => {
    setNoteKeyword(e.target.value);
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

  return (<div>
    {dashboardLoading ? <div style={{ justifyContent: "center", alignItems: "center", display: "flex", height: "100vh" }}>
      <img src={Book} alt="Loading" height={50} width={50} />
    </div> :
      <div className='full'>
        <nav onScroll={handleScroll}>
          <div className="logo-name">
            <div className="logo-image"><img src={logo} alt="" /></div>
            <span className="logo_name">Money Tracker</span>
            {mobile && <div onClick={() => setSidebar(false)} style={{ fontSize: "25px", transform: "rotate(-90deg)" }}><FaAngleDown /></div>}
          </div>
          <Contact loading={loading} addContact={addContact} searchContact={searchContact} contactList={contactList} setContactId={setContactId} setSidebar={setSidebar} />
        </nav>
        {!sidebar &&
          <section className="dashboard">
            <div className="top">
              {mobile && <div className='userDiv'><div className='userplus' onClick={() => setSidebar(true)}><FaUser /></div></div>}
              <i className="uil uil-bars sidebar-toggle"></i>
              <div className="search-box">
                <input type="text" placeholder="Search by notes..." onChange={changeNoteKeyword} />
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
                    <span className="number">&#8377;{total.Total_income ? total.Total_income : "0"}</span>
                  </div>
                  <div className={mobile ? classna : "box"} style={{ backgroundColor: "rgba(222, 0, 0, 0.6)" }}>
                    <span className="number">&#8377;{total.total_expense ? total.total_expense : "0"}</span>
                  </div>
                </div>
                {mobile && (classna === "box") && <button className='downAngle' onClick={() => setClassna("void")}><FaAngleUp /></button>}
              </div>
              <div className="activity">
                <div style={{ display: "flex" }}>
                  <Dropdown setTypeReturn={setTypeReturn} DropdownData={true} ddData={typeDropdownData} />
                  <Dropdown DropdownData={false} setStatusType={setStatusType} ddData={statusDropdownData} />
                </div>
                <ShowTranction contactId={contactId} type={typeReturn} condition={newTransaction} statusType={statusType} noteKeyword={noteKeyword}
                  ShowPersonDetail={ShowPersonDetail} setShowPersonDetail={setShowPersonDetail} onShowPersonal={getPersonalData} onShowPersonal2={getPersonalData2} />
              </div>
            </div>
            <div onClick={addNewTransaction} className='circle'><FaPlus /></div>
          </section>}
        {ShowPersonDetail && <ShowByPerson Personal={Personal} Personal2={Personal2} setShowPersonDetail={setShowPersonDetail} />}
        {newContact && <AddContacts setNewContact={setNewContact} />}
        {newTransaction && <AddTransaction setNewTransaction={setNewTransaction} />}
        {dialogue && <Dialog onDialog={setDialogue} onLogout={onLogout} />}
      </div>
    }</div>
  );
}

export default App;
