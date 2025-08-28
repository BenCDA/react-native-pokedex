// app/(tabs)/index.tsx
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Pokemon, ViewType } from '../../types/pokemon';
import { usePokemonList } from '../../hooks/usePokemonList';
import { LoadingScreen } from '../../components/common/LoadingScreen';
import { PokemonList } from '../../components/pokemon/PokemonList';
import { PokemonDetail } from '../../components/pokemon/PokemonDetail';
import { UI_CONFIG } from '../../constants/pokemon';

const translations: Record<'en' | 'fr', Record<string, string>> = {
  en: { switchLang: 'FR' },
  fr: { switchLang: 'EN' },
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
    <SafeAreaView style={{ flex: 1, backgroundColor: UI_CONFIG.COLORS.PRIMARY }}>
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

      {/* Bouton global pour changer la langue (Pokéball style) */}
      <TouchableOpacity style={styles.floatingButton} onPress={toggleLanguage}>
        <View style={styles.pokeball}>
          <View style={styles.pokeballInner}>
            <Text style={styles.buttonText}>{t('switchLang')}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PokedexApp;

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1000,
  },
  pokeball: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF1C1C',
    borderWidth: 4,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokeballInner: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FF1C1C',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
