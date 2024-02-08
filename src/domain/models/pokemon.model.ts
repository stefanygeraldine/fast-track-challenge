export interface IPokemon {
  name?: string
  url?: string
}

export interface PokeType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface IPokemonFull {
  id?: string | number
  name?: string
  image?: string
  abilities?: {}
  types?: PokeType[]
  sprites?: {
    back_default?: string
    back_female?: string
    back_shiny?: string
    back_shiny_female?: string
    front_default?: string
    front_female?: string
    front_shiny?: string
    other?: {
      dream_world?: { front_default?: string }
    }
  }
}

export enum Powers {
  water = 'water',
  fire = 'fire',
  grass = 'grass',
  ground = 'ground',
  rock = 'rock',
  steel = 'steel',
  ice = 'ice',
  electric = 'electric',
  dragon = 'dragon',
  ghost = 'ghost',
  psychic = 'psychic',
  normal = 'normal',
  fighting = 'fighting',
  poison = 'poison',
  bug = 'bug',
  flying = 'flying',
  dark = 'dark',
  fairy = 'fairy'
}
