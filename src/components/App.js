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
import Chart from "chart.js";

Chart.defaults.global.defaultFontFamily = "monospace";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authedUser, loading } = this.props;

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="app-container">
            {!loading && !authedUser && <Login />}
            {authedUser && (
              <div className="app-content">
                <Nav />
                <div className="page-content">
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
