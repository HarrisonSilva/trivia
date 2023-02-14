import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import PlayerScore from '../components/PlayerScore';
// import Header from '../components/Header';
// import { fetchToken, playerLogin } from '../redux/actions';
import './Ranking.css';

class Ranking extends React.Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.getRanking();
  }

  getRanking = () => {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking });
  };

  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { ranking.map((player, index) => (<PlayerScore
          key={ index }
          player={ player }
          index={ index }
        />))}
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
