import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import './Header.css';

class Header extends React.Component {
  render() {
    const { gravatarEmail, name, score } = this.props;
    const hash = MD5(gravatarEmail).toString();
    const URL = `https://www.gravatar.com/avatar/${hash}`;

    return (
      <header className="header-trivia">
        <nav>
          <div className="user-data">
            <img
              className="img-profile"
              src={ URL }
              alt="Imagem de Perfil"
              data-testid="header-profile-picture"
            />
            <h2 className="header-name" data-testid="header-player-name">
              Nome:
              {name}
            </h2>
          </div>
          <button className="glowing-btn main-ti">
            <span className="glowing-txt">
              TR
              <span className="faulty-letter">I</span>
              VIA
            </span>
          </button>

          <h2 className="header-score">
            Score:
            {' '}
            <span data-testid="header-score">{score}</span>

          </h2>
        </nav>
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
