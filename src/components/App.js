import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading";
import Nav from "./Nav";
import Login from "./Login";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authedUser, loading, users } = this.props;

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            {!loading && !authedUser && <Login />}
            {authedUser && (
              <div>
                <Nav authedUser={users[authedUser]} />
                <div>
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/question/:id" exact component={QuestionPage} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/leaderboard" component={Leaderboard} />
                </div>
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    loading: !users || !Object.keys(users).length,
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(App);
