import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import BodyMassIndexForm from '../components/SignIn';

// Mock del hook useSignIn para evitar llamadas a la red durante las pruebas
jest.mock('../hooks/useSignIn', () => () => {
  return [async () => ({ data: { accessToken: 'mocked-token' } })];
});

describe('BodyMassIndexForm', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText, getByText } = render(<BodyMassIndexForm />);
    
    const usernameInput = getByPlaceholderText('UserName');
    const passwordInput = getByPlaceholderText('PassWord');
    const loginButton = getByText('Login');
    
    expect(usernameInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(loginButton).toBeDefined();
  });

  it('should call handleSubmit on button press', () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<BodyMassIndexForm handleSubmitTest={handleSubmit} />);
    
    const loginButton = getByText('Login');
    
    fireEvent.press(loginButton);
    
    expect(handleSubmit).toHaveBeenCalled();
  });
});
