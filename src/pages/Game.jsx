import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { scorePlayer } from '../redux/actions';
import './Game.css';

const correctAnswer = 'correct-answer';
class Game extends Component {
  state = {
    answers: [],
    questionIndex: 0,
    isLoading: true,
    time: 30,
    isDisabled: false,
    questionAnswered: false,
  };

  componentDidMount() {
    this.fetchTriviaAPI();
    this.timer();
  }

  shuffle = (info, questionIndex) => {
    const answers = [...info[questionIndex].incorrect_answers,
      info[questionIndex].correct_answer];
    const shuffleNum = 0.5;
    const num = -1;
    return answers.sort(() => ((Math.random() > shuffleNum) ? 1 : num));
  };

  fetchTriviaAPI = async () => {
    const { history } = this.props;
    // Acessamos o token salvo no localStorage, e o colocamos como endpoint para realizarmos a requisição na API do Trivia.
    const endpoint = localStorage.getItem('token');
    const URL = `https://opentdb.com/api.php?amount=5&token=${endpoint}`;
    const response = await fetch(URL);
    const data = await response.json();
    const errorCode = 3;
    // Checamos se o token é inválido, caso retorne true, será removido do localStorage, e a página será redirecionada a página de Login.
    if (data.response_code === errorCode) {
      localStorage.removeItem('token');
      // localStorage.setItem('token', '');
      return history.push('/');
    }
    // Armazenamos no estado local o array de objeto results em info. E salvamos o array de perguntas ja embaralhado em questions.
    this.setState({
      isLoading: false,
      info: data.results,
      answers: this.shuffle(data.results, 0),
    });
  };

  checkTimer = () => {
    const { time } = this.state;
    if (time === 0) {
      this.setState({ isDisabled: true });
    } else {
      this.setState({ isDisabled: false });
    }
  };

  timer = () => {
    const oneSecond = 1000;
    this.interval = setInterval(() => {
      const { time } = this.state;
      if (time > 0) {
        this.setState({
          time: time - 1,
        }, this.checkTimer);
      } else {
        clearInterval(this.interval);
      }
    }, oneSecond);
  };

  handleDifficulty = (seconds, difficulty) => {
    const { dispatch } = this.props;
    const difficultModifier = 3;
    const basePoints = 10;
    let score = 0;

    if (difficulty === 'easy') {
      score = basePoints + (seconds * 1);
    }
    if (difficulty === 'medium') {
      score = basePoints + (seconds * 2);
    }
    score = basePoints + (seconds * difficultModifier);
    dispatch(scorePlayer(score));
  };

  checkAnswer = (answer, question, index) => (
    answer === question.correct_answer ? correctAnswer : `wrong-answer-${index}`);

  answerQuestion = (time, question, name) => {
    if (name === 'correct-answer') {
      this.handleDifficulty(time, question.difficulty);
    }
    this.setState({ questionAnswered: true });
  };

  nextBtn = () => {
    const { questionIndex, info } = this.state;
    const { history } = this.props;
    const lastQuestionIndex = 4;
    if (questionIndex !== lastQuestionIndex) {
      this.setState({
        questionIndex: questionIndex + 1, // avança para a próxima pergunta
        time: 30, // quando mudar de pergunta, zera o timer
        isDisabled: false,
        questionAnswered: false,
        answers: this.shuffle(info, questionIndex + 1),
      });
    }
    if (questionIndex === lastQuestionIndex) history.push('/feedback');
  };

  render() {
    const { info, questionIndex, isLoading,
      time, isDisabled, questionAnswered, answers } = this.state;
    if (isLoading) return (<Header />);
    return (
      <>
        <Header />
        <container className="game-container">
          <div className="question-card">
            <h1 data-testid="question-category" className="categoria">
              {info[questionIndex].category}
            </h1>
            <h1 data-testid="question-text" className="question-text">
              {info[questionIndex].question}
            </h1>

            <p className="timer">
              { `Tempo restante: ${time}` }
              {' '}
              <div className="spinner" />
            </p>
            { questionAnswered && (
              <button
                className="next-btn"
                type="button"
                data-testid="btn-next"
                onClick={ this.nextBtn }
              >
                Next
              </button>

            )}
          </div>

          <div data-testid="answer-options" className="answers-container">
            {answers.map((answer, index) => (
              <button
                className={ questionAnswered
                  ? `answer-btn ${this.checkAnswer(answer, info[questionIndex], index)}`
                  : 'answer-btn' }
                type="button"
                key={ index }
                disabled={ isDisabled }
                name={ this.checkAnswer(answer, info[questionIndex], index) }
                data-testid={ this.checkAnswer(answer, info[questionIndex], index) }
                onClick={ ({ target }) => {
                  this.answerQuestion(time, info[questionIndex], target.name);
                } }
              >
                { answer }
              </button>
            ))}
          </div>

        </container>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
