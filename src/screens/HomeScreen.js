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
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, fontSize, shadows } from '../constants/theme';
import { useGame } from '../context/GameContext';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { state } = useGame();

  const QuickActionCard = ({ title, icon, color, onPress, count }) => (
    <TouchableOpacity style={[styles.actionCard, { backgroundColor: color }]} onPress={onPress}>
      <View style={styles.actionCardContent}>
        <View style={styles.actionIconContainer}>
          <Ionicons name={icon} size={24} color={colors.white} />
        </View>
        <Text style={styles.actionTitle}>{title}</Text>
        {count !== undefined && (
          <Text style={styles.actionCount}>{count}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

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
      colors={[colors.gradientStart, colors.gradientEnd]}
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
          <View style={styles.catImageContainer}>
            <Text style={styles.catPlaceholder}>🐱🎃</Text>
          </View>
          <Text style={styles.mascotName}>Whiskers</Text>
          <Text style={styles.mascotStatus}>Ready to study! 🎃</Text>
        </View>

        {/* Alternative: Try to load the actual image */}
        {/* Uncomment this section if you want to try loading the actual image */}
        {/*
        <View style={styles.mascotContainer}>
          <Image 
            source={require('../../assets/cat.json')} 
            style={styles.catImage}
            resizeMode="contain"
            onError={(error) => console.log('Image load error:', error)}
          />
          <Text style={styles.mascotName}>Whiskers</Text>
          <Text style={styles.mascotStatus}>Ready to study! 🎃</Text>
        </View>
        */}

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

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <QuickActionCard
              title="Focus Timer"
              icon="timer-outline"
              color={colors.accent}
              count="25 min"
            />
            <QuickActionCard
              title="My Tasks"
              icon="list-outline"
              color={colors.success}
              count={state?.productivity?.todaysTasks?.length || 0}
            />
            <QuickActionCard
              title="Garden"
              icon="leaf-outline"
              color="#27AE60"
              count={state?.garden?.plants?.length || 0}
            />
            <QuickActionCard
              title="Collection"
              icon="heart-outline"
              color="#E74C3C"
              count={state?.cats?.collection?.length || 1}
            />
          </View>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <StatsCard
              label="Focus Streak"
              value={state?.productivity?.streakCount || 0}
              icon="flame"
              color="#E67E22"
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
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginTop: 2,
  },
  profileButton: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: spacing.sm,
    ...shadows.small,
  },
  mascotContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  catImageContainer: {
    width: 200,
    height: 200,
    backgroundColor: colors.white,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  catPlaceholder: {
    fontSize: 80,
  },
  catImage: {
    width: 200,
    height: 200,
  },
  mascotName: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  mascotStatus: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  progressSection: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 12,
    backgroundColor: colors.progressBackground,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.progressGreen,
    borderRadius: 6,
  },
  progressText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  quickActions: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - spacing.xl * 2 - spacing.md) / 2,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.medium,
  },
  actionCardContent: {
    alignItems: 'center',
  },
  actionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  actionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textOnPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  actionCount: {
    fontSize: fontSize.sm,
    color: colors.textOnPrimary,
    opacity: 0.8,
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
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.small,
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
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statsLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  motivationCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    ...shadows.medium,
  },
  motivationTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  motivationText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});

export default HomeScreen;