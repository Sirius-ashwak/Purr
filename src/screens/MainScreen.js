import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import { colors, spacing, borderRadius, fontSize, shadows } from '../constants/theme';

const { width } = Dimensions.get('window');

const MainScreen = () => {
  const { state, completeFocusSession } = useGame();
  const [selectedTimer, setSelectedTimer] = useState(25);

  const timerOptions = [15, 25, 45, 60];

  const handleStartFocus = () => {
    completeFocusSession(selectedTimer * 60, 'Study');
  };

  const StatCard = ({ icon, value, label, color, bgColor }) => (
    <View style={[styles.statCard, { backgroundColor: bgColor }]}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={20} color={colors.white} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const ActionButton = ({ title, subtitle, icon, color, onPress }) => (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <View style={[styles.actionIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color={colors.white} />
      </View>
      <View style={styles.actionText}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning! ☀️</Text>
            <Text style={styles.userName}>Ready to study?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileText}>🐱</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatCard
            icon="fish"
            value={state?.user?.fishTreats || 0}
            label="Fish Treats"
            color={colors.primary}
            bgColor={colors.cardPurple}
          />
          <StatCard
            icon="leaf"
            value={state?.user?.seeds || 0}
            label="Seeds"
            color={colors.success}
            bgColor={colors.cardGreen}
          />
          <StatCard
            icon="trophy"
            value={state?.user?.level || 1}
            label="Level"
            color={colors.accent}
            bgColor={colors.cardYellow}
          />
        </View>

        {/* Cat Mascot */}
        <View style={styles.mascotSection}>
          <View style={styles.mascotCard}>
            <View style={styles.mascotContainer}>
              <LottieView
                source={require('../../assets/cat-with-pumpkin.json')}
                autoPlay
                loop
                style={styles.mascotAnimation}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.mascotText}>Your study companion is ready! 🎃</Text>
          </View>
        </View>

        {/* Timer Section */}
        <View style={styles.timerSection}>
          <Text style={styles.sectionTitle}>Focus Timer</Text>
          <View style={styles.timerCard}>
            <Text style={styles.timerLabel}>Select duration</Text>
            <View style={styles.timerOptions}>
              {timerOptions.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timerOption,
                    selectedTimer === time && styles.timerOptionSelected
                  ]}
                  onPress={() => setSelectedTimer(time)}
                >
                  <Text style={[
                    styles.timerOptionText,
                    selectedTimer === time && styles.timerOptionTextSelected
                  ]}>
                    {time}m
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.startButton} onPress={handleStartFocus}>
              <LinearGradient
                colors={[colors.primary, colors.primaryLight]}
                style={styles.startButtonGradient}
              >
                <Ionicons name="play" size={24} color={colors.white} />
                <Text style={styles.startButtonText}>Start Focus</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsList}>
            <ActionButton
              title="My Garden"
              subtitle={`${state?.garden?.plants?.length || 0} plants growing`}
              icon="leaf-outline"
              color={colors.success}
            />
            <ActionButton
              title="Cat Collection"
              subtitle={`${state?.cats?.collection?.length || 0} cats collected`}
              icon="heart-outline"
              color="#EC4899"
            />
            <ActionButton
              title="Study Stats"
              subtitle="View your progress"
              icon="bar-chart-outline"
              color={colors.accent}
            />
            <ActionButton
              title="Shop"
              subtitle="Get new items"
              icon="storefront-outline"
              color="#8B5CF6"
            />
          </View>
        </View>

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Focus Sessions</Text>
              <Text style={styles.progressCount}>
                {state?.productivity?.focusSessions?.length || 0}/8
              </Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { 
                      width: `${Math.min(100, ((state?.productivity?.focusSessions?.length || 0) / 8) * 100)}%` 
                    }
                  ]}
                />
              </View>
            </View>
            <Text style={styles.progressText}>
              {(state?.productivity?.focusSessions?.length || 0) >= 8 
                ? "Amazing! You've reached your daily goal! 🎉"
                : "Keep going! You're doing great! 💪"
              }
            </Text>
          </View>
        </View>

        {/* Motivation Card */}
        <View style={styles.motivationCard}>
          <View style={styles.motivationIcon}>
            <Text style={styles.motivationEmoji}>✨</Text>
          </View>
          <View style={styles.motivationContent}>
            <Text style={styles.motivationTitle}>Daily Motivation</Text>
            <Text style={styles.motivationText}>
              "Every study session brings you closer to your goals and makes your cat happier!"
            </Text>
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: spacing.huge }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  greeting: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  userName: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  profileButton: {
    padding: spacing.xs,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.cardPink,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.small,
  },
  profileText: {
    fontSize: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    ...shadows.small,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  mascotSection: {
    marginBottom: spacing.xl,
  },
  mascotCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.medium,
  },
  mascotContainer: {
    width: 200,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  mascotAnimation: {
    width: 180,
    height: 140,
  },
  mascotText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  timerSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  timerCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.medium,
  },
  timerLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  timerOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  timerOption: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
  },
  timerOptionSelected: {
    backgroundColor: colors.primary,
  },
  timerOptionText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  timerOptionTextSelected: {
    color: colors.white,
  },
  startButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.medium,
  },
  startButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  startButtonText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.white,
  },
  actionsSection: {
    marginBottom: spacing.xl,
  },
  actionsList: {
    gap: spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.small,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  actionSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  progressSection: {
    marginBottom: spacing.xl,
  },
  progressCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    ...shadows.medium,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  progressTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  progressCount: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.primary,
  },
  progressBarContainer: {
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  motivationCard: {
    flexDirection: 'row',
    backgroundColor: colors.cardYellow,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.small,
  },
  motivationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  motivationEmoji: {
    fontSize: 24,
  },
  motivationContent: {
    flex: 1,
  },
  motivationTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  motivationText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

export default MainScreen;