import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StudyBunnyMascot from '../components/StudyBunnyMascot';
import RoomBackground from '../components/RoomBackground';
import { useGame } from '../context/GameContext';
import { colors, spacing, borderRadius, fontSize, shadows } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const MainScreen = () => {
  const { state } = useGame();

  const ProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${Math.min(100, ((state?.productivity?.focusSessions?.length || 0) / 8) * 100)}%` }
          ]} 
        />
      </View>
    </View>
  );

  const CurrencyCounter = ({ icon, value, iconColor }) => (
    <View style={styles.currencyCounter}>
      <View style={[styles.currencyIcon, { backgroundColor: iconColor }]}>
        <Text style={styles.currencyIconText}>{icon}</Text>
      </View>
      <Text style={styles.currencyValue}>{value}</Text>
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={16} color={colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );

  const CircularButton = ({ icon, onPress, style }) => (
    <TouchableOpacity style={[styles.circularButton, style]} onPress={onPress}>
      <Ionicons name={icon} size={24} color={colors.textPrimary} />
    </TouchableOpacity>
  );

  const BottomNavButton = ({ icon, isActive, onPress }) => (
    <TouchableOpacity 
      style={[styles.bottomNavButton, isActive && styles.bottomNavButtonActive]} 
      onPress={onPress}
    >
      <Ionicons 
        name={icon} 
        size={28} 
        color={isActive ? colors.textPrimary : colors.textMuted} 
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <RoomBackground />
      
      {/* Top Progress Bar */}
      <ProgressBar />
      
      {/* Currency Counters */}
      <View style={styles.currencySection}>
        <CurrencyCounter 
          icon="🐰" 
          value={state?.user?.fishTreats || 16} 
          iconColor="#F1C40F" 
        />
        <CurrencyCounter 
          icon="🥕" 
          value={state?.user?.seeds || 16} 
          iconColor="#E67E22" 
        />
      </View>
      
      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Side Action Buttons */}
        <View style={styles.sideButtons}>
          <CircularButton icon="person-outline" />
          <CircularButton icon="storefront-outline" />
          <CircularButton icon="musical-notes-outline" />
          <CircularButton icon="card-outline" />
          <CircularButton icon="settings-outline" />
        </View>
        
        {/* Bunny Mascot */}
        <View style={styles.mascotContainer}>
          <StudyBunnyMascot />
          <Text style={styles.bunnyName}>Bunny</Text>
        </View>
      </View>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <BottomNavButton icon="time-outline" isActive={true} />
        <BottomNavButton icon="list-outline" />
        <BottomNavButton icon="bar-chart-outline" />
        <BottomNavButton icon="ellipsis-horizontal" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressContainer: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  progressBar: {
    height: 12,
    backgroundColor: colors.progressBackground,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.textPrimary,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.progressGreen,
  },
  currencySection: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    gap: spacing.lg,
  },
  currencyCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.currencyBackground,
    borderRadius: 25,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    ...shadows.small,
  },
  currencyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
    borderWidth: 2,
    borderColor: colors.textPrimary,
  },
  currencyIconText: {
    fontSize: 16,
  },
  currencyValue: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
    marginRight: spacing.sm,
    minWidth: 30,
    textAlign: 'center',
  },
  addButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.textPrimary,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  sideButtons: {
    position: 'absolute',
    right: spacing.xl,
    top: '20%',
    gap: spacing.lg,
    zIndex: 10,
  },
  circularButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.buttonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.textPrimary,
    ...shadows.medium,
  },
  mascotContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -spacing.huge,
  },
  bunnyName: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.textMuted,
  },
  bottomNavButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttonBackground,
    borderWidth: 2,
    borderColor: colors.textPrimary,
    ...shadows.small,
  },
  bottomNavButtonActive: {
    backgroundColor: colors.progressGreen,
  },
});

export default MainScreen;