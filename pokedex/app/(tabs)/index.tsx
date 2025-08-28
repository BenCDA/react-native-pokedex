import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { Pokemon, ViewType } from '../../types/pokemon';
import { usePokemonList } from '../../hooks/usePokemonList';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { PokemonList } from '../../components/pokemon/PokemonList';
import { PokemonDetail } from '../../components/pokemon/PokemonDetail';

const { width } = Dimensions.get('window');

const translations: Record<'en' | 'fr', Record<string, string>> = {
  en: { switchLang: 'Switch to French', back: 'Back' },
  fr: { switchLang: 'Changer en anglais', back: 'Retour' },
};

const PokedexApp: React.FC = () => {
  const [locale, setLocale] = useState<'en' | 'fr'>('en');
  const { pokemonList, loading, refetch } = usePokemonList(locale); 
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const t = (key: string) => translations[locale][key] || key;

  // Recharge la liste à chaque changement de langue
  useEffect(() => {
    refetch(locale);
  }, [locale]);

  const toggleLanguage = () => {
    setLocale(prev => (prev === 'fr' ? 'en' : 'fr'));
  };

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

  const LanguageButton = () => (
    <TouchableOpacity style={styles.floatingButton} onPress={toggleLanguage}>
      <Text style={styles.buttonText}>{t('switchLang')}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <LanguageButton />
      {currentView === 'detail' && selectedPokemon ? (
        <PokemonDetail
          pokemon={selectedPokemon}
          pokemonList={pokemonList}
          onBack={handleBackToList}
          onNavigate={handlePokemonNavigation}
        />
      ) : (
        <PokemonList pokemonList={pokemonList} onPokemonSelect={handlePokemonSelect} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFCB05',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 25,
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

export default PokedexApp;
