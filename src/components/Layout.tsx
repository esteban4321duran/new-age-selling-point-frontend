import React, {useState} from "react";
import {User} from "../../model/User";
import useUserFromCookie from "../services/useUserFromCookie";
import Header from "./Header";
import {Outlet} from "react-router-dom";

// export interface OutletContext {
//   currentUser: User | null;
//   setCurrentUser: (user: User | null) => void;
// }

interface Props {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  logoutHandler: () => void;
}

export default function Layout(props: Props) {
  // const context: OutletContext = {
  //   currentUser,
  //   setCurrentUser,
  // }

  return <div className='container-fluid'>
    <Header currentUser={props.currentUser} setCurrentUser={props.setCurrentUser} logoutHandler={props.logoutHandler}/>
    <main className='container'>
      {/*<Outlet context={context}/>*/}
      <Outlet/>
    </main>
  </div>
}
