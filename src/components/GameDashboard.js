import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';
import { useGame } from '../context/GameContext';

const GameDashboard = () => {
  const { state, getActiveCat } = useGame();
  const activeCat = getActiveCat();

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getTopSubject = () => {
    const subjects = Object.entries(state.productivity.subjectStats);
    if (subjects.length === 0) return 'None';
    return subjects.sort((a, b) => b[1] - a[1])[0][0];
  };

  return (
    <View style={styles.container}>
      {/* Currency Display */}
      <View style={styles.currencySection}>
        <View style={styles.currencyItem}>
          <Ionicons name="fish" size={20} color={colors.accent} />
          <Text style={styles.currencyAmount}>{state.user.fishTreats}</Text>
          <Text style={styles.currencyLabel}>Fish Treats</Text>
        </View>
        <View style={styles.currencyItem}>
          <Ionicons name="leaf" size={20} color={colors.success} />
          <Text style={styles.currencyAmount}>{state.user.seeds}</Text>
          <Text style={styles.currencyLabel}>Seeds</Text>
        </View>
        <View style={styles.currencyItem}>
          <Ionicons name="trophy" size={20} color={colors.warning} />
          <Text style={styles.currencyAmount}>{state.user.level}</Text>
          <Text style={styles.currencyLabel}>Level</Text>
        </View>
      </View>

      {/* Active Cat Display */}
      <TouchableOpacity style={styles.activeCatSection}>
        <View style={styles.catInfo}>
          <Text style={styles.catName}>🐱 {activeCat?.name || 'No Cat'}</Text>
          <Text style={styles.catBreed}>{activeCat?.breed} {activeCat?.personality}</Text>
          <Text style={styles.catAbility}>💫 {activeCat?.abilityDescription}</Text>
        </View>
  <Ionicons name="chevron-forward" size={20} color={colors.white} />
      </TouchableOpacity>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{state.productivity.streakCount}</Text>
          <Text style={styles.statLabel}>Focus Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{formatTime(state.user.totalFocusTime)}</Text>
          <Text style={styles.statLabel}>Total Focus</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{getTopSubject()}</Text>
          <Text style={styles.statLabel}>Top Subject</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{state.cats.collection.length}</Text>
          <Text style={styles.statLabel}>Cats Owned</Text>
        </View>
      </View>

      {/* Today's Progress */}
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min(100, (state.productivity.focusSessions.length / 8) * 100)}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {state.productivity.focusSessions.length}/8 focus sessions completed
        </Text>
      </View>

      {/* Garden Status */}
      <View style={styles.gardenSection}>
        <Text style={styles.sectionTitle}>🌸 Garden Status</Text>
        <View style={styles.gardenInfo}>
          <View style={styles.gardenStat}>
            <Text style={styles.gardenValue}>{state.garden.plants.length}</Text>
            <Text style={styles.gardenLabel}>Plants</Text>
          </View>
          <View style={styles.gardenStat}>
            <Text style={styles.gardenValue}>{state.garden.size}</Text>
            <Text style={styles.gardenLabel}>Size</Text>
          </View>
          <View style={styles.gardenStat}>
            <Text style={styles.gardenValue}>{state.garden.seasons}</Text>
            <Text style={styles.gardenLabel}>Season</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  currencySection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currencyItem: {
    alignItems: 'center',
  },
  currencyAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  currencyLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
  activeCatSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  catInfo: {
    flex: 1,
  },
  catName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  catBreed: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  catAbility: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontStyle: 'italic',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
    textAlign: 'center',
  },
  progressSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  gardenSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 15,
    padding: 15,
  },
  gardenInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gardenStat: {
    alignItems: 'center',
  },
  gardenValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  gardenLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
});

export default GameDashboard;
