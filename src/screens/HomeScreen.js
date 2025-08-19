import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, fontSize, shadows } from '../constants/theme';
import { useGame } from '../context/GameContext';
import CatWithPumpkinMascot from '../components/CatWithPumpkinMascot';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { state } = useGame();

  const StatsCard = ({ label, value, icon, color }) => (
    <View style={styles.statsCard}>
      <View style={[styles.statsIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={20} color={colors.white} />
      </View>
      <Text style={styles.statsValue}>{value}</Text>
      <Text style={styles.statsLabel}>{label}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning!</Text>
            <Text style={styles.subtitle}>Ready to focus today?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={32} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Cat Mascot with Pumpkin */}
        <View style={styles.mascotContainer}>
          <CatWithPumpkinMascot />
          <Text style={styles.mascotName}>Whiskers</Text>
          <Text style={styles.mascotStatus}>Ready to study! 🎃</Text>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${Math.min(100, ((state?.productivity?.focusSessions?.length || 0) / 8) * 100)}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {state?.productivity?.focusSessions?.length || 0}/8 focus sessions completed
          </Text>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <StatsCard
              label="Focus Streak"
              value={state?.productivity?.streakCount || 0}
              icon="flame"
              color={colors.accent}
            />
            <StatsCard
              label="Fish Treats"
              value={state?.user?.fishTreats || 100}
              icon="fish"
              color="#3498DB"
            />
            <StatsCard
              label="Seeds"
              value={state?.user?.seeds || 20}
              icon="leaf"
              color="#27AE60"
            />
            <StatsCard
              label="Level"
              value={state?.user?.level || 1}
              icon="trophy"
              color="#F39C12"
            />
          </View>
        </View>

        {/* Motivation Card */}
        <View style={styles.motivationCard}>
          <Text style={styles.motivationTitle}>💪 Daily Motivation</Text>
          <Text style={styles.motivationText}>
            "Every small step counts! Start with just 25 minutes of focused study today."
          </Text>
        </View>
      </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  greeting: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.white,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.white,
    opacity: 0.9,
    marginTop: 2,
  },
  profileButton: {
    padding: spacing.sm,
  },
  mascotContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  mascotName: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.white,
    marginTop: spacing.md,
  },
  mascotStatus: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.8,
    marginTop: spacing.xs,
  },
  progressSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.white,
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 6,
  },
  progressText: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  statsSection: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statsCard: {
    width: (width - spacing.xl * 2 - spacing.md) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statsValue: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  statsLabel: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.8,
    textAlign: 'center',
  },
  motivationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  motivationTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.white,
    marginBottom: spacing.sm,
  },
  motivationText: {
    fontSize: fontSize.md,
    color: colors.white,
    lineHeight: 22,
    opacity: 0.9,
  },
});

export default HomeScreen;