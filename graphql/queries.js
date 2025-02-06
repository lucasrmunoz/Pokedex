import {gql} from '@apollo/client';

export const WELCOME_MESSAGE_QUERY = gql`
  query {
    welcomeMessage
  }
`;

// Query by name
export const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($name: String!) {
    pokemonByName(name: $name) {
      id
      name
      type
      // Add other fields you need
    }
  }
`;

// Query by ID
export const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: ID!) {
    pokemon(id: $id) {
      id
      name
      type
      // Add other fields you need
    }
  }
`;
