import React, { useState } from 'react';
import { Pokemon, ViewType } from '../../types/pokemon';
import { usePokemonList } from '../../hooks/usePokemonList';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { PokemonList } from '../../components/pokemon/PokemonList';
import { PokemonDetail } from '../../components/pokemon/PokemonDetail';

const PokedexApp: React.FC = () => {
  const { pokemonList, loading } = usePokemonList();
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedPokemon(null);
  };

  const handlePokemonNavigation = (direction: 'prev' | 'next') => {
    if (!selectedPokemon || pokemonList.length === 0) return;

    const currentIndex = pokemonList.findIndex(p => p.id === selectedPokemon.id);
    let newIndex: number;

    if (direction === 'next') {
      newIndex = currentIndex + 1 >= pokemonList.length ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex - 1 < 0 ? pokemonList.length - 1 : currentIndex - 1;
    }

    setSelectedPokemon(pokemonList[newIndex]);
  };

  // État de chargement
  if (loading) {
    return <LoadingScreen />;
  }

  // Vue détail du Pokémon
  if (currentView === 'detail' && selectedPokemon) {
    return (
      <PokemonDetail
        pokemon={selectedPokemon}
        pokemonList={pokemonList}
        onBack={handleBackToList}
        onNavigate={handlePokemonNavigation}
      />
    );
  }

  // Vue liste des Pokémon
  return (
    <PokemonList
      pokemonList={pokemonList}
      onPokemonSelect={handlePokemonSelect}
    />
  );
};

export default PokedexApp;