import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchToken, playerLogin } from '../redux/actions';
import './Login.css';

class Login extends React.Component {
  state = {
    gravatarEmail: '',
    name: '',
    isDisabled: true,
    minLength: 0,
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { name, gravatarEmail } = this.state;
    dispatch(playerLogin({ name, gravatarEmail }));
    await fetchToken();
    history.push('/game');
    // const time = 100;
    // setTimeout(() => { history.push('/game'); }, time);
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.validateAll);
  };

  validateAll = () => {
    const { name, gravatarEmail, minLength } = this.state;
    if (name.length > minLength && gravatarEmail.length > minLength) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleSettings = (e) => {
    e.preventDefault();
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { gravatarEmail, name, isDisabled } = this.state;

    return (
      <div className="container">
        <form className="form-login">
          <label htmlFor="input-player-name">
            <input
              className="input-login"
              type="text"
              data-testid="input-player-name"
              id="input-player-name"
              placeholder="Digite seu nome"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            <input
              className="input-login"
              type="text"
              data-testid="input-gravatar-email"
              id="input-gravatar-email"
              placeholder="Digite seu email"
              name="gravatarEmail"
              value={ gravatarEmail }
              onChange={ this.handleChange }
            />
          </label>
          <button
            className="glowing-btn"
            type="button"
            data-testid="btn-play"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            <span className="glowing-txt">
              P
              <span className="faulty-letter">L</span>
              AY
            </span>
          </button>
          <button
            className="btn-configura"
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettings }

          >
            Configuração
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
