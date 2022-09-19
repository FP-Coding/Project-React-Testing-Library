import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test(`Teste se é exibida na tela a mensagem No favorite pokemon found,
  caso a pessoa não tenha pokémons favoritos;`, () => {
    renderWithRouter(<FavoritePokemons />);
    const textNotFoundPokemons = screen.getByText(/no favorite pokemon found/i);
    expect(textNotFoundPokemons).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/25');
    });
    const favoritar = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoritar);
    act(() => {
      history.push('/favorites');
    });
    const textNotFoundPokemons = screen.queryByText(/no favorite pokemon found/i);
    expect(textNotFoundPokemons).toBeNull();
  });
});
