import {Link} from "react-router-dom";
import React from "react";
import {User} from "../../model/User";

interface Props {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  logoutHandler: () => void;
}

export default function Header(props: Props) {
  return <nav>
    <ul>
      <li>
        <Link to="/" className="contrast">
          <strong>New Age Selling Point</strong>
        </Link>
      </li>
    </ul>
    <ul>
      <li>
        <Link to='/sales'>
          Sales
        </Link>
      </li>
      {
        !props.currentUser ? (
          <li>
            <a href="/login">Login</a>
          </li>
        ) : (
          <li>
            <a onClick={props.logoutHandler}>Logout</a>
          </li>
        )
      }
    </ul>
  </nav>;
}