// components/pokemon/PokemonList.tsx
import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Pokemon, SortBy } from '../../types/pokemon';
import { filterPokemon, sortPokemon } from '../../utils/pokemon';
import { UI_CONFIG } from '../../constants/pokemon';
import { SearchBar } from '../ui/SearchBar';
import { SortMenu } from '../ui/SortMenu';
import { PokemonCard } from './PokemonCard';

interface PokemonListProps {
  pokemonList: Pokemon[];
  onPokemonSelect: (pokemon: Pokemon) => void;
}

export const PokemonList: React.FC<PokemonListProps> = ({ 
  pokemonList, 
  onPokemonSelect 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('number');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filteredAndSortedPokemon = useMemo(() => {
    const filtered = filterPokemon(pokemonList, searchQuery);
    return sortPokemon(filtered, sortBy);
  }, [pokemonList, searchQuery, sortBy]);

  const toggleSortMenu = () => {
    setShowSortMenu(!showSortMenu);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.pokeball}>
            <View style={styles.pokeballInner} />
          </View>
          <Text style={styles.headerTitle}>Pokédex</Text>
        </View>

        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Sort Menu */}
        <View style={styles.sortContainer}>
          <SortMenu
            sortBy={sortBy}
            onSortChange={setSortBy}
            showMenu={showSortMenu}
            onToggleMenu={toggleSortMenu}
          />
        </View>

        {/* Pokemon Grid */}
        <ScrollView style={styles.pokemonGrid}>
          <View style={styles.pokemonRow}>
            {filteredAndSortedPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onPress={onPokemonSelect}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI_CONFIG.COLORS.PRIMARY,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  pokeball: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: UI_CONFIG.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  pokeballInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: UI_CONFIG.COLORS.PRIMARY,
  },
  headerTitle: {
    color: UI_CONFIG.COLORS.WHITE,
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: UI_CONFIG.COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 16,
    position: 'relative',
  },
  pokemonGrid: {
    flex: 1,
    paddingHorizontal: 16,
  },
  pokemonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
});