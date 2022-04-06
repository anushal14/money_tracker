import React from 'react';
import './test.css';
import { FaSignOutAlt } from 'react-icons/fa';
function Test() {


    return(<div>
<div class="header">
  <div class="left-zone">
    
    <div class="logo">
      <h2 >Money Tracker</h2>
    </div>
  </div>
  <div class="search-input">
    <input type="text" class="search"></input>
  </div>
  <div class="right-zone">
    
      <img src="https://randomuser.me/api/portraits/women/71.jpg" alt="" class="user-img"/>
      <div class="notification">
      <FaSignOutAlt/>
    </div>
  </div>
</div>

<div className='appbody'>
<nav class="menu" tabindex="0">
	<div class="smartphone-menu-trigger"></div>
  <header class="avatar">
		<img className='menuimg' src="https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg" />
    <h2 className='menu_h2'>John D.</h2>
  </header>
	<ul className='menu_ul'>
    <li tabindex="0" class="menu_li"><span className='menu_span'>Dashboard</span></li>
    <li tabindex="0" class="menu_li"><span className='menu_span'>Customers</span></li>
    <li tabindex="0" class="menu_li"><span className='menu_span'>Users</span></li>
    <li tabindex="0" class="menu_li"><span className='menu_span'>Settings</span></li>
  </ul>
</nav>

<main class="main">
  <div class="helper">
  <div className="DisplayTable">
		<tr>
			<th><div className="h1table">Name</div></th>
			<th><div className="h1table">Amount</div></th>
			<th><div className="h1table">Note</div></th>
			<th><div className="h1table">Last Date</div></th>
		</tr>
  
        <tr className="table-row" >
          <td >gfhfghghhfg</td>
          <td className="col col-2" style={{color:"rgba(104, 11, 11, 0.907)",fontWeight:"bold"}}> &#8377;4545456 </td>
          <td className="col col-3" >dfgdfgdfgfd</td>
          <td className="col col-4" >dfghdfghfdghdf</td>
        </tr>
        
        
  </div>
  </div>
</main>
</div>


</div>
    )
}
export default Test;