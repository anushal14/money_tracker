import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import App from './App';
import SignUp from './Pages/signUp';
import SignIn from './Pages/signIn';
function Main() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/signUp" element={<SignUp />} />
                    <Route exact path="/" element={<SignIn />} />
                    <Route exact path="/dashboard" element={<App />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Main;