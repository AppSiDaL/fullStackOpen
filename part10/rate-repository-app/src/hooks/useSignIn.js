import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { SIGN_USER } from '../graphql/mutations';

import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const [login, result] = useMutation(SIGN_USER, {
    onError: (error) => {
      console.log(error);
    },
  });

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await login({
        variables: {
          credentials: {
            username,
            password,
          },
        },
      });
      await authStorage.setAccessToken(data.authenticate.accessToken);
      client.resetStore();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return [signIn];
};

export default useSignIn;
