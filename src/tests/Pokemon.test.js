import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toBeInTheDocument();
    expect(namePokemon.innerHTML).toBe('Pikachu');
    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toBeInTheDocument();
    expect(typePokemon.innerHTML).toBe('Electric');
    const weightPokemon = screen.getByTestId('pokemon-weight');
    expect(weightPokemon).toBeInTheDocument();
    expect(weightPokemon.innerHTML).toBe('Average weight: 6.0 kg');
    const imgPokemon = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(imgPokemon.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test(`Teste se o card do pokémon indicado na Pokédex contém um link de
  navegação para exibir detalhes deste pokémon. O link deve possuir a URL /
  pokemons/<id>, onde <id> é o id do pokémon exibido;`, () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/25');
    });
    const checkboxFav = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkboxFav);
    const iconFav = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(iconFav).toBeInTheDocument();
    expect(iconFav.src.endsWith('/star-icon.svg')).toBeTruthy();
    expect(iconFav.alt).toBe('Pikachu is marked as favorite');
  });
});
