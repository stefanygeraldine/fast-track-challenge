import { pokemonApi } from '@/infrastructure/axios/pokemonApi'
import { pokemonFullAdapter, pokemonListAdapter } from '@/domain/adapter'
import type { IPokemon, IPokemonFull } from '@/domain/models/pokemon.model'

export const pokemonRepository = {
  fetchPokemons: async (): Promise<IPokemon[]> => {
    return await pokemonApi
      .get('/pokemon?limit=100')
      .then((response) => pokemonListAdapter(response.data.results))
      .catch(({ response }) => {
        const message: string = response?.data?.error ?? 'Fetching error'
        throw new Error(message)
      })
  },
  fetchPokemonFull: async (id: number): Promise<IPokemonFull> => {
    return await pokemonApi
      .get(`pokemon/${id}`)
      .then((response) => pokemonFullAdapter(response.data))
      .catch(({ response }) => {
        const message: string = response?.data?.error ?? 'Fetching error'
        throw new Error(message)
      })
  }
}
