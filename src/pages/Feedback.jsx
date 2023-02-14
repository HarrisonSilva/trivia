import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './Feedback.css';

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
      <>
        <Header />
        <main>
          {/* <img
            className="img"
            src={ URL }
            alt="Imagem de Perfil"
            data-testid="header-profile-picture"
          /> */}
          <container className="container-feedback">
            <div className="feedback-main">
              <p data-testid="feedback-text" className="titlef">
                {assertions < minNumberOfAnswers ? 'Could be better...'
                  : 'Well Done!'}
              </p>

              <p data-testid="feedback-total-question" className="acertos">
                Você acertou
                {' '}
                {assertions}
                {' '}
                questões!
              </p>
              <p data-testid="feedback-total-score" className="score">
                Um total de
                {' '}
                {score}
                {' '}
                pontos!
              </p>

            </div>
          </container>
          <container className="btn-container">
            <button
              className="play-again-btn"
              onClick={ this.playAgain }
              data-testid="btn-play-again"
              type="button"
            >
              Play Again
            </button>
            <button
              className="ranking-btn"
              onClick={ this.goToRanking }
              data-testid="btn-ranking"
              type="button"
            >
              Ranking
            </button>
          </container>
        </main>
      </>
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
