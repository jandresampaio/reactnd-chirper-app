import React, { Component } from "react";
import Chart from "chart.js";

export default class QuestionResults extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const { question, authedUser } = this.props;
    if (!question) return null;
    const { optionOne, optionTwo } = question;
    const optionOneVotes = optionOne.votes.length;
    const optionTwoVotes = optionTwo.votes.length;
    const authedUserOption = optionOne.votes.includes(authedUser)
      ? optionOne
      : optionTwo;
    const totalVotes = optionOneVotes + optionTwoVotes;
    const labels = [optionOne, optionTwo].map(
      (opt) =>
        (authedUserOption == opt ? `(You voted) ` : "") +
        `${opt.text} - ${opt.votes.length} out of ${totalVotes} - (${
          (opt.votes.length * 100) / totalVotes
        })%`
    );

    const data = {
      labels,
      datasets: [
        {
          backgroundColor: ["#ffcd56", "#36a2eb"],

          data: [optionOneVotes, optionTwoVotes]
        }
      ]
    };

    this.myChart = new Chart(this.canvasRef.current, {
      type: "pie",
      data,
      options: {
        tooltips: {
          enabled: true
        }
      }
    });
  }

  render() {
    return <canvas style={{ height: "400px" }} ref={this.canvasRef} />;
  }
}
