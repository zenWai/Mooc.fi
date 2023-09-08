import {render, screen, fireEvent, waitFor} from '@testing-library/react-native';

jest.mock('../../hooks/useSignIn', () => {
  const signInMock = jest.fn();
  return {
    useSignIn: () => [signInMock, {}]
  };
});

import SignIn from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {

      const signInMock = jest.requireMock('../../hooks/useSignIn').useSignIn()[0];
      render(<SignIn/>);

      const usernameInput = screen.getByTestId('usernameInput');
      const passwordInput = screen.getByTestId('passwordInput');
      const submitButton = screen.getByTestId('submitButton');

      fireEvent.changeText(usernameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'testpassword');
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(signInMock).toHaveBeenCalledTimes(1);
        expect(signInMock).toHaveBeenCalledWith({
          username: 'testuser',
          password: 'testpassword',
        });
      });
    });
  });
});