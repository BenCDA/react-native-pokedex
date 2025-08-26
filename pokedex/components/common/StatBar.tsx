import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UI_CONFIG } from '../../constants/pokemon';
import { getStatPercentage } from '../../utils/pokemon';

interface StatBarProps {
  label: string;
  value: number;
  color: string;
  maxValue?: number;
}

export const StatBar: React.FC<StatBarProps> = ({ 
  label, 
  value, 
  color, 
  maxValue = UI_CONFIG.DIMENSIONS.STAT_MAX_VALUE 
}) => {
  const percentage = getStatPercentage(value, maxValue);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.label, { color }]}>{label}</Text>
        <Text style={styles.value}>{String(value).padStart(3, '0')}</Text>
      </View>
      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
            }
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
  value: {
    fontSize: 12,
    fontWeight: '600',
    color: UI_CONFIG.COLORS.GRAY,
  },
  barBackground: {
    height: UI_CONFIG.DIMENSIONS.STAT_BAR_HEIGHT,
    backgroundColor: UI_CONFIG.COLORS.LIGHT_GRAY,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
});