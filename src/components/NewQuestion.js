import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false
  };
  handleChange = (e, optionName) => {
    const text = e.target.value;
    this.setState(() => ({
      [optionName]: text
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch, authedUser } = this.props;

    dispatch(
      handleAddQuestion({ optionOneText, optionTwoText, author: authedUser })
    );

    this.setState(() => ({
      text: "",
      toHome: true
    }));
  };
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div className="new-question-container">
        <h3 className="center">Create New Question</h3>
        <form className="new-question" onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter Option One Text Here"
            value={optionOneText}
            onChange={(e) => this.handleChange(e, "optionOneText")}
            className="textarea"
            maxLength={280}
          />
          OR
          <input
            placeholder="Enter Option Two Text Here"
            value={optionTwoText}
            onChange={(e) => this.handleChange(e, "optionTwoText")}
            className="textarea"
            maxLength={280}
          />
          <button
            className="btn"
            type="submit"
            disabled={optionOneText === "" || optionTwoText === ""}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default connect(mapStateToProps)(NewQuestion);
