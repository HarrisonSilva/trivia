import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';
// import Feedback from '../pages/Feedback';
// import App from '../App';

describe('Testes da página Game', () => {
  test('Testa o temporizador', () => {
    renderWithRouterAndRedux(<Game />);
    const startTimer = screen.getByTestId('settings-title');
    expect(startTimer).toHaveTextContent('30');

    setTimeout(() => {
      expect(startTimer).toHaveTextContent('29');
    }, 1000);
  });
});
