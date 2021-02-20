import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { handleReceiveQuestions } from "../actions/questions";

class Login extends Component {
  noUserSelectedValue = "nouserselectoption";
  state = {
    selectedUser: this.noUserSelectedValue
  };

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { selectedUser } = this.state;
    dispatch(setAuthedUser(selectedUser));
    dispatch(handleReceiveQuestions());
  }

  onSelectedUserChanged(e) {
    this.setState({
      selectedUser: e.target.value
    });
  }

  render() {
    const { selectedUser } = this.state;
    const { users } = this.props;
    return (
      <div className="login-page">
        <h3 className="center">Would You Rather Login?</h3>
        <div className="login-container">
          <form className="login-form" onSubmit={(e) => this.handleSubmit(e)}>
            <select
              className="login-user"
              name="users"
              id="users"
              onChange={(e) => this.onSelectedUserChanged(e)}
              value={selectedUser}
            >
              <option
                key={this.noUserSelectedValue}
                value={this.noUserSelectedValue}
                disabled
              >
                Select user:
              </option>
              {Object.values(users).map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            <button
              className="login-btn"
              type="submit"
              disabled={selectedUser === this.noUserSelectedValue}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users
  };
}

export default connect(mapStateToProps)(Login);
