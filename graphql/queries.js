import {gql} from '@apollo/client';

export const WELCOME_MESSAGE_QUERY = gql`
  query {
    welcomeMessage
  }
`;

// Query by name
export const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($name: String!) {
    pokemon(name: $name) {
      id
      name
      types
      spriteUrl
    }
  }
`;

// Query by ID
export const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: Int!) {
    pokemonById(id: $id) {
      id
      name
      types
      spriteUrl
    }
  }
`;
