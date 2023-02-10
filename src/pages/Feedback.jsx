import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const minNumberOfAnswers = 3;
    return (
      <div>
        <p
          data-testid="feedback-text"
        >
          {assertions < minNumberOfAnswers ? 'Could be better...'
            : 'Well Done!'}

        </p>

        <p data-testid="feedback-total-score">
          {score}
        </p>
        <p data-testid="feedback-total-question">
          {assertions}
        </p>
        <button
          onClick={ this.playAgain }
          data-testid="btn-play-again"
          type="button"
        >
          Play Again
        </button>
        <button
          onClick={ this.goToRanking }
          data-testid="btn-ranking"
          type="button"
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
