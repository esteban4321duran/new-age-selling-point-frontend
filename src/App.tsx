import React, {useState} from 'react'
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Login from "./pages/Login";
import {User} from "../model/User";
import Layout from "./components/Layout";
import useUserFromCookie from "./services/useUserFromCookie";
import axios from "axios";
import Notfound from "./pages/NotFound";
import Sales from "./pages/Sales";
import NewSale from "./pages/NewSale";

function App() {

  const [currentUser, setCurrentUser] = useState<User | null>(useUserFromCookie());

  async function handleLogout() {
    try {
      await axios.post('http://localhost:3001/api/auth/logout', {}, {withCredentials: true});
      setCurrentUser(null);
    } catch (e) {
      console.error(e);
    }

  }

  function handleLogin(user: User) {
    setCurrentUser(user);
  }

  return (
    <Routes>

      <Route path='/'
             element={<Layout logoutHandler={handleLogout} setCurrentUser={setCurrentUser} currentUser={currentUser}/>}>
        <Route index element={
          <>
            <hgroup>
              <h1>New Age</h1>
              <h2>Selling Point Application</h2>
            </hgroup>
          </>
        }/>
        <Route path='login' element={<Login loginHandler={handleLogin} currentUser={currentUser}/>}/>
        <Route path='sales/'>
          <Route index element={<Sales/>}/>
          <Route path='new/:saleId' element={<NewSale/>}/>
        </Route>

        <Route path='*' element={<Notfound/>}/>
      </Route>
    </Routes>
  )
}

export default App
