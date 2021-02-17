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
          <li>Hello {users[authedUser].name}</li>
          <li onClick={(e) => this.logout()}>Logout</li>
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
