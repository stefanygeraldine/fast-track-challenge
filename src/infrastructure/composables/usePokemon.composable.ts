import { ref } from 'vue'
import { pokemonService } from '@/domain/services/pokemon.service'
import type { IPokemon, IPokemonFull } from '@/domain/models/pokemon.model'

export function usePokemon() {
  const pokemons = ref<IPokemon[]>([])
  const pokemonFull = ref<IPokemonFull>()
  const isFetchingPokemons = ref(false)
  const isFetchingPokemonFull = ref(false)
  const error = ref<null | unknown>(null)

  const fetchPokemons = async () => {
    isFetchingPokemons.value = true
    try {
      pokemons.value = await pokemonService.fetchPokemons()
    } catch (err) {
      error.value = err
    } finally {
      setTimeout(() => {
        isFetchingPokemons.value = false
      }, 800)
    }
  }

  const fetchPokemonFull = async (id: number) => {
    isFetchingPokemonFull.value = true
    try {
      pokemonFull.value = await pokemonService.fetchPokemonFull(id)
    } catch (err) {
      error.value = err
    } finally {
      setTimeout(() => {
        isFetchingPokemonFull.value = false
      }, 800)
    }
  }

  return {
    pokemons,
    pokemonFull,
    isFetchingPokemonFull,
    isFetchingPokemons,
    error,
    fetchPokemons,
    fetchPokemonFull
  }
}
