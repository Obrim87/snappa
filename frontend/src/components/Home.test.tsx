import { render, screen } from '@testing-library/react';
import Home from './Home';

jest.mock('../utils/config.ts', () => ({
  apiBaseUrl: 'http://localhost:3001',
}));

describe('Home component', () => {
  describe('when called', () => {
    test('should render content', async () => {
      render(<Home />);

      expect(screen.getByAltText('bro throwing a dice')).toBeTruthy();
    });
  });
});
