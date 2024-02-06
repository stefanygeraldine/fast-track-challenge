import { pokemonRepository } from '@/infrastructure/repositories/pokemon.repository'
export const pokemonService = {
  fetchPokemons: pokemonRepository.fetchPokemons,
  fetchPokemonFull: pokemonRepository.fetchPokemonFull
}
