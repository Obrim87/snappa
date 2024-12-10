import { render, screen } from '@testing-library/react';
import SignIn from './SignIn';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

jest.mock('../utils/config.ts', () => ({
  apiBaseUrl: 'http://localhost:3001',
}));

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: (initial: boolean) => [initial, mockSetState],
// }));

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

jest.mock('axios');
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('SignIn component', () => {
  beforeEach(() => {
    const mockSetState = jest.fn();

    render(
      <MemoryRouter>
        <SignIn setSignedIn={mockSetState} />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when called', () => {
    test('signin form should render', () => {
      expect(screen.findAllByText('Sign in to Your Account')).toBeTruthy();
      expect(screen.findByPlaceholderText('Email')).toBeTruthy();
      expect(screen.findByPlaceholderText('Password')).toBeTruthy();
    });
  });

  describe('when submitting valid data via the form', () => {
    it('should sent a post request to axios', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByPlaceholderText('Email'));
      await user.keyboard('me@mail.com');
      await user.tab();
      await user.keyboard('hello');
      await user.click(screen.getByTestId('submitButton'));

      expect(mockedAxios.post).toHaveBeenCalled();
    });
  });

  describe('when submitting invalid data via the form', () => {
    it('entering no data', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('submitButton'));

      expect(mockedAxios.post).not.toHaveBeenCalled();
    });

    it('entering invalid email', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByPlaceholderText('Email'));
      await user.keyboard('myEmail.com');
      await user.click(screen.getByTestId('submitButton'));

      expect(mockedAxios.post).not.toHaveBeenCalled();
    });

    it('entering no password', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByPlaceholderText('Email'));
      await user.keyboard('me@mail.com');
      await user.click(screen.getByTestId('submitButton'));

      expect(mockedAxios.post).not.toHaveBeenCalled();
    });
  });

  describe('when clicking the Need an Account? link', () => {
    it.only('should render the sign up form', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByText('Need an Account?'));

      expect(screen.queryByText('Sign up for an Account')).toBeTruthy();
      expect(screen.findByText('Create My Account')).toBeTruthy();
    });
  });
});

// figure out how to test Links!
