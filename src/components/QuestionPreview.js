import React from "react";
import { Link } from "react-router-dom";

export default function QuestionPreview(props) {
  const { question, onGotoQuestion } = props;
  return (
    <Link to={`/question/${question.id}`} className="question-preview">
      <div className="question-summary">
        <div className="question-preview-text">
          ...{question.optionOne.text}
        </div>
      </div>
      <div className="question-action">
        <button onClick={(e) => onGotoQuestion(e, question.id)}>
          View Poll
        </button>
      </div>
    </Link>
  );
}
