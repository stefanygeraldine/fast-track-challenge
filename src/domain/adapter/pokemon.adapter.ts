import type { IPokemon, IPokemonFull } from '@/domain/models/pokemon.model'

export const pokemonListAdapter = (data: any): IPokemon[] => {
  const pokemons: IPokemon[] = []
  data.forEach((item: any) => {
    const pokemon: IPokemon = {
      name: item.name ?? '',
      url: item.url ?? ''
    }
    pokemons.push(pokemon)
  })
  return pokemons
}

export const pokemonFullAdapter = (data: any): IPokemonFull => {
  const pokemon: IPokemonFull = { types: [] }
  pokemon.id = data.id ?? ''
  pokemon.name = data.name ?? ''
  pokemon.abilities = data.abilities ?? {}
  pokemon.types = data.types ?? []
  pokemon.sprites = data.sprites ?? {
    back_default: '',
    back_female: '',
    back_shiny: '',
    back_shiny_female: '',
    front_default: '',
    front_female: '',
    front_shiny: ''
  }
  return pokemon
}
