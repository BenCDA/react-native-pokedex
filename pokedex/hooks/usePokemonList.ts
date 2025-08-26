import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Pokemon, PokemonListResponse } from '../types/pokemon';
import { API_CONFIG } from '../constants/pokemon';
import { formatPokemonNumber, getPokemonTypeColor } from '../utils/pokemon';

interface UsePokemonListReturn {
  pokemonList: Pokemon[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const usePokemonList = (): UsePokemonListReturn => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Récupérer la liste des Pokémon
      const listResponse = await fetch(
        `${API_CONFIG.BASE_URL}/pokemon?limit=${API_CONFIG.POKEMON_LIMIT}&offset=${API_CONFIG.POKEMON_OFFSET}`
      );
      const listData: PokemonListResponse = await listResponse.json();

      // Récupérer les détails de chaque Pokémon
      const pokemonDetails = await Promise.all(
        listData.results.map(async (pokemon, index) => {
          const pokemonId = index + 1;
          
          // Détails du Pokémon
          const detailResponse = await fetch(`${API_CONFIG.BASE_URL}/pokemon/${pokemonId}`);
          const detail = await detailResponse.json();

          // Informations d'espèce pour la description
          const speciesResponse = await fetch(detail.species.url);
          const species = await speciesResponse.json();

          return {
            id: detail.id,
            name: detail.name,
            number: formatPokemonNumber(detail.id),
            types: detail.types.map((type: any) => type.type.name),
            sprites: detail.sprites,
            height: detail.height,
            weight: detail.weight,
            stats: detail.stats,
            abilities: detail.abilities.map((ability: any) => ability.ability.name),
            species: species,
            color: getPokemonTypeColor(detail.types[0].type.name),
          };
        })
      );

      setPokemonList(pokemonDetails);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Une erreur inconnue s\'est produite';
      setError(errorMessage);
      Alert.alert('Erreur', 'Impossible de charger les Pokémon');
    } finally {
      setLoading(false);
    }
  };

  return {
    pokemonList,
    loading,
    error,
    refetch: fetchPokemonList,
  };
};