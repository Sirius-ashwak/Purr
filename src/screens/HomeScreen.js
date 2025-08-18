import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import { colors, spacing, borderRadius, fontSize, shadows } from '../constants/theme';

const HomeScreen = () => {
  const { state, completeFocusSession } = useGame();

  const StatCard = ({ icon, value, label, color = colors.white }) => (
    <View style={[styles.statCard, shadows.small]}>
      <View style={[styles.statIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={20} color={colors.primary} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const ActionCard = ({ title, subtitle, icon, onPress, gradient }) => (
    <TouchableOpacity onPress={onPress} style={styles.actionCardContainer}>
      <LinearGradient colors={gradient} style={[styles.actionCard, shadows.medium]}>
        <View style={styles.actionCardContent}>
          <View style={styles.actionCardLeft}>
            <Text style={styles.actionCardTitle}>{title}</Text>
            <Text style={styles.actionCardSubtitle}>{subtitle}</Text>
          </View>
          <View style={styles.actionCardIcon}>
            <Ionicons name={icon} size={24} color={colors.white} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.gradientStart} />
      
      {/* Header with gradient */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientMiddle]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Good morning! 👋</Text>
            <Text style={styles.welcomeText}>Ready to study?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={32} color={colors.white} />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <StatCard 
            icon="fish" 
            value={state.user.fishTreats} 
            label="Fish Treats"
            color="#E0F2FE"
          />
          <StatCard 
            icon="leaf" 
            value={state.user.seeds} 
            label="Seeds"
            color="#ECFDF5"
          />
          <StatCard 
            icon="trophy" 
            value={state.user.level} 
            label="Level"
            color="#FEF3C7"
          />
        </View>
      </LinearGradient>

      {/* Main Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Cat Mascot Section */}
        <View style={[styles.mascotSection, shadows.medium]}>
          <View style={styles.mascotContainer}>
            <LottieView
              source={require('../../assets/cat.json')}
              autoPlay
              loop
              style={styles.mascotAnimation}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.mascotText}>Your study buddy is ready! 🐱</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <ActionCard
            title="Focus Timer"
            subtitle={`${state.productivity.streakCount} day streak`}
            icon="timer-outline"
            gradient={[colors.gradientStart, colors.gradientMiddle]}
            onPress={() => completeFocusSession(1500, 'Study')}
          />

          <ActionCard
            title="My Garden"
            subtitle={`${state.garden.plants.length} plants growing`}
            icon="leaf-outline"
            gradient={['#10B981', '#34D399']}
          />

          <ActionCard
            title="Cat Collection"
            subtitle={`${state.cats.collection.length} cats collected`}
            icon="heart-outline"
            gradient={[colors.gradientMiddle, colors.gradientEnd]}
          />

          <ActionCard
            title="Study Stats"
            subtitle="View your progress"
            icon="bar-chart-outline"
            gradient={['#F59E0B', '#FBBF24']}
          />
        </View>

        {/* Progress Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Progress</Text>
          <View style={[styles.progressCard, shadows.small]}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Focus Sessions</Text>
              <Text style={styles.progressCount}>{state.productivity.focusSessions.length}/8</Text>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <LinearGradient
                  colors={[colors.gradientStart, colors.gradientMiddle]}
                  style={[
                    styles.progressBarFill,
                    { width: `${Math.min(100, (state.productivity.focusSessions.length / 8) * 100)}%` }
                  ]}
                />
              </View>
            </View>
            
            <Text style={styles.progressSubtext}>
              {state.productivity.focusSessions.length < 8 
                ? `${8 - state.productivity.focusSessions.length} more to reach your daily goal!`
                : "Great job! You've reached your daily goal! 🎉"
              }
            </Text>
          </View>
        </View>

        {/* Motivation Card */}
        <View style={[styles.motivationCard, shadows.small]}>
          <LinearGradient
            colors={['#FEF3C7', '#FDE68A']}
            style={styles.motivationGradient}
          >
            <Ionicons name="sparkles" size={24} color={colors.warning} />
            <Text style={styles.motivationText}>
              "Every study session makes your cat happier! Keep going! ✨"
            </Text>
          </LinearGradient>
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
  header: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  greeting: {
    fontSize: fontSize.md,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.xs,
  },
  welcomeText: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.white,
  },
  profileButton: {
    padding: spacing.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
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
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  mascotSection: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
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
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  actionCardContainer: {
    marginBottom: spacing.md,
  },
  actionCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  actionCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  actionCardLeft: {
    flex: 1,
  },
  actionCardTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.white,
    marginBottom: spacing.xs,
  },
  actionCardSubtitle: {
    fontSize: fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  actionCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
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
  progressBarBackground: {
    height: 8,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressSubtext: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  motivationCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  motivationGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  motivationText: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    flex: 1,
    marginLeft: spacing.md,
    lineHeight: 20,
    fontWeight: '500',
  },
});

export default HomeScreen;