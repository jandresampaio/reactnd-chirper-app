import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav(props) {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/add" exact>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" exact>
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/" exact>
            Hello {props.authedUser.name}
          </NavLink>
        </li>
        <li>
          <NavLink to="/" exact>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
