import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';
import App from '../App';

describe('Testes da página de Feedback', () => {
  test('Testa a mensagem Could be better...', () => {
    renderWithRouterAndRedux(<Feedback />);
    const menssage = screen.getByTestId('feedback-text');
    expect(menssage).toHaveTextContent('Could be better...');
  });

  test('Testa a mensagem Well Done!', () => {
    renderWithRouterAndRedux(<Feedback />, { player: { assertions: 5 } });
    const menssage = screen.getByTestId('feedback-text');
    expect(menssage).toHaveTextContent('Well Done!');
  });

  test('Testa se o número de respostas corretas e o score são renderizados', () => {
    renderWithRouterAndRedux(<Feedback />);
    const score = screen.getByTestId('feedback-total-score');
    const assertions = screen.getByTestId('feedback-total-question');
    
    expect(score).toBeInTheDocument();
    expect(assertions).toBeInTheDocument();
  });

  test('Testa se o botão Play Again navega para a página correta', () => {
    const feedbackPath = '/feedback';
    renderWithRouterAndRedux(<App />, { player: { assertions: 4, score: 0} }, feedbackPath);
    const playAgainButton = screen.getByRole('button', { name: /Play Again/i });
    userEvent.click(playAgainButton);

    // expect(history.location.pathname).toBe('/');
    const playButton = screen.getByRole('button', { name: /Play/i });

    expect(playButton).toBeInTheDocument();
  });

  test('Testa se o botão Ranking navega para a página correta', () => {
    const feedbackPath = '/feedback';
    renderWithRouterAndRedux(<App />, { player: { assertions: 4, score: 0} }, feedbackPath);
    const rankingButton = screen.getByTestId('btn-ranking');
    
    userEvent.click(rankingButton);
    // expect(history.location.pathname).toBe('/');
    const rankingTitle = screen.getByTestId('ranking-title');

    expect(rankingTitle).toBeInTheDocument();
  });
});
