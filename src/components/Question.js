import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import QuestionPreview from "./QuestionPreview";
import QuestionVote from "./QuestionVote";
import QuestionResults from "./QuestionResults";
import { isQuestionAnswered } from "../utils/helpers";

class Question extends Component {
  title = "Would you rather...";

  goToQuestion(e, id) {
    e.preventDefault();
    this.props.history.push(`/question/${id}`);
  }

  render() {
    const { question, author, authedUser, showDetail = false } = this.props;

    if (!question) {
      return <p>This Question doesn't exist</p>;
    }
    const { id } = question;
    const answered = isQuestionAnswered(question, authedUser);
    return (
      <div to={`/question/${id}`} className="question-container">
        <div className="question-author">{author.name} asks: </div>
        <div className="question">
          <div className="question-avatar">
            <img
              src={author.avatarURL}
              alt={`Avatar of ${author}`}
              className="avatar"
            />
          </div>
          <div className="question-body">
            <div className="question-title">Would you rather...</div>
            {!showDetail && (
              <QuestionPreview
                question={question}
                onGotoQuestion={(e, id) => this.goToQuestion(e, id)}
              />
            )}
            {showDetail && !answered && <QuestionVote id={id} />}
            {showDetail && answered && <QuestionResults question={question} />}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];

  return {
    authedUser,
    question,
    author: question && users && users[question.author]
  };
}

export default withRouter(connect(mapStateToProps)(Question));
