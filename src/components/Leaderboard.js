import React, { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {
  render() {
    const { users } = this.props;
    const userSummary = Object.values(users).map(
      ({ answers, questions, name, avatarURL }) => {
        const numAnswers = (answers && Object.keys(answers).length) || 0;
        const numQuestions = (questions && questions.length) || 0;
        const score = numAnswers + numQuestions;
        return {
          name,
          avatarURL,
          numAnswers,
          numQuestions,
          score,
          color: score >= 10 ? "gold" : score >= 5 ? "silver" : "#c1997d"
        };
      }
    );

    const sortedByScore = Object.values(userSummary).sort(
      (a, b) => b.score - a.score
    );

    return (
      <div className="leaderboard-container">
        {sortedByScore.map(
          ({ numAnswers, numQuestions, name, avatarURL, score, color }) => {
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
                  <div className="leaderboard-summary">
                    <div>Answered Questions: {numAnswers}</div>
                    <div>Created Questions: {numQuestions}</div>
                  </div>
                  <div
                    style={{ backgroundColor: color }}
                    className="leaderboard-score"
                  >
                    {score}
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
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
