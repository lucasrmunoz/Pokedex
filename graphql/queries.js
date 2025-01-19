import {gql} from '@apollo/client';

export const WELCOME_MESSAGE_QUERY = gql`
  query {
    welcomeMessage
  }
`;
