import React from 'react';
import './main.css';
import { BrowserRouter,Routes,Route,} from 'react-router-dom';
import App from './App';
import SignUp from './signUp';
import SignIn from './signIn';
function Main(){
    return(
        <div>
        <BrowserRouter>
            <Routes>
                    <Route exact path="/signUp" element={ <SignUp/>}/>
                    <Route exact path="/" element={ <SignIn/>}/>
                    <Route exact path="/dashboard" element={ <App/>}/>
            </Routes>
        </BrowserRouter>
        </div>
    )
}
export default Main;