import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// import Header from '../components/Header';
// import { fetchToken, playerLogin } from '../redux/actions';
import './Ranking.css';

class Ranking extends React.Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    // const { gravatarEmail, name, isDisabled } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          className="go-home-btn"
          onClick={ this.goHome }
          data-testid="btn-go-home"
          type="button"
        >
          Return to Login
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
