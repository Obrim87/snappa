import { render, screen } from '@testing-library/react';
import About from './About';

jest.mock('../utils/config.ts', () => ({
  apiBaseUrl: 'http://localhost:3001',
}));

describe('About component', () => {
  describe('when called', () => {
    test('main heading should render', async () => {
      render(<About />);

      expect(screen.getByText('What is Snappa?')).toBeTruthy();
    });

    test('subheadings should render', async () => {
      render(<About />);

      expect(screen.getByText('Equipment')).toBeTruthy();
      expect(screen.getByText('Setup')).toBeTruthy();
      expect(screen.getByText('Rules')).toBeTruthy();
    });

    test('text content should render', async () => {
      render(<About />);

      const textArr = [
        'Table',
        'Set up a string across the middle of the table',
        'In the Snappa drinking game, teams ',
        '2 Points: For "sinking" into one of the other team\'s glasses',
        'The winner of the game is whoever gets to 7 points first',
      ];

      for (const text of textArr) {
        expect(screen.getAllByText(text, { exact: false })).toBeTruthy();
      }
    });
  });
});
