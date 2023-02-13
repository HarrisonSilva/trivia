import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import logo from '../trivia.png';
import './Header.css';

class Header extends React.Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const hash = MD5(gravatarEmail).toString();
    const URL = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <header className="header-trivia">
        <p className="header-score" data-testid="header-score">
          {score}
        </p>
        <img src={ logo } className="App-logo" alt="logo" />
        <div className="player-info">
          <img
            className="img-profile"
            src={ URL }
            alt="Imagem de Perfil"
            data-testid="header-profile-picture"
          />
          <p className="header-name" data-testid="header-player-name">
            {name}
          </p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => ({
  gravatarEmail: globalState.player.gravatarEmail,
  name: globalState.player.name,
  score: globalState.player.score,
});

Header.propTypes = ({
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
});

export default connect(mapStateToProps)(Header);
