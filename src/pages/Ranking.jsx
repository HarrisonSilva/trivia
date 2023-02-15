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

      <>
        <div className="animation-container">
          <h1 data-testid="ranking-title" className="title-ranking">Ranking</h1>
        </div>
        <div className="ranking">
          {ranking.map((player, index) => (<PlayerScore
            key={ index }
            player={ player }
            className="player-ranking"
            index={ index }
          />))}
        </div>
        <div className="btn-container">
          <button
            className="go-home-btn"
            onClick={ this.goHome }
            data-testid="btn-go-home"
            type="button"
          >
            Return to Login
          </button>
        </div>

      </>

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
