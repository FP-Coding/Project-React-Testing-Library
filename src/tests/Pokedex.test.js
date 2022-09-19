import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import data from '../data';

const verifyClickNextPokemon = (btn, arrayData) => {
  arrayData.forEach((element, index, arr) => {
    const ULTIMO_INDICE_ARRAY = arr.length - 1;
    if (index !== ULTIMO_INDICE_ARRAY) {
      const pokemon = screen.getByText(element.name);
      expect(pokemon).toBeInTheDocument();
      userEvent.click(btn);
      const nextElement = arr[index + 1];
      const NextPokemon = screen.getByText(nextElement.name);
      expect(NextPokemon).toBeInTheDocument();
    } else {
      const pokemon = screen.getByText(element.name);
      expect(pokemon).toBeInTheDocument();
      userEvent.click(btn);
      const nextElement = arr[0];
      const NextPokemon = screen.getByText(nextElement.name);
      expect(NextPokemon).toBeInTheDocument();
    }
  });
};

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons;', () => {
    renderWithRouter(<App />);
    const titleSecundary = screen.getByRole('heading', {
      name: /encountered pokémons/i,
      level: 2,
    });
    expect(titleSecundary).toBeInTheDocument();
  });
  test(`este se é exibido o próximo pokémon da lista quando o botão
  Próximo pokémon é clicado`, () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(buttonNextPokemon).toBeInTheDocument();
    verifyClickNextPokemon(buttonNextPokemon, data);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const btnFilters = screen.getAllByTestId('pokemon-type-button');
    const verifyFilters = btnFilters.reduce((acc, { innerHTML }) => {
      if (!acc[innerHTML]) {
        acc[innerHTML] = 0;
      }
      acc[innerHTML] += 1;
      return acc;
    }, {});
    const quantity = Object.entries(verifyFilters);
    const verifyQuantity = quantity.some((element) => element[1] === 1);
    expect(verifyQuantity).toBeTruthy();
    userEvent.click(btnFilters[0]);
    const buttonNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const AtualPokemonType = screen.getByTestId('pokemon-type');
    expect(AtualPokemonType.innerHTML).toBe('Electric');
    userEvent.click(buttonNextPokemon);
    const nextPokemonType = screen.getByTestId('pokemon-type');
    expect(nextPokemonType.innerHTML).toBe('Electric');
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const clearFilter = screen.getByRole('button', { name: /all/i });
    expect(clearFilter).toBeInTheDocument();
    userEvent.click(clearFilter);
    verifyClickNextPokemon(buttonNextPokemon, data);
  });
});
