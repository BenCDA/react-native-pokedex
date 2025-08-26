// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Dimensions,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';

// const { width } = Dimensions.get('window');

// // Configuration des couleurs par type
// const typeColors = {
//   normal: '#A8A878',
//   fighting: '#C03028',
//   flying: '#A890F0',
//   poison: '#A040A0',
//   ground: '#E0C068',
//   rock: '#B8A038',
//   bug: '#A8B820',
//   ghost: '#705898',
//   steel: '#B8B8D0',
//   fire: '#F08030',
//   water: '#6890F0',
//   grass: '#78C850',
//   electric: '#F8D030',
//   psychic: '#F85888',
//   ice: '#98D8D8',
//   dragon: '#7038F8',
//   dark: '#705848',
//   fairy: '#EE99AC',
// };

// // Hook pour récupérer la liste des Pokémon
// const usePokemonList = () => {
//   const [pokemonList, setPokemonList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchPokemonList();
//   }, []);

//   const fetchPokemonList = async () => {
//     try {
//       setLoading(true);
//       // Récupérer les 151 premiers Pokémon (Génération 1)
//       const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
//       const data = await response.json();

//       // Récupérer les détails de chaque Pokémon
//       const pokemonDetails = await Promise.all(
//         data.results.map(async (pokemon, index) => {
//           const detailResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
//           const detail = await detailResponse.json();

//           // Récupérer les informations d'espèce pour la description
//           const speciesResponse = await fetch(detail.species.url);
//           const species = await speciesResponse.json();

//           return {
//             id: detail.id,
//             name: detail.name,
//             number: String(detail.id).padStart(3, '0'),
//             types: detail.types.map(type => type.type.name),
//             sprites: detail.sprites,
//             height: detail.height,
//             weight: detail.weight,
//             stats: detail.stats,
//             abilities: detail.abilities.map(ability => ability.ability.name),
//             species: species,
//             color: typeColors[detail.types[0].type.name] || '#68A090'
//           };
//         })
//       );

//       setPokemonList(pokemonDetails);
//     } catch (err) {
//       setError(err.message);
//       Alert.alert('Erreur', 'Impossible de charger les Pokémon');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { pokemonList, loading, error, refetch: fetchPokemonList };
// };

// const PokedexApp = () => {
//   const { pokemonList, loading } = usePokemonList();
//   const [currentView, setCurrentView] = useState('list');
//   const [selectedPokemon, setSelectedPokemon] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('number');
//   const [showSortMenu, setShowSortMenu] = useState(false);

//   // Filtrer et trier les Pokémon
//   const filteredPokemon = pokemonList
//     .filter(pokemon =>
//       pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       pokemon.number.includes(searchQuery)
//     )
//     .sort((a, b) => {
//       if (sortBy === 'name') {
//         return a.name.localeCompare(b.name);
//       }
//       return parseInt(a.number) - parseInt(b.number);
//     });

//   // Composant pour les barres de statistiques
//   const StatBar = ({ label, value, color }) => (
//     <View style={styles.statContainer}>
//       <View style={styles.statHeader}>
//         <Text style={[styles.statLabel, { color }]}>{label}</Text>
//         <Text style={styles.statValue}>{String(value).padStart(3, '0')}</Text>
//       </View>
//       <View style={styles.statBarBackground}>
//         <View
//           style={[
//             styles.statBarFill,
//             {
//               width: `${(value / 200) * 100}%`,
//               backgroundColor: color
//             }
//           ]}
//         />
//       </View>
//     </View>
//   );

//   // Composant pour une carte Pokémon
//   const PokemonCard = ({ pokemon }) => (
//     <TouchableOpacity
//       style={styles.pokemonCard}
//       onPress={() => {
//         setSelectedPokemon(pokemon);
//         setCurrentView('detail');
//       }}
//     >
//       <Text style={styles.pokemonNumber}>#{pokemon.number}</Text>
//       <Image
//         source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
//         style={styles.pokemonImage}
//         resizeMode="contain"
//       />
//       <Text style={styles.pokemonName}>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Text>
//     </TouchableOpacity>
//   );

//   // Navigation entre les Pokémon
//   const navigatePokemon = (direction) => {
//     if (!selectedPokemon) return;

//     const currentIndex = pokemonList.findIndex(p => p.id === selectedPokemon.id);
//     let newIndex;

//     if (direction === 'next') {
//       newIndex = currentIndex + 1 >= pokemonList.length ? 0 : currentIndex + 1;
//     } else {
//       newIndex = currentIndex - 1 < 0 ? pokemonList.length - 1 : currentIndex - 1;
//     }

//     setSelectedPokemon(pokemonList[newIndex]);
//   };

//   // Obtenir la description du Pokémon en anglais
//   const getPokemonDescription = (pokemon) => {
//     const englishEntry = pokemon.species.flavor_text_entries?.find(
//       entry => entry.language.name === 'en'
//     );
//     return englishEntry?.flavor_text.replace(/[\f\n\r]/g, ' ') || 'No description available.';
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#DC143C" />
//         <Text style={styles.loadingText}>Chargement du Pokédex...</Text>
//       </SafeAreaView>
//     );
//   }

//   // Vue détail du Pokémon
//   if (currentView === 'detail' && selectedPokemon) {
//     return (
//       <SafeAreaView style={[styles.detailContainer, { backgroundColor: selectedPokemon.color }]}>
//         {/* Header */}
//         <View style={styles.detailHeader}>
//           <TouchableOpacity onPress={() => setCurrentView('list')}>
//             <Text style={styles.backButton}>←</Text>
//           </TouchableOpacity>
//           <Text style={styles.detailTitle}>
//             {selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}
//           </Text>
//           <Text style={styles.detailNumber}>#{selectedPokemon.number}</Text>
//         </View>

//         {/* Navigation avec image du Pokémon */}
//         <View style={styles.pokemonNavigation}>
//           <TouchableOpacity onPress={() => navigatePokemon('prev')}>
//             <Text style={styles.navButton}>‹</Text>
//           </TouchableOpacity>

//           <Image
//             source={{ uri: selectedPokemon.sprites.other['official-artwork'].front_default }}
//             style={styles.detailPokemonImage}
//             resizeMode="contain"
//           />

//           <TouchableOpacity onPress={() => navigatePokemon('next')}>
//             <Text style={styles.navButton}>›</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Carte des détails */}
//         <View style={styles.detailCard}>
//           <ScrollView showsVerticalScrollIndicator={false}>
//             {/* Types */}
//             <View style={styles.typesContainer}>
//               {selectedPokemon.types.map((type, index) => (
//                 <View
//                   key={index}
//                   style={[styles.typeTag, { backgroundColor: typeColors[type] }]}
//                 >
//                   <Text style={styles.typeText}>
//                     {type.charAt(0).toUpperCase() + type.slice(1)}
//                   </Text>
//                 </View>
//               ))}
//             </View>

//             <Text style={[styles.sectionTitle, { color: selectedPokemon.color }]}>
//               About
//             </Text>

//             {/* Statistiques physiques */}
//             <View style={styles.physicalStats}>
//               <View style={styles.physicalStatItem}>
//                 <View style={styles.physicalStatValue}>
//                   <Text style={styles.weightIcon}>⚖️</Text>
//                   <Text style={styles.physicalStatText}>
//                     {selectedPokemon.weight / 10} kg
//                   </Text>
//                 </View>
//                 <Text style={styles.physicalStatLabel}>Weight</Text>
//               </View>

//               <View style={styles.physicalStatItem}>
//                 <View style={styles.physicalStatValue}>
//                   <Text style={styles.heightIcon}>📏</Text>
//                   <Text style={styles.physicalStatText}>
//                     {selectedPokemon.height / 10} m
//                   </Text>
//                 </View>
//                 <Text style={styles.physicalStatLabel}>Height</Text>
//               </View>

//               <View style={styles.physicalStatItem}>
//                 <Text style={styles.physicalStatText}>
//                   {selectedPokemon.abilities.map(ability =>
//                     ability.charAt(0).toUpperCase() + ability.slice(1)
//                   ).join('\n')}
//                 </Text>
//                 <Text style={styles.physicalStatLabel}>Moves</Text>
//               </View>
//             </View>

//             {/* Description */}
//             <Text style={styles.description}>
//               {getPokemonDescription(selectedPokemon)}
//             </Text>

//             {/* Statistiques de base */}
//             <Text style={[styles.sectionTitle, { color: selectedPokemon.color }]}>
//               Base Stats
//             </Text>

//             {selectedPokemon.stats.map((stat, index) => (
//               <StatBar
//                 key={index}
//                 label={stat.stat.name.toUpperCase().replace('-', '')}
//                 value={stat.base_stat}
//                 color={selectedPokemon.color}
//               />
//             ))}
//           </ScrollView>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   // Vue liste
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <View style={styles.headerTop}>
//           <View style={styles.pokeball}>
//             <View style={styles.pokeballInner} />
//           </View>
//           <Text style={styles.headerTitle}>Pokédex</Text>
//         </View>

//         {/* Barre de recherche */}
//         <View style={styles.searchContainer}>
//           <Text style={styles.searchIcon}>🔍</Text>
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             placeholderTextColor="#999"
//           />
//           {searchQuery ? (
//             <TouchableOpacity onPress={() => setSearchQuery('')}>
//               <Text style={styles.clearButton}>✕</Text>
//             </TouchableOpacity>
//           ) : null}
//         </View>
//       </View>

//       {/* Contenu */}
//       <View style={styles.content}>
//         {/* Menu de tri */}
//         <View style={styles.sortContainer}>
//           <TouchableOpacity
//             style={styles.sortButton}
//             onPress={() => setShowSortMenu(!showSortMenu)}
//           >
//             <Text style={styles.sortButtonText}>Sort by:</Text>
//           </TouchableOpacity>

//           {showSortMenu && (
//             <View style={styles.sortMenu}>
//               <TouchableOpacity
//                 style={styles.sortOption}
//                 onPress={() => {
//                   setSortBy('number');
//                   setShowSortMenu(false);
//                 }}
//               >
//                 <View style={[
//                   styles.radioButton,
//                   sortBy === 'number' && styles.radioButtonSelected
//                 ]} />
//                 <Text style={styles.sortOptionText}>Number</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.sortOption}
//                 onPress={() => {
//                   setSortBy('name');
//                   setShowSortMenu(false);
//                 }}
//               >
//                 <View style={[
//                   styles.radioButton,
//                   sortBy === 'name' && styles.radioButtonSelected
//                 ]} />
//                 <Text style={styles.sortOptionText}>Name</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>

//         {/* Grille de Pokémon */}
//         <ScrollView style={styles.pokemonGrid}>
//           <View style={styles.pokemonRow}>
//             {filteredPokemon.map((pokemon) => (
//               <PokemonCard key={pokemon.id} pokemon={pokemon} />
//             ))}
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   // Styles généraux
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#DC143C',
//   },
//   loadingText: {
//     color: 'white',
//     marginTop: 10,
//     fontSize: 16,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#DC143C',
//   },

//   // Header
//   header: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   headerTop: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   pokeball: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     backgroundColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 12,
//   },
//   pokeballInner: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     backgroundColor: '#DC143C',
//   },
//   headerTitle: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },

//   // Recherche
//   searchContainer: {
//     backgroundColor: 'white',
//     borderRadius: 25,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     paddingVertical: 12,
//   },
//   searchIcon: {
//     marginRight: 8,
//     fontSize: 16,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//   },
//   clearButton: {
//     fontSize: 16,
//     color: '#666',
//   },

//   // Contenu
//   content: {
//     flex: 1,
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     paddingTop: 20,
//   },

//   // Tri
//   sortContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     paddingHorizontal: 20,
//     marginBottom: 16,
//     position: 'relative',
//   },
//   sortButton: {
//     backgroundColor: '#DC143C',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//   },
//   sortButtonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
//   sortMenu: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     zIndex: 1000,
//   },
//   sortOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   radioButton: {
//     width: 16,
//     height: 16,
//     borderRadius: 8,
//     borderWidth: 2,
//     borderColor: '#DC143C',
//     marginRight: 8,
//   },
//   radioButtonSelected: {
//     backgroundColor: '#DC143C',
//   },
//   sortOptionText: {
//     fontSize: 14,
//   },

//   // Grille Pokémon
//   pokemonGrid: {
//     flex: 1,
//     paddingHorizontal: 16,
//   },
//   pokemonRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     paddingBottom: 20,
//   },
//   pokemonCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 12,
//     margin: 4,
//     width: (width - 48) / 3,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   pokemonNumber: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     color: '#999',
//     fontSize: 10,
//   },
//   pokemonImage: {
//     width: 60,
//     height: 60,
//     marginVertical: 8,
//   },
//   pokemonName: {
//     fontSize: 12,
//     fontWeight: '500',
//     textAlign: 'center',
//     color: '#333',
//   },

//   // Vue détail
//   detailContainer: {
//     flex: 1,
//   },
//   detailHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   backButton: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   detailTitle: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   detailNumber: {
//     color: 'white',
//     fontSize: 16,
//     opacity: 0.8,
//   },
//   pokemonNavigation: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     marginBottom: 20,
//   },
//   navButton: {
//     color: 'white',
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   detailPokemonImage: {
//     width: 200,
//     height: 200,
//   },

//   // Carte de détails
//   detailCard: {
//     flex: 1,
//     backgroundColor: 'white',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//   },

//   // Types
//   typesContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   typeTag: {
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 20,
//     marginHorizontal: 4,
//   },
//   typeText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 12,
//   },

//   // Sections
//   sectionTitle: {
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 20,
//   },

//   // Stats physiques
//   physicalStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 20,
//     paddingBottom: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   physicalStatItem: {
//     alignItems: 'center',
//   },
//   physicalStatValue: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   physicalStatText: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   physicalStatLabel: {
//     color: '#666',
//     fontSize: 12,
//   },
//   weightIcon: {
//     marginRight: 4,
//     fontSize: 16,
//   },
//   heightIcon: {
//     marginRight: 4,
//     fontSize: 16,
//   },

//   // Description
//   description: {
//     color: '#666',
//     lineHeight: 20,
//     marginBottom: 24,
//     textAlign: 'center',
//   },

//   // Barres de stats
//   statContainer: {
//     marginBottom: 8,
//   },
//   statHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   statValue: {
//     fontSize: 12,
//     fontWeight: '600',
//     color: '#666',
//   },
//   statBarBackground: {
//     height: 6,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 3,
//     overflow: 'hidden',
//   },
//   statBarFill: {
//     height: '100%',
//     borderRadius: 3,
//   },
// });

// export default PokedexApp;


// app/(tabs)/index.tsx
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