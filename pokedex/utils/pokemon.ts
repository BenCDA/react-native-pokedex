import { Pokemon, SortBy } from '../types/pokemon';
import { TYPE_COLORS } from '../constants/pokemon';

export const formatPokemonNumber = (id: number): string => {
  return String(id).padStart(3, '0');
};

export const formatPokemonName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const getPokemonTypeColor = (typeName: string): string => {
  return TYPE_COLORS[typeName as keyof typeof TYPE_COLORS] || '#68A090';
};

export const filterPokemon = (pokemonList: Pokemon[], searchQuery: string): Pokemon[] => {
  if (!searchQuery.trim()) return pokemonList;
  
  const query = searchQuery.toLowerCase();
  return pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(query) ||
    pokemon.number.includes(query)
  );
};

export const sortPokemon = (pokemonList: Pokemon[], sortBy: SortBy): Pokemon[] => {
  return [...pokemonList].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return parseInt(a.number) - parseInt(b.number);
  });
};

export const getPokemonDescription = (pokemon: Pokemon): string => {
  const englishEntry = pokemon.species.flavor_text_entries?.find(
    entry => entry.language.name === 'en'
  );
  return englishEntry?.flavor_text.replace(/[\f\n\r]/g, ' ') || 'No description available.';
};

export const formatPokemonWeight = (weight: number): string => {
  return `${weight / 10} kg`;
};

export const formatPokemonHeight = (height: number): string => {
  return `${height / 10} m`;
};

export const formatPokemonAbilities = (abilities: string[]): string => {
  return abilities
    .map(ability => formatPokemonName(ability))
    .join('\n');
};

export const getStatPercentage = (value: number, maxValue: number = 200): number => {
  return Math.min((value / maxValue) * 100, 100);
};