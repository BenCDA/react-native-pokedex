import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Pokemon } from '../../types/pokemon';
import { formatPokemonName } from '../../utils/pokemon';
import { UI_CONFIG } from '../../constants/pokemon';

const { width } = Dimensions.get('window');

interface PokemonCardProps {
  pokemon: Pokemon;
  onPress: (pokemon: Pokemon) => void;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onPress }) => {
  const handlePress = () => {
    onPress(pokemon);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.number}>#{pokemon.number}</Text>
      <Image
        source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{formatPokemonName(pokemon.name)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: UI_CONFIG.COLORS.WHITE,
    borderRadius: UI_CONFIG.DIMENSIONS.BORDER_RADIUS,
    padding: 12,
    margin: 4,
    width: (width - 48) / 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: UI_CONFIG.DIMENSIONS.CARD_SHADOW_OPACITY,
    shadowRadius: 2,
    elevation: 2,
  },
  number: {
    position: 'absolute',
    top: 8,
    right: 8,
    color: '#999',
    fontSize: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginVertical: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: UI_CONFIG.COLORS.BLACK,
  },
});