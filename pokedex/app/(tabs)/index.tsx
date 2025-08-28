import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Pokemon, ViewType } from '../../types/pokemon';
import { usePokemonList } from '../../hooks/usePokemonList';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { PokemonList } from '../../components/pokemon/PokemonList';
import { PokemonDetail } from '../../components/pokemon/PokemonDetail';
import { UI_CONFIG } from '../../constants/pokemon';

const translations: Record<'en' | 'fr', Record<string, string>> = {
  en: { switchLang: 'Switch to French' },
  fr: { switchLang: 'Changer en anglais' },
};

const PokedexApp: React.FC = () => {
  const [locale, setLocale] = useState<'en' | 'fr'>('en');
  const { pokemonList, loading, refetch } = usePokemonList(locale);
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const t = (key: string) => translations[locale][key] || key;

  // Recharger la liste quand la langue change
  useEffect(() => {
    refetch(locale);
  }, [locale]);

  // Mettre à jour le Pokémon sélectionné quand la langue change
  useEffect(() => {
    if (selectedPokemon && pokemonList.length > 0) {
      const updated = pokemonList.find(p => p.id === selectedPokemon.id);
      if (updated) setSelectedPokemon(updated);
    }
  }, [locale, pokemonList]);

  const toggleLanguage = () => setLocale(prev => (prev === 'fr' ? 'en' : 'fr'));

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

  if (loading) return <LoadingScreen />;

  return (
    <View style={{ flex: 1 }}>
      {currentView === 'detail' && selectedPokemon ? (
        <PokemonDetail
          pokemon={selectedPokemon}
          pokemonList={pokemonList}
          onBack={handleBackToList}
          onNavigate={handlePokemonNavigation}
          locale={locale}
        />
      ) : (
        <PokemonList
          pokemonList={pokemonList}
          onPokemonSelect={handlePokemonSelect}
          locale={locale}
        />
      )}

      {/* Bouton global pour changer la langue */}
      <TouchableOpacity style={styles.floatingButton} onPress={toggleLanguage}>
        <Text style={styles.buttonText}>{t('switchLang')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PokedexApp;

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFCB05',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 30,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#3B4CCA',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
