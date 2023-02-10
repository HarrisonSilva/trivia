import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

const emailId = 'input-gravatar-email';
const nameId = 'input-player-name';

beforeEach(() => {
  renderWithRouterAndRedux(<App />);
});

describe('Testes da página principal (Login)', () => {
  test('Testa se os botões são renderizados com os textos corretos', () => {
    const playButton = screen.getByRole('button', { name: /Play/i });
    const settingsButton = screen.getByRole('button', { name: /Configuração/i });

    expect(playButton).toBeInTheDocument();
    expect(settingsButton).toBeInTheDocument();
  });

  test('Testa se os inputs são renderizados', () => {
    const emailInput = screen.getByTestId(emailId);
    const nameInput = screen.getByTestId(nameId);

    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
  });

  test('Testa a validação dos campos de email e nome', () => {
    const emailInput = screen.getByTestId(emailId);
    const nameInput = screen.getByTestId(nameId);
    const playButton = screen.getByRole('button', { name: /Play/i });

    expect(playButton).toBeDisabled();

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(nameInput, 'teste');

    expect(playButton).toBeEnabled();
  });

  test('Testa se o botão Play navega para a página correta', () => {
    const emailInput = screen.getByTestId(emailId);
    const nameInput = screen.getByTestId(nameId);
    const playButton = screen.getByRole('button', { name: /Play/i });

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(nameInput, 'teste');
    userEvent.click(playButton);

    const playerName = screen.getByTestId('header-player-name');

    expect(playerName).toBeInTheDocument();
  });

  test('Testa se o botão Configuração navega para a página correta', () => {
    const settingsButton = screen.getByRole('button', { name: /Configuração/i });

    userEvent.click(settingsButton);

    const settingsTitle = screen.getByRole('heading', /Configuração/i);

    expect(settingsTitle).toBeInTheDocument();
  });
});