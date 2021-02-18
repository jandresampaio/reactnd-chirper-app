import React, { Component } from "react";
import { connect } from "react-redux";
import Chart from "chart.js";

class Leaderboard extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const { users, questions } = this.props;
    const userSummary = this.initializeUserSummary(users);
    const sortedByScore = this.getUpdatedScoresFromQuestions(
      questions,
      userSummary
    );

    this.myChart = new Chart(this.canvasRef.current, {
      type: "bar",
      height: 400,
      plugins: [
        {
          afterDraw: (chart) => {
            debugger;
            var ctx = chart.chart.ctx;
            var xAxis = chart.scales["x-axis-0"];
            xAxis.ticks.forEach((value, index) => {
              var x = xAxis.getPixelForTick(index);
              var yAxis = chart.scales["y-axis-0"];
              var image = new Image();
              image.src = userSummary[value].avatarURL;
              ctx.drawImage(image, x - 12, yAxis.bottom + 10);
              ctx.restore();
            });
          }
        }
      ],
      options: {
        layout: {
          padding: {
            bottom: 140,
            right: 15
          }
        },
        maintainAspectRatio: false,

        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: "Score"
              }
            }
          ]
        }
      },

      data: {
        labels: sortedByScore.map((d) => d.id),
        datasets: [
          {
            label: "Created Questions",
            data: sortedByScore.map((d) => d.numQuestions),
            backgroundColor: "#8caac3"
          },
          {
            label: "Answers",
            data: sortedByScore.map((d) => d.numAnswers),
            backgroundColor: "#397cb6"
          }
        ]
      }
    });
  }

  render() {
    return <canvas style={{ height: "400px" }} ref={this.canvasRef} />;

    // return (
    //   <div className="leaderboard-container">
    //     {sortedByScore.map(
    //       ({ numAnswers, numQuestions, name, avatarURL, score, color }) => {
    //         return (
    //           <div className="question-container">
    //             <div className="question-author">{name}</div>
    //             <div className="question">
    //               <div className="question-avatar">
    //                 <img
    //                   src={avatarURL}
    //                   alt={`Avatar of ${name}`}
    //                   className="avatar"
    //                 />
    //               </div>
    //               <div className="leaderboard-summary">
    //                 <div>Answered Questions: {numAnswers}</div>
    //                 <div>Created Questions: {numQuestions}</div>
    //               </div>
    //               <div
    //                 style={{
    //                   backgroundColor:
    //                     score >= 10 ? "gold" : score >= 5 ? "silver" : "#c1997d"
    //                 }}
    //                 className="leaderboard-score"
    //               >
    //                 {score}
    //               </div>
    //             </div>
    //           </div>
    //         );
    //       }
    //     )}
    //   </div>
    // );
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
