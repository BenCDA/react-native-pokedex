export interface PokemonType {
  name: string;
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string;
  back_default: string;
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonSpecies {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}

export interface Pokemon {
  id: number;
  name: string;
  number: string;
  types: string[];
  sprites: PokemonSprites;
  height: number;
  weight: number;
  stats: PokemonStat[];
  abilities: string[];
  species: PokemonSpecies;
  color: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export type SortBy = 'name' | 'number';
export type ViewType = 'list' | 'detail';