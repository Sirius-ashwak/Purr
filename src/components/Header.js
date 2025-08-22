import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PawClockLogo from './PawClockLogo';
import { colors } from '../constants/theme';

const Header = () => {
  const handleSearchPress = () => {
    if (Platform.OS === 'web') {
      alert('Search feature coming soon! 🔍');
    } else {
      Alert.alert('Search', 'Search feature coming soon! 🔍');
    }
  };

  const handleAccountPress = () => {
    if (Platform.OS === 'web') {
      alert('Account settings coming soon! 👤');
    } else {
      Alert.alert('Account', 'Account settings coming soon! 👤');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <PawClockLogo />
        <Text style={styles.appName}>Purr!</Text>
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={handleSearchPress}
          activeOpacity={0.7}
        >
          <Ionicons name="search-outline" size={24} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.iconButton}
          onPress={handleAccountPress}
          activeOpacity={0.7}
        >
          <Ionicons name="person-circle-outline" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 15 : 0,
    paddingBottom: 15,
    backgroundColor: 'transparent',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginLeft: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transitionDuration: '200ms',
    }),
  },
});

export default Header;
