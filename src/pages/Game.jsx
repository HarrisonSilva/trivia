// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
// import { fetchToken, playerLogin } from '../redux/actions';

class Game extends React.Component {
  render() {
    // const { gravatarEmail, name, isDisabled } = this.state;

    return (
      <h1>Game</h1>
    );
  }
}

// Login.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func.isRequired,
//   }).isRequired,
//   dispatch: PropTypes.func.isRequired,
// };

export default connect()(Game);
