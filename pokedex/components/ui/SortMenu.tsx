import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SortBy } from '../../types/pokemon';
import { UI_CONFIG } from '../../constants/pokemon';

interface SortMenuProps {
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
  showMenu: boolean;
  onToggleMenu: () => void;
}

export const SortMenu: React.FC<SortMenuProps> = ({ 
  sortBy, 
  onSortChange, 
  showMenu, 
  onToggleMenu 
}) => {
  const handleSortSelection = (newSortBy: SortBy) => {
    onSortChange(newSortBy);
    onToggleMenu();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onToggleMenu}>
        <Text style={styles.buttonText}>Sort by:</Text>
      </TouchableOpacity>

      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleSortSelection('number')}
          >
            <View style={[
              styles.radioButton,
              sortBy === 'number' && styles.radioButtonSelected
            ]} />
            <Text style={styles.optionText}>Number</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleSortSelection('name')}
          >
            <View style={[
              styles.radioButton,
              sortBy === 'name' && styles.radioButtonSelected
            ]} />
            <Text style={styles.optionText}>Name</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  button: {
    backgroundColor: UI_CONFIG.COLORS.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    color: UI_CONFIG.COLORS.WHITE,
    fontWeight: '600',
  },
  menu: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: UI_CONFIG.COLORS.WHITE,
    borderRadius: UI_CONFIG.DIMENSIONS.BORDER_RADIUS,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: UI_CONFIG.COLORS.PRIMARY,
    marginRight: 8,
  },
  radioButtonSelected: {
    backgroundColor: UI_CONFIG.COLORS.PRIMARY,
  },
  optionText: {
    fontSize: 14,
  },
});