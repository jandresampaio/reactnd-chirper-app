import React, { Component } from "react";
import { connect } from "react-redux";
import { handleReceiveQuestions } from "../actions/questions";
import Question from "./Question";
import { isQuestionAnswered } from "../utils/helpers";
class Dashboard extends Component {
  state = {
    showAnswered: false,
    filters: ["Unanswered Questions", "Answered Questions"]
  };
  componentDidMount() {
    this.props.dispatch(handleReceiveQuestions());
  }

  handleFilterChange({ showAnswered }) {
    this.setState({
      showAnswered
    });
  }

  render() {
    const { questions, authedUser } = this.props;
    const { showAnswered } = this.state;
    const questionsWithStatus = Object.entries(questions).reduce(
      (acc, [id, question]) => {
        const answered = isQuestionAnswered(question, authedUser);
        const visible =
          (showAnswered && answered) || (!showAnswered && !answered);
        if (!visible) return acc;
        acc[id] = {
          ...question,
          answered
        };
        return acc;
      },
      {}
    );

    const questionIds =
      (questions &&
        Object.keys(questionsWithStatus).sort(
          (a, b) => questions[b].timestamp - questions[a].timestamp
        )) ||
      [];

    return (
      <div className="dashboard-container">
        <div className="dashboard">
          <nav className="nav-questions">
            <ul>
              <li
                onClick={(e) =>
                  this.handleFilterChange({ showAnswered: false })
                }
              >
                Unanswered Questions
              </li>
              <li
                onClick={(e) => this.handleFilterChange({ showAnswered: true })}
              >
                Answered Questions
              </li>
            </ul>
          </nav>
          <ul className="dashboard-list">
            {questionIds.map((id) => (
              <li key={id}>{<Question id={id} />}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser }) {
  return {
    questions,
    authedUser
  };
}

export default connect(mapStateToProps)(Dashboard);
