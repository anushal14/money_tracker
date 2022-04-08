import React,{ useState} from 'react';
import './SignIn.css';
import logo from './images/img.svg'
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
    
    }
    
if(responseData.bearer){
  return <div>
    <Navigate to='/dashboard'/>
    </div>
}
return (
<div className='loginbody'>
 
 <section class="loginside">
        <img src={logo} alt=""/>
    </section>

    <section class="loginmain">
        <div class="login-container">
            <p class="logintitle">Welcome</p>
            <div class="separator"></div>
            <p class="welcome-message">Please, provide login credential to proceed and have access to all our services</p>

            <form class="login-form">
                <div class="loginform-control">
                <input className='login-input' type="text"  placeholder="Username" name="username" value={loginInput.username} onChange={handleChange} required />
                    <i class="fas fa-user"></i>
                    <span  style={{color:"red"}}>{responseData["username"]}</span> 
                </div>
                <div class="loginform-control">
                <input className='login-input' type="password" name="password" placeholder="Password" value={loginInput.password} onChange={handleChange} required/>
                    <i class="fas fa-lock"></i>
                    <span style={{color:"red"}}>{responseData["password"]}</span> 
                </div>

                <button onClick={handleSubmit} class="submit">Login</button>
            </form>
		<p>Don't have an Account? <Link to='/signUp'>Sign Up</Link></p>
        </div>
    </section>
  </div>
  );
}
export default SignIn;