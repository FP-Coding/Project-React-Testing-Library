import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test(`Teste se a página contém um heading h2 
  com o texto Page requested not found`, () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/qualquer-url');
    });
    const title = screen.getByRole('heading', { name: /page requested not found/i });
    expect(title).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/qualquer-url');
    });
    const image = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    const srcImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(srcImage);
  });
});
