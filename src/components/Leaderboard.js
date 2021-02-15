import React, { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {
  render() {
    const { users } = this.props;

    return Object.values(users).map(
      ({ answers, questions, name, avatarURL }) => {
        debugger;
        const numAnswers = (answers && Object.keys(answers).length) || 0;
        const numQuestions = (questions && questions.length) || 0;
        const score = numAnswers + numQuestions;

        return (
          <div className="question-container">
            <div className="question-author">{name}</div>
            <div className="question">
              <div className="question-avatar">
                <img
                  src={avatarURL}
                  alt={`Avatar of ${name}`}
                  className="avatar"
                />
              </div>
              <div class="leaderboard-score">
                <div>Answered Questions: {numAnswers}</div>
                <div>Created Questions: {numQuestions}</div>
                <div>Score: {score}</div>
              </div>
            </div>
          </div>
        );
      }
    );
  }
}

function mapStateToProps({ users, questions }) {
  return {
    users,
    questions
  };
}

export default connect(mapStateToProps)(Leaderboard);
