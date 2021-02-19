import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";

class QuestionVote extends Component {
  state = {
    selectedOption: undefined
  };

  handleVote(e) {
    e.preventDefault();
    const { dispatch, question, authedUser } = this.props;
    const { selectedOption } = this.state;
    const options = { 0: "optionOne", 1: "optionTwo" };
    dispatch(
      handleAnswerQuestion({
        qid: question.id,
        authedUser,
        answer: options[selectedOption]
      })
    );
  }

  onValueChange(e) {
    this.setState({
      selectedOption: e.target.value
    });
  }

  render() {
    const { question } = this.props;
    const { selectedOption } = this.state;
    const { optionOne, optionTwo } = question;
    const options = [optionOne, optionTwo];
    return (
      <form onSubmit={(e) => this.handleVote(e)}>
        <div className="question-vote">
          <div className="question-vote-options">
            {options.map((opt, i) => (
              <div key={i} className="radio">
                <label>
                  <input
                    type="radio"
                    value={i}
                    checked={selectedOption == i}
                    onChange={(e) => this.onValueChange(e)}
                  />
                  {opt.text}
                </label>
              </div>
            ))}
          </div>

          <div className="question-action">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps({ authedUser, questions }, { id }) {
  const question = questions[id];
  return {
    authedUser,
    question
  };
}

export default withRouter(connect(mapStateToProps)(QuestionVote));
