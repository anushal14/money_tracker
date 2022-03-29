import React, { Component } from "react";
import "./App.css";
import Modal from "./component/modal";
import {
    validateName,
    validateAddress,
    validateMobile,
    validateCity,
    validateStates,
    validateZip, 
} from "./component/validation";

class Home extends Component {
    state = {
        checked: "",
        show: false,
        show_personal: true,
        name:"",
        mobile:"",
        addrs: "",
        city:"",
        states:"",
        type:"",
        zip:"",
        name_error: "",
        mobile_error:"",
        addrs_error:"",
        city_error: "",
        states_error:"",
        zip_error:"",
        personal: [
                {
                name: "Sample",
                mobile: "1234567890",
                addrss: "a a a",
                city: "Chennai",
                states: "Tamil Nadu",
                zip: "123456",
                type: "Present",
                },
        ],
        business: [
            {
            name: "cool",
            mobile: "1234567890",
            addrss: "a a a",
            city: "Chennai",
            states: "Tamil Nadu",
            zip: "123456",
            type: "Present",
            },
    ],
};
    componentDidMount = () => {
        this.handleBorder();
        };
    
    onClose= () => {
        console.log("hai")
        this.setState({
        show: !this.state.show
        });
    };
    
    handleChange = (e) => {
        this.setState({
        [e.target.name] : e.target.value
        })
    console.log(e. target.value)
    };
    handleSave = () => {
            //write code for saving data into personal or business
            this.setState({})
    };
    handleClear=()=> {
        
        //write code for clearning input fields
        
    };
        
    handleBorder = () => {
        this.setState({
        borderBottom1: "hidden",
        borderBottom: "3px solid rgb(71, 68, 206)", 
        show_personal: true,
        });
        };
        handleBorder1= () => {
            this.setState({
            borderBottom: "hidden",
            borderBottom1: "3px solid rgb(71, 68, 206)",
            show_personal: false,
            });
            };
            
            render() {

                const userList=this.state.personal.map((user)=>
                <tr key={user.name}>
                <td>{user.mobile}</td>
                <td>{user.addrss}</td>
                <td>{user.city}</td>
                <td>{user.states}</td>
                <td>{user.zip}</td>
                <td></td>
                </tr>
                );

                return( <div>
                    <div className='App-header'>
                    <h1>Address Book</h1>
                    </div>
                    <div className='buttons'>
                    <button className='add' onClick={()=>{this.setState({show:!this.state.show})}}>Add</button>
                    </div>
                    <table>
                    <tr>
                    <th>Personal</th>
                    <th>Business</th>

                </tr>
                <tr>
                    <th>Name</th>
                    <th>Mobile No</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th> Zip</th>
                    <th>Present/Permanent/Both</th>
                </tr>
                
               
                {this.state.personal.map((user)=>
                <tr key={user.name}>
                <td>{user.name}</td>
                <td>{user.mobile}</td>
                <td>{user.addrss}</td>
                <td>{user.city}</td>
                <td>{user.states}</td>
                <td>{user.zip}</td>
                <td>{user.type}</td>
                </tr>
                )}
                
                {this.state.business.map((user)=>
                <tr key={user.name}>
                <td>{user.name}</td>
                <td>{user.mobile}</td>
                <td>{user.addrss}</td>
                <td>{user.city}</td>
                <td>{user.states}</td>
                <td>{user.zip}</td>
                <td>{user.type}</td>
                </tr>
                )}
                

                
                </table>
                {this.state.show && 
                <Modal>
                    <div className="bg">
                        <div className="pop">
                            <h3>Fill Address Details</h3>
                            <button  onClick={()=>{this.setState({show:!this.state.show})}}>Close</button>
                            <form>
                                <div className="radio">
                                    <input type='radio' name='radio' id='1' value='personal'/>
                                    <label>Personal</label>
                                    <input type='radio' name='radio' id='1' value='business'/>
                                    <label>Business</label>
                                    </div>
                                    <label>Name</label>
                                    <input className='input' type='text' name='name' value={this.state.name} onChange={this.handleChange}/>
                                    <label>Mobile</label>
                                    <input className='input' type='number' name='mobile' value={this.state.mobile} onChange={this.handleChange}/> 
                                    <label>Address</label>
                                    <input className='input' type='text' name='addrs' value={this.state.addrs} onChange={this.handleChange} />
                                    <label>City</label> 
                                    <input className='input' type='text' name='city' value={this.state.city} onChange={this.handleChange} />
                                    <label>State</label>
                                    <input className="input" type='text' name='states' value={this.state.states} onChange={this.handleChange} /> 
                                    <label>Postal/Zip code</label>
                                    <input className='input' type='number' name='zip' value={this.state.zip} onChange={this.handleChange}/>
                                     <div className="radio">
                                        <input type="radio" name='radio2' id='3' value='present'/> 
                                        <label>Present</label>
                                        <input type="radio" name='radio2' id='4' value='Permanent'/>
                                        <label>Permanent</label>
                                        <input type="radio" name="radio2" id='5' value='Both' /> 
                                        <label>Both</label>
                                    </div>
                                    <div className='btns'>
                                        <button className='save' onClick={this.handleSave}>Save</button>
                                        <button className='clear'>Clear</button>
                                        </div>
                            </form>
                        </div>
                    </div>
                </Modal>
                }
                </div>
                )}
            }
            export default Home