import React,{useEffect, useState} from 'react';
import './SignIn.css';
import { Link,Navigate } from 'react-router-dom';
function SignIn(){
    const[loginInput,setLoginInput]=useState({
        password: "",
        username: "",
        });

    const handleChange=(e)=>{
            setLoginInput({
                ...loginInput,[e.target.name]:e.target.value
        });
    }

    const[responseData,setResponseData]=useState({})

    const handleSubmit=(e)=>{
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "username": loginInput.username,
            "password": loginInput.password
    });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://money-track-project.herokuapp.com/accounts/login/", requestOptions)
    .then(response => response.json())
    .then(result => {console.log(result);
    localStorage.setItem('bearer',result.bearer);
    localStorage.setItem('user-id',result.idencode);
    setResponseData(result);})
    .catch(error => console.log('error', error));
    // console.log(responseData)
    }
    // localStorage.setItem('bearer',responseData.bearer);
    // localStorage.setItem('user-id',responseData.idencode);
    // useEffect(()=>{console.log(responseData)})
if(responseData.bearer){
  return <div>
    <Navigate to='/dashboard'/>
    </div>
}
return (
 
  <div className='signinbody'> 
      <div className="signinContainer" id="container">
        
    <div className="form-container sign-in-container">
      <form method="POST" action="#" className="form" id="login">
        <h1 className="form__title">Login</h1>
        
        <div className="form__input-group">
          <label >Username: </label>
          <input type="text" className="form__input" placeholder="Enter your username" name="username" value={loginInput.username} onChange={handleChange} required />
          <span style={{color:"red"}}>{responseData["username"]}</span> 
        </div>
        <div className="form__input-group">
          <label>Password: </label>
          <input type="password" className="form__input" name="password" placeholder="Enter your password" value={loginInput.password} onChange={handleChange} required/>
          <span style={{color:"red"}}>{responseData["password"]}</span> 
        </div>
        <div className="form__input-group">
          <button type="submit" className="form__button" onClick={handleSubmit}>Submit</button>
        </div>
        <span style={{color:"red"}}>{responseData["detail"]}</span> 
     </form>
    </div>
    
    
   <div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<Link to='/signUp'><button className="ghost" id="signUp">Sign Up</button></Link>
			</div>
		</div>
	</div>
 </div>
 
  </div>
  );
}
export default SignIn;