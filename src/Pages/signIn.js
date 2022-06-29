import React,{ useState} from 'react';
import { basic_url } from '../common/constant';
import axios from 'axios';
import '../Css/SignIn.css';
import logo from '../images/img.svg'
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
    const[errorResponseData,setErrorResponseData]=useState({})
    const[loading,setLoading]=useState("")

    
    const handleSubmit=(e)=>{
        setLoading("Loading...");
        e.preventDefault();
        const payload = {
            username: loginInput.username,
            password: loginInput.password
          }
          
          axios({
            method: 'post',
            url: `${basic_url}accounts/login/`,
            data: payload,
            headers: {
             // 'Authorization': `bearer ${token}`,
            'Content-Type': 'application/json'
            }, 
          }).then((response) => {
            // console.log(response);
            localStorage.setItem('bearer',response.data.bearer);
            localStorage.setItem('user-id',response.data.idencode);
            setResponseData(response.data);
            setLoading("");
            }
            )
        .catch((error) => {console.log('error', error)
        setErrorResponseData(error.response.data);
        setLoading("");
          })
    }
    
if(responseData.bearer){
  return <div>
    <Navigate to='/dashboard'/>
    </div>
}
return (
<div className='loginbody'>
 
 <section className="loginside">
        <img src={logo} alt=""/>
    </section>

    <section className="loginmain">
        <div className="login-container">
            <p className="logintitle">Welcome</p>
            <div className="separator"></div>
            <p className="welcome-message">Please, provide login credential to proceed and have access to all our services</p>

            <form className="login-form">
                <div className="loginform-control">
                <input className='login-input' type="text"  placeholder="Username" name="username" value={loginInput.username} onChange={handleChange} required />
                    <i className="fas fa-user"></i>
                    <span  style={{color:"red"}}>{errorResponseData["username"]}</span> 
                </div>
                <div className="loginform-control">
                <input className='login-input' type="password" name="password" placeholder="Password" value={loginInput.password} onChange={handleChange} required/>
                    <i className="fas fa-lock"></i>
                    <span style={{color:"red"}}>{errorResponseData["password"]}</span> 
                </div>
                <span style={{color:"red"}}>{errorResponseData.detail}</span>
                <button onClick={handleSubmit} className="submit">{loading?loading:"Login"}</button>
            </form>
		<p>Don't have an Account? <Link to='/signUp'>Sign Up</Link></p>
        </div>
    </section>
  </div>
  );
}
export default SignIn;