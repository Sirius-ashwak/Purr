import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize, shadows } from '../constants/theme';
import { useGame } from '../context/GameContext';

const { width } = Dimensions.get('window');

const StatsScreen = () => {
  const { state } = useGame();

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getTopSubject = () => {
    const subjects = Object.entries(state.productivity.subjectStats || {});
    if (subjects.length === 0) return { name: 'None', time: 0 };
    const top = subjects.sort((a, b) => b[1] - a[1])[0];
    return { name: top[0], time: top[1] };
  };

  const StatCard = ({ title, value, subtitle, icon, color, large = false }) => (
    <View style={[
      styles.statCard,
      large && styles.statCardLarge,
      { borderLeftColor: color, borderLeftWidth: 4 }
    ]}>
      <View style={styles.statCardContent}>
        <View style={styles.statCardLeft}>
          <Text style={styles.statValue}>{value}</Text>
          <Text style={styles.statTitle}>{title}</Text>
          {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
        </View>
        <View style={[styles.statIcon, { backgroundColor: color }]}>
          <Ionicons name={icon} size={24} color={colors.white} />
        </View>
      </View>
    </View>
  );

  const SubjectCard = ({ subject, time, percentage }) => (
    <View style={styles.subjectCard}>
      <View style={styles.subjectInfo}>
        <Text style={styles.subjectName}>{subject}</Text>
        <Text style={styles.subjectTime}>{formatTime(time)}</Text>
      </View>
      <View style={styles.subjectProgress}>
        <View style={styles.subjectProgressBar}>
          <View 
            style={[
              styles.subjectProgressFill, 
              { width: `${percentage}%` }
            ]} 
          />
        </View>
        <Text style={styles.subjectPercentage}>{percentage.toFixed(0)}%</Text>
      </View>
    </View>
  );

  const topSubject = getTopSubject();
  const totalStudyTime = Object.values(state.productivity.subjectStats || {}).reduce((a, b) => a + b, 0);
  
  const subjectStats = Object.entries(state.productivity.subjectStats || {})
    .map(([subject, time]) => ({
      subject,
      time,
      percentage: totalStudyTime > 0 ? (time / totalStudyTime) * 100 : 0,
    }))
    .sort((a, b) => b.time - a.time);

  const todaysSessions = state.productivity.focusSessions?.filter(session => {
    const today = new Date().toDateString();
    const sessionDate = new Date(session.timestamp).toDateString();
    return today === sessionDate;
  }) || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Stats</Text>
          <Text style={styles.subtitle}>Track your progress and achievements</Text>
        </View>

        {/* Main Stats */}
        <View style={styles.mainStats}>
          <StatCard
            title="Focus Streak"
            value={state.productivity.streakCount || 0}
            subtitle="days in a row"
            icon="flame"
            color={colors.accent}
            large
          />
          <StatCard
            title="Total Study Time"
            value={formatTime(state.user.totalFocusTime || 0)}
            subtitle="all time"
            icon="time"
            color={colors.primary}
            large
          />
        </View>

        {/* Secondary Stats */}
        <View style={styles.secondaryStats}>
          <StatCard
            title="Today's Sessions"
            value={todaysSessions.length}
            icon="today"
            color={colors.success}
          />
          <StatCard
            title="Fish Treats"
            value={state.user.fishTreats || 0}
            icon="fish"
            color="#3498DB"
          />
          <StatCard
            title="Seeds Earned"
            value={state.user.seeds || 0}
            icon="leaf"
            color="#27AE60"
          />
          <StatCard
            title="Current Level"
            value={state.user.level || 1}
            icon="trophy"
            color="#F39C12"
          />
        </View>

        {/* Top Subject */}
        <View style={styles.topSubjectCard}>
          <Text style={styles.sectionTitle}>🏆 Top Subject</Text>
          <View style={styles.topSubjectContent}>
            <View style={styles.topSubjectInfo}>
              <Text style={styles.topSubjectName}>{topSubject.name}</Text>
              <Text style={styles.topSubjectTime}>{formatTime(topSubject.time)}</Text>
            </View>
            <View style={styles.topSubjectIcon}>
              <Ionicons name="school" size={32} color={colors.accent} />
            </View>
          </View>
        </View>

        {/* Subject Breakdown */}
        {subjectStats.length > 0 && (
          <View style={styles.subjectsSection}>
            <Text style={styles.sectionTitle}>📚 Subject Breakdown</Text>
            <View style={styles.subjectsList}>
              {subjectStats.map(({ subject, time, percentage }) => (
                <SubjectCard
                  key={subject}
                  subject={subject}
                  time={time}
                  percentage={percentage}
                />
              ))}
            </View>
          </View>
        )}

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>🏅 Recent Achievements</Text>
          <View style={styles.achievementsList}>
            {state.productivity.streakCount >= 7 && (
              <View style={styles.achievementItem}>
                <View style={styles.achievementIcon}>
                  <Ionicons name="flame" size={20} color={colors.white} />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>Week Warrior</Text>
                  <Text style={styles.achievementDesc}>7-day focus streak!</Text>
                </View>
              </View>
            )}
            
            {state.productivity.focusSessions?.length >= 10 && (
              <View style={styles.achievementItem}>
                <View style={styles.achievementIcon}>
                  <Ionicons name="timer" size={20} color={colors.white} />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>Focus Master</Text>
                  <Text style={styles.achievementDesc}>Completed 10 focus sessions</Text>
                </View>
              </View>
            )}

            {state.user.totalFocusTime >= 3600 && (
              <View style={styles.achievementItem}>
                <View style={styles.achievementIcon}>
                  <Ionicons name="time" size={20} color={colors.white} />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>Hour Hero</Text>
                  <Text style={styles.achievementDesc}>1+ hour of total focus time</Text>
                </View>
              </View>
            )}

            {(state.productivity.focusSessions?.length || 0) === 0 && (
              <View style={styles.emptyAchievements}>
                <Ionicons name="trophy-outline" size={48} color={colors.textMuted} />
                <Text style={styles.emptyTitle}>No achievements yet</Text>
                <Text style={styles.emptyText}>
                  Start focusing to unlock your first achievement!
                </Text>
              </View>
            )}
          </View>
        </View>
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
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.hero,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  mainStats: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  secondaryStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  statCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  statCardLarge: {
    marginBottom: spacing.md,
  },
  statCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statCardLeft: {
    flex: 1,
  },
  statValue: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  statSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topSubjectCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    ...shadows.small,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  topSubjectContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topSubjectInfo: {
    flex: 1,
  },
  topSubjectName: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  topSubjectTime: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  topSubjectIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subjectsSection: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  subjectsList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.small,
  },
  subjectCard: {
    marginBottom: spacing.md,
  },
  subjectInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  subjectName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  subjectTime: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  subjectProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  subjectProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: colors.progressBackground,
    borderRadius: 3,
    overflow: 'hidden',
  },
  subjectProgressFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 3,
  },
  subjectPercentage: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    minWidth: 30,
    textAlign: 'right',
  },
  achievementsSection: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  achievementsList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.small,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  achievementDesc: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  emptyAchievements: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default StatsScreen;