import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { colors, spacing, borderRadius, fontSize, shadows } from '../constants/theme';
import { useGame } from '../context/GameContext';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { state } = useGame();

  const StatsCard = ({ label, value, icon, color, bgColor }) => (
    <View style={[styles.statsCard, { backgroundColor: bgColor }]}>
      <View style={[styles.statsIconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={20} color={colors.white} />
      </View>
      <Text style={styles.statsValue}>{value}</Text>
      <Text style={styles.statsLabel}>{label}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Happy Fall Studies! 🎃</Text>
              <Text style={styles.subtitle}>Time to harvest knowledge! 🍂</Text>
            </View>
          </View>

          {/* Cat Mascot */}
          <View style={styles.mascotContainer}>
            <View style={styles.catContainer}>
              <LottieView
                source={require('../../assets/cat-with-pumpkin.json')}
                style={styles.catImage}
                autoPlay
                loop
              />
            </View>
            <Text style={styles.mascotName}>Pumpkin Purr</Text>
            <Text style={styles.mascotStatus}>Let's learn together! 📚</Text>
          </View>

          {/* Progress Section */}
          <View style={styles.progressSection}>
            <View style={styles.progressCard}>
              <Text style={styles.progressTitle}>Today's Progress</Text>
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
          </View>

          {/* Stats Grid */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Your Stats</Text>
            <View style={styles.statsGrid}>
              <StatsCard
                label="Focus Streak"
                value={state?.productivity?.streakCount || 0}
                icon="flame"
                color={colors.danger}
                bgColor={colors.cardPink}
              />
              <StatsCard
                label="Fish Treats"
                value={state?.user?.fishTreats || 100}
                icon="fish"
                color={colors.primary}
                bgColor={colors.cardBlue}
              />
              <StatsCard
                label="Seeds"
                value={state?.user?.seeds || 20}
                icon="leaf"
                color={colors.success}
                bgColor={colors.cardGreen}
              />
              <StatsCard
                label="Level"
                value={state?.user?.level || 1}
                icon="trophy"
                color={colors.warning}
                bgColor={colors.cardYellow}
              />
            </View>
          </View>

          {/* Motivation Card */}
          <View style={styles.motivationSection}>
            <View style={styles.motivationCard}>
              <View style={styles.motivationHeader}>
                <Text style={styles.motivationIcon}>✨</Text>
                <Text style={styles.motivationTitle}>Daily Inspiration</Text>
              </View>
              <Text style={styles.motivationText}>
                "The expert in anything was once a beginner. Start your focus session and take one step closer to mastery!"
              </Text>
            </View>
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
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: spacing.sm,
    ...shadows.small,
  },
  mascotContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  catContainer: {
    width: 200,
    height: 200,
    backgroundColor: colors.surface,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
    marginBottom: spacing.md,
  },
  catImage: {
    width: 180,
    height: 180,
  },
  mascotName: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  mascotStatus: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  progressSection: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  progressCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.small,
  },
  progressTitle: {
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
  statsSection: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statsCard: {
    width: (width - spacing.xl * 2 - spacing.md) / 2,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    ...shadows.medium,
    borderWidth: 1,
    borderColor: colors.surfaceSecondary,
  },
  statsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
  motivationSection: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  motivationCard: {
    backgroundColor: colors.cardPurple,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.small,
  },
  motivationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  motivationIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  motivationTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  motivationText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});

export default HomeScreen;