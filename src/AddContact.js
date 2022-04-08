import React,{useState,useEffect} from 'react';
import './AddContact.css'
function AddContacts(props){
  const[contact,setContact]=useState({
    name: "",
    phone: "",
    address: ""
    });
    const handleChange=(e)=>{
      setContact({
          ...contact,[e.target.name]:e.target.value
  });
}
    const[bearer,setBearer]=useState();
    const[userId,setUserId]=useState();
    useEffect(()=>{
      setBearer(localStorage.getItem('bearer'));
      setUserId(localStorage.getItem('user-id'))
    })

    // const[data,setData]=useState({})

    const handleSubmit=(e)=>{
      e.preventDefault();

      var myHeaders = new Headers();
      myHeaders.append("bearer", bearer);
      myHeaders.append("user-id", userId);
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "name": contact.name,
        "phone": contact.phone,
        "address":contact.address
      });
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      
      fetch("https://money-track-project.herokuapp.com/accounts/contact/", requestOptions)
        .then(response => response.json())
        .then(result => {console.log(result);
        // setData(result);
      })
        .catch(error => console.log('error', error));

        setContact(
         {name:'',
          phone:"",
          address: ""
        }
        )


    }

    const Cancel=(e)=>{
        e.preventDefault()
        props.setNewContact(false)
    }
    return(
        <div className='popup'>
            <div className='popupinner'>
           
        <div >
        <div className="signupContainer">
        
        <div className="title"><span>Add Contact </span>
        <span className='right'  onClick={Cancel}>cancel</span></div>
        <div className="content">
          <form>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" placeholder="Enter Name" name="name" value={contact.name} onChange={handleChange} required/>
              </div>
              
              
            
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="number" placeholder="Enter Phone number" name="phone" value={contact.phone} onChange={handleChange} required/>
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" placeholder="Enter Address" name="address" value={contact.address} onChange={handleChange} required/>
              </div>
            </div>
            
            <div className="button" onClick={handleSubmit}>
              <input type="submit" value="Add"/>
             
            </div>
          </form>
        </div>
        
      </div>
      </div>
      </div>
      </div>
      );
    }
    export default AddContacts;