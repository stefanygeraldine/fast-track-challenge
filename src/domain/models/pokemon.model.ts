export interface IPokemon {
  name?: string
  url?: string
}

export interface IPokemonFull {
  id?: string | number
  name?: string
  image?: string
  abilities?: {}
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
