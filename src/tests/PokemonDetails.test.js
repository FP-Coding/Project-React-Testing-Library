import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import data from '../data';

describe(' Teste o componente <PokemonDetails.js />', () => {
  test(`Teste se as informações detalhadas 
  do pokémon selecionado são mostradas na tela:`, () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/25');
    });
    const titleNameDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(titleNameDetails).toBeInTheDocument();
    const btnDetails = screen.queryByRole('link', { name: /more details/i });
    expect(btnDetails).toBeNull();
    const titleSummary = screen.getByRole('heading', { name: /summary/i });
    expect(titleSummary).toBeInTheDocument();
    const textPart1 = 'This intelligent Pokémon roasts hard berries ';
    const textPart2 = 'with electricity to make them tender enough to eat.';
    const summaryText = screen.getByText(textPart1 + textPart2);
    expect(summaryText).toBeInTheDocument();
  });
  test(`Teste se existe na página uma seção com os mapas contendo as
  localizações do pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemons/25');
    });
    const titleLocation = screen.getByRole('heading', { name: /locations/i });
    expect(titleLocation).toBeInTheDocument();
    const pikachuData = data[0];
    const { foundAt } = pikachuData;
    foundAt.forEach((el) => {
      const paragraph = screen.getByText(el.location);
      expect(paragraph).toBeInTheDocument();
    });
    const locations = screen.getAllByRole('img', { name: 'Pikachu location' });
    locations.forEach((el) => {
      const verifySrc = foundAt.some(({ map }) => map === el.src);
      expect(verifySrc).toBeTruthy();
    });
    const locationsQuantity = locations.length;
    expect(locationsQuantity).toBe(foundAt.length);
    const labelFavorite = screen.getByText(/pokémon favoritado\?/i);
    expect(labelFavorite).toBeInTheDocument();
  });
});
