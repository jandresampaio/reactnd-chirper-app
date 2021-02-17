import React, { Component } from "react";
import { connect } from "react-redux";

class Leaderboard extends Component {
  render() {
    const { users, questions } = this.props;
    const userSummary = this.initializeUserSummary(users);
    const sortedByScore = this.getUpdatedScoresFromQuestions(
      questions,
      userSummary
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
                    style={{
                      backgroundColor:
                        score >= 10 ? "gold" : score >= 5 ? "silver" : "#c1997d"
                    }}
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

  getUpdatedScoresFromQuestions(questions, userSummary) {
    let allAnswers = [];
    Object.values(questions).forEach((question) => {
      const { author, optionOne, optionTwo } = question;
      allAnswers = [...allAnswers, ...optionOne.votes, ...optionTwo.votes];
      userSummary[author].numQuestions += 1;
    });
    allAnswers.forEach((user) => (userSummary[user].numAnswers += 1));
    Object.values(userSummary).forEach(
      (user) => (user.score = user.numQuestions + user.numAnswers)
    );

    const sortedByScore = Object.values(userSummary).sort(
      (a, b) => b.score - a.score
    );
    return sortedByScore;
  }

  initializeUserSummary(users) {
    return Object.values(users).reduce((acc, { id, name, avatarURL }) => {
      acc[id] = {
        id,
        name,
        avatarURL,
        numAnswers: 0,
        numQuestions: 0,
        score: () => acc[id].numAnswers + acc[id].numQuestions
      };
      return acc;
    }, {});
  }
}

function mapStateToProps({ users, questions }) {
  return {
    users,
    questions
  };
}

export default connect(mapStateToProps)(Leaderboard);
