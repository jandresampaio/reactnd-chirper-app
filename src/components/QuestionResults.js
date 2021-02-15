import React from "react";

export default function QuestionResults(props) {
  const { question } = props;
  if (!question) return null;
  const { optionOne, optionTwo } = question;
  const totalVotes = optionOne.votes.length + optionTwo.votes.length;
  return (
    <ul>
      {[optionOne, optionTwo].map((opt, i) => (
        <li key={i}>
          {opt.text} - {opt.votes.length} out of {totalVotes} - (
          {(opt.votes.length * 100) / totalVotes})%
        </li>
      ))}
    </ul>
  );
}
