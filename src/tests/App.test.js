import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste o componente <App.js />', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/');
  });
  test('O segundo link deve possuir o texto About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();
    userEvent.click(linkAbout);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/about');
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(linkFavorites).toBeInTheDocument();
    userEvent.click(linkFavorites);
    const {
      location: { pathname },
    } = history;
    expect(pathname).toBe('/favorites');
  });
  test(`Teste se a aplicação é redirecionada para a 
  página Not Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/qualquer-url');
    });
    const title = screen.getByRole('heading', { name: /page requested not found/i });
    const image = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(title).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
