import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PlayerScore.css';

class PlayerScore extends Component {
  render() {
    const { player: { picture, name, score }, index } = this.props;
    return (
      <div
        className="container-player-score"
      >
        <img
          className="img-profile"
          src={ picture }
          alt="Imagem de Perfil"
          data-testid="header-profile-picture"
        />
        <p className="player-name" data-testid={ `player-name-${index}` }>
          {name}
        </p>
        <p className="player-score" data-testid={ `player-score-${index}` }>
          {score}
        </p>
      </div>
    );
  }
}

PlayerScore.propTypes = {
  player: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default PlayerScore;
