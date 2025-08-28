import React, { useRef, useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { Pokemon } from '../../types/pokemon';
import { 
  formatPokemonName, 
  getPokemonDescription, 
  formatPokemonWeight, 
  formatPokemonHeight,
  formatPokemonAbilities 
} from '../../utils/pokemon';
import { TYPE_COLORS, UI_CONFIG } from '../../constants/pokemon';

interface StatBarProps {
  label: string;
  value: number;
  color: string;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, color }) => {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: value,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <View style={statStyles.container}>
      <Text style={statStyles.label}>{label}</Text>
      <View style={statStyles.background}>
        <Animated.View
          style={[
            statStyles.fill,
            { 
              width: widthAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
              backgroundColor: color
            }
          ]}
        />
      </View>
    </View>
  );
};

const statStyles = StyleSheet.create({
  container: { marginBottom: 8 },
  label: { fontSize: 12, fontWeight: '600', marginBottom: 4 },
  background: { width: '100%', height: 12, backgroundColor: '#eee', borderRadius: 6, overflow: 'hidden' },
  fill: { height: 12, borderRadius: 6 },
});

interface PokemonDetailProps {
  pokemon: Pokemon;
  pokemonList: Pokemon[];
  onBack: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  locale: 'en' | 'fr';
  toggleLanguage: () => void;
}

export const PokemonDetail: React.FC<PokemonDetailProps> = ({ 
  pokemon, 
  pokemonList,
  onBack, 
  onNavigate,
  locale,
  toggleLanguage
}) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: pokemon.color }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{formatPokemonName(pokemon.name)}</Text>
        <Text style={styles.number}>#{pokemon.number}</Text>
      </View>

      {/* Navigation Pokémon */}
      <View style={styles.pokemonNavigation}>
        <TouchableOpacity onPress={() => onNavigate('prev')}>
          <Text style={styles.navButton}>‹</Text>
        </TouchableOpacity>
        <Image
          source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
          style={styles.pokemonImage}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={() => onNavigate('next')}>
          <Text style={styles.navButton}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Détails */}
      <View style={styles.detailCard}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.typesContainer}>
            {pokemon.types.map((type, index) => (
              <View key={index} style={[styles.typeTag, { backgroundColor: TYPE_COLORS[type as keyof typeof TYPE_COLORS] }]}>
                <Text style={styles.typeText}>{formatPokemonName(type)}</Text>
              </View>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { color: pokemon.color }]}>About</Text>

          <View style={styles.physicalStats}>
            <View style={styles.physicalStatItem}>
              <View style={styles.physicalStatValue}>
                <Text style={styles.weightIcon}>⚖️</Text>
                <Text style={styles.physicalStatText}>{formatPokemonWeight(pokemon.weight)}</Text>
              </View>
              <Text style={styles.physicalStatLabel}>Weight</Text>
            </View>
            <View style={styles.physicalStatItem}>
              <View style={styles.physicalStatValue}>
                <Text style={styles.heightIcon}>📏</Text>
                <Text style={styles.physicalStatText}>{formatPokemonHeight(pokemon.height)}</Text>
              </View>
              <Text style={styles.physicalStatLabel}>Height</Text>
            </View>
            <View style={styles.physicalStatItem}>
              <Text style={styles.physicalStatText}>{formatPokemonAbilities(pokemon.abilities)}</Text>
              <Text style={styles.physicalStatLabel}>Moves</Text>
            </View>
          </View>

          <Text style={styles.description}>{getPokemonDescription(pokemon)}</Text>

          <Text style={[styles.sectionTitle, { color: pokemon.color }]}>Base Stats</Text>

          {pokemon.stats.map((stat, index) => (
            <StatBar key={index} label={stat.stat.name.toUpperCase().replace('-', '')} value={stat.base_stat} color={pokemon.color} />
          ))}
        </ScrollView>
      </View>

      {/* Bouton flottant de langue */}
      <TouchableOpacity style={styles.floatingButton} onPress={toggleLanguage}>
        <Text style={styles.buttonText}>{locale === 'fr' ? 'Changer en anglais' : 'Switch to French'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
  backButton: { color: UI_CONFIG.COLORS.WHITE, fontSize: 24, fontWeight: 'bold' },
  title: { color: UI_CONFIG.COLORS.WHITE, fontSize: 24, fontWeight: 'bold' },
  number: { color: UI_CONFIG.COLORS.WHITE, fontSize: 16, opacity: 0.8 },
  pokemonNavigation: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  navButton: { color: UI_CONFIG.COLORS.WHITE, fontSize: 32, fontWeight: 'bold' },
  pokemonImage: { width: 200, height: 200 },
  detailCard: { flex: 1, backgroundColor: UI_CONFIG.COLORS.WHITE, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  typesContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  typeTag: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginHorizontal: 4 },
  typeText: { color: UI_CONFIG.COLORS.WHITE, fontWeight: '600', fontSize: 12 },
  sectionTitle: { textAlign: 'center', fontSize: 18, fontWeight: '600', marginBottom: 20 },
  physicalStats: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: UI_CONFIG.COLORS.LIGHT_GRAY },
  physicalStatItem: { alignItems: 'center' },
  physicalStatValue: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  physicalStatText: { fontSize: 16, fontWeight: '600' },
  physicalStatLabel: { color: UI_CONFIG.COLORS.GRAY, fontSize: 12 },
  weightIcon: { marginRight: 4, fontSize: 16 },
  heightIcon: { marginRight: 4, fontSize: 16 },
  description: { color: UI_CONFIG.COLORS.GRAY, lineHeight: 20, marginBottom: 24, textAlign: 'center' },
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
  buttonText: { color: '#3B4CCA', fontWeight: 'bold', fontSize: 14 },
});
