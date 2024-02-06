import axios from 'axios'
const baseUrl = 'https://pokeapi.co/api/v2'
export const pokemonApi = axios.create({
  baseURL: baseUrl
})
