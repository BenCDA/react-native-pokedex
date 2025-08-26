export const TYPE_COLORS = {
  normal: '#A8A878',
  fighting: '#C03028',
  flying: '#A890F0',
  poison: '#A040A0',
  ground: '#E0C068',
  rock: '#B8A038',
  bug: '#A8B820',
  ghost: '#705898',
  steel: '#B8B8D0',
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  psychic: '#F85888',
  ice: '#98D8D8',
  dragon: '#7038F8',
  dark: '#705848',
  fairy: '#EE99AC',
} as const;

export const API_CONFIG = {
  BASE_URL: 'https://pokeapi.co/api/v2',
  POKEMON_LIMIT: 151,
  POKEMON_OFFSET: 0,
} as const;

export const UI_CONFIG = {
  COLORS: {
    PRIMARY: '#DC143C',
    WHITE: '#FFFFFF',
    GRAY: '#666666',
    LIGHT_GRAY: '#F0F0F0',
    BLACK: '#333333',
  },
  DIMENSIONS: {
    BORDER_RADIUS: 12,
    CARD_SHADOW_OPACITY: 0.2,
    STAT_BAR_HEIGHT: 6,
    STAT_MAX_VALUE: 200,
  },
} as const;