import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import About from '../pages/About';
import renderWithRouter from './helpers/renderWithRouter';

describe(' Teste o componente <About.js />', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const titleAboutPokedex = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(titleAboutPokedex).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img', { name: 'Pokédex' });
    const endOfAdressImage = 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src.endsWith(endOfAdressImage)).toBeTruthy();
  });
});
