import React from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text } from 'react-native';
import { UI_CONFIG } from '../../constants/pokemon';

interface LoadingScreenProps {
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Chargement du Pokédex...' 
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color={UI_CONFIG.COLORS.PRIMARY} />
      <Text style={styles.text}>{message}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: UI_CONFIG.COLORS.PRIMARY,
  },
  text: {
    color: UI_CONFIG.COLORS.WHITE,
    marginTop: 10,
    fontSize: 16,
  },
});