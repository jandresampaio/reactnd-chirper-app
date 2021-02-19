import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authedUser";
class Nav extends Component {
  logout() {
    this.props.dispatch(logout(this.props.authedUser.id));
  }

  render() {
    const { authedUser, users } = this.props;
    const user = users[authedUser];
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
          <li className="nav-user">
            <img src={user.avatarURL} />
            <span> Hello {" " + user.name}</span>
          </li>
          <li className="nav-logout" onClick={(e) => this.logout()}>
            <NavLink to="/" exact activeClassName="">
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  };
}

export default connect(mapStateToProps, undefined, undefined, { pure: false })(
  Nav
);
