import { gql } from '@apollo/client';

export const SIGN_USER = gql`
mutation {
  authenticate(credentials: { username: "kalle", password: "password" }) {
    accessToken
  }
}
`;
