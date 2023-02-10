import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import App from '../App';

describe('Testes da página de Ranking', () => {
  test('Testa o título', () => {
    renderWithRouterAndRedux(<Ranking />);
    const rankingTitle = screen.getByTestId('ranking-title');
    expect(rankingTitle).toHaveTextContent(/Ranking/i);
  });

  test('Testa o botão Retorn ao Login', () => {
    const rankingPath = '/ranking';
renderWithRouterAndRedux(<App />, { player: { assertions: 4, score: 0} }, rankingPath);
    const returnButton = screen.getByTestId('btn-go-home');

    userEvent.click(returnButton);

    const playButton = screen.getByRole('button', { name: /Play/i });

    expect(playButton).toBeInTheDocument();
  });
});
