import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";

class QuestionPage extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <div>
        <Question id={id} showDetail={true} />
      </div>
    );
  }
}

export default connect()(QuestionPage);
