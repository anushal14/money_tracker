import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/SignUp.css';
import { basic_url } from '../common/constant';
toast.configure()
function SignUp() {
  const [values, setValues] = useState({
    password: "",
    confirm_password: "",
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    dob: "",
  });

  let navigate = useNavigate();
  const handleChange = (e) => {
    setValues({
      ...values, [e.target.name]: e.target.value
    });
  }
  const notify = () => toast.success("Great! Account created Successfully", { position: toast.POSITION.TOP_CENTER, autoClose: 2000 });
  const [data, setData] = useState({})
  const handleSubmit = (e) => {
    e.preventDefault();
    // setData(values);
    // console.log(data);
    const payload = {
      password: values.password,
      username: values.username,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      phone_number: values.phone_number,
      dob: values.dob
    }

    axios({
      method: 'post',
      url: `${basic_url}accounts/signup/`,
      data: payload,
      headers: {
        // 'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log(response);
      notify();
      setTimeout(function () {
        navigate(`/`);
      }, 1000);
    }
    )
      .catch((error) => {
        console.log('error', error)
        setData(error.response.data);
      })
    setValues(
      {
        password: '',
        confirm_password: "",
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        dob: "",
      }
    )
    setData("")
  }

  return (
    <div className='body'>
      <div className="signupContainer">
        <div className="title">SignUp</div>
        <div className="content">
          <form>
            <div className="user-details">
              <div className="input-box">
                <span className="details">First Name</span>
                <input type="text" placeholder="Enter your first name" name="first_name" value={values.first_name} onChange={handleChange} required />
              </div>
              <div className="input-box">
                <span className="details">Last Name</span>
                <input type="text" placeholder="Enter your Last name" name="last_name" value={values.last_name} onChange={handleChange} required />
              </div>
              <div className="input-box">
                <span className="details">Date Of Birth</span>
                <input type="date" name="dob" value={values.dob} onChange={handleChange} required />
                <span style={{ color: "red" }}>{data["dob"]}</span>
              </div>
              <div className="input-box">
                <span className="details">Username</span>
                <input type="text" placeholder="Enter your username" name="username" value={values.username} onChange={handleChange} required />
                <span style={{ color: "red" }}>{data["username"]}</span>
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" placeholder="Enter your email" name="email" value={values.email} onChange={handleChange} required />
                <span style={{ color: "red" }}>{data["email"]}</span>
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="number" placeholder="Enter your number" name="phone_number" value={values.phone_number} onChange={handleChange} required />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input type="text" placeholder="Enter your password" name="password" value={values.password} onChange={handleChange} required />
                <span style={{ color: "red" }}>{data["password"]}</span>
              </div>
              <div className="input-box">
                <span className="details">Confirm Password</span>
                <input type="text" placeholder="Confirm your password" name="confirm_password" value={values.confirm_password} onChange={handleChange} required />
              </div>
            </div>
            <div className="button" onClick={handleSubmit}>
              <input type="submit" value="SignUp" />
            </div>
            <p style={{ textAlign: "center" }}>Already have an Account? <Link to='/'>Sign In</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
