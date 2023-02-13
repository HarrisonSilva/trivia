import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import { fetchToken, playerLogin } from '../redux/actions';

class Game extends Component {
  state = {
    questions: [],
    questionIndex: 0,
    isLoading: true,
  };

  componentDidMount() {
    this.fetchTriviaAPI();
  }

  fetchTriviaAPI = async () => {
    const { questionIndex } = this.state;
    const { history } = this.props;
    // Acessamos o token salvo no localStorage, e o colocamos como endpoint para realizarmos a requisição na API do Trivia.
    const endpoint = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${endpoint}`;
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    const errorCode = 3;
    // Checamos se o token é inválido, caso retorne true, será removido do localStorage, e a página será redirecionada a página de Login.
    if (data.response_code === errorCode) {
      localStorage.removeItem('token');
      // localStorage.setItem('token', '');
      return history.push('/');
    }
    // Desestruturamos os objetos de interesse de data, acessando o results pelo indice do número da questão de 0 a 4, sendo acessada apenas 1 pergunta por vez que a função é executada.
    const answers = data.results[questionIndex];
    // Criamos um array com todas as perguntas, e embaralhamos ela.
    const questionsTmp = [...answers.incorrect_answers, answers.correct_answer];
    const shuffleNum = 0.5;
    const num = -1;
    const questions = questionsTmp.sort(() => ((Math.random() > shuffleNum) ? 1 : num));
    // Armazenamos no estado local o array de objeto results em info. E salvamos o array de perguntas ja embaralhado em questions.
    this.setState({
      isLoading: false,
      info: data.results,
      questions,
    });
  };

  nextBtn = () => {
    const { questionIndex } = this.state;
    this.setState({
      questionIndex: questionIndex + 1,
    });
  };

  render() {
    const { info, questions, questionIndex, isLoading } = this.state;
    if (isLoading) return (<Header />);
    return (
      <>
        <h1>Game</h1>
        <Header />
        <div>
          <h1 data-testid="question-category">{info[questionIndex].category}</h1>
          <h2 data-testid="question-text">{info[questionIndex].question}</h2>
          <div data-testid="answer-options">
            {questions.map((option, index) => (
              <button
                type="button"
                key={ option }
                data-testid={ option === info[questionIndex].correct_answer
                  ? 'correct-answer' : `wrong-answer-${index}` }
              >
                { option }
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={ this.nextBtn }
          >
            Next
          </button>
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
