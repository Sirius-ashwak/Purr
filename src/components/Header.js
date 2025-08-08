import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PawClockLogo from './PawClockLogo';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <PawClockLogo />
        <Text style={styles.appName}>PurrPlan World</Text>
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search-outline" size={24} color="#2C3E50" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="person-circle-outline" size={24} color="#2C3E50" />
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
    color: '#2C3E50',
    marginLeft: 10,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default Header;
