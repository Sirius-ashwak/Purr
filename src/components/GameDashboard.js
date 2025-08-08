import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
          <Ionicons name="fish" size={20} color="#E67E22" />
          <Text style={styles.currencyAmount}>{state.user.fishTreats}</Text>
          <Text style={styles.currencyLabel}>Fish Treats</Text>
        </View>
        <View style={styles.currencyItem}>
          <Ionicons name="leaf" size={20} color="#27AE60" />
          <Text style={styles.currencyAmount}>{state.user.seeds}</Text>
          <Text style={styles.currencyLabel}>Seeds</Text>
        </View>
        <View style={styles.currencyItem}>
          <Ionicons name="trophy" size={20} color="#F1C40F" />
          <Text style={styles.currencyAmount}>{state.user.level}</Text>
          <Text style={styles.currencyLabel}>Level</Text>
        </View>
      </View>

      {/* Active Cat Display */}
      <TouchableOpacity style={styles.activeCatSection}>
        <View style={styles.catInfo}>
          <Text style={styles.catName}>🐱 {activeCat?.name || 'No Cat'}</Text>
          <Text style={styles.catBreed}>{activeCat?.breed} • {activeCat?.personality}</Text>
          <Text style={styles.catAbility}>💫 {activeCat?.abilityDescription}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#7F8C8D" />
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
    backgroundColor: '#FFFFFF',
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
    color: '#2C3E50',
    marginTop: 5,
  },
  currencyLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
  activeCatSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
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
    color: '#2C3E50',
    marginBottom: 2,
  },
  catBreed: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  catAbility: {
    fontSize: 12,
    color: '#E67E22',
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
    backgroundColor: '#FFFFFF',
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
    color: '#E67E22',
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 4,
    textAlign: 'center',
  },
  progressSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E9ECEF',
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#27AE60',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  gardenSection: {
    backgroundColor: '#E8F5E8',
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
    color: '#27AE60',
  },
  gardenLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginTop: 2,
  },
});

export default GameDashboard;
