import React from "react";

export default function QuestionPreview(props) {
  const { question, onGotoQuestion } = props;
  return (
    <div>
      <div className="question-summary">
        <div className="question-title">Would you rather...</div>
        <div className="question-preview">...{question.optionOne.text}</div>
      </div>
      <div className="question-navigate">
        <button onClick={(e) => onGotoQuestion(e, question.id)}>
          View Poll
        </button>
      </div>
    </div>
  );
}
