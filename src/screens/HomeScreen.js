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

<<<<<<< Enhance
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
=======
  const handleFocusTimer = () => {
    try {
      completeFocusSession(1500, 'Work');
    } catch (error) {
      console.log('Focus timer error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#8B5CF6', '#A855F7', '#9333EA']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello! 👋</Text>
          <Text style={styles.welcomeText}>Welcome back</Text>
        </View>

        <ScrollView 
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="fish" size={24} color="#4ECDC4" />
              <Text style={styles.statNumber}>{state?.user?.fishTreats || 0}</Text>
              <Text style={styles.statLabel}>Fish Treats</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="leaf" size={24} color="#6EE7B7" />
              <Text style={styles.statNumber}>{state?.user?.seeds || 0}</Text>
              <Text style={styles.statLabel}>Seeds</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="trophy" size={24} color="#F59E0B" />
              <Text style={styles.statNumber}>{state?.user?.level || 1}</Text>
              <Text style={styles.statLabel}>Level</Text>
            </View>
          </View>

          {/* Cat Animation */}
          <View style={styles.mascotSection}>
            <Text style={styles.sectionTitle}>Your Cat Companion 🐱</Text>
            <View style={styles.mascotContainer}>
              <LottieView
                source={require('../../assets/cat.json')}
                autoPlay
                loop
                style={styles.mascotAnimation}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.mascotDescription}>
              Your adorable cat is here to help with productivity! 🌟
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={handleFocusTimer}
            >
              <LinearGradient colors={['#FF6B6B', '#FF8E8E']} style={styles.actionGradient}>
                <Ionicons name="timer-outline" size={28} color="white" />
                <Text style={styles.actionTitle}>Focus Timer</Text>
                <Text style={styles.actionCount}>{state?.productivity?.streakCount || 0} streak</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient colors={['#4ECDC4', '#6EE7B7']} style={styles.actionGradient}>
                <Ionicons name="leaf-outline" size={28} color="white" />
                <Text style={styles.actionTitle}>My Garden</Text>
                <Text style={styles.actionCount}>{state?.garden?.plants?.length || 0} plants</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient colors={['#A78BFA', '#C084FC']} style={styles.actionGradient}>
                <Ionicons name="heart-outline" size={28} color="white" />
                <Text style={styles.actionTitle}>Cat Collection</Text>
                <Text style={styles.actionCount}>{state?.cats?.collection?.length || 0} cats</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient colors={['#F59E0B', '#FBBF24']} style={styles.actionGradient}>
                <Ionicons name="storefront-outline" size={28} color="white" />
                <Text style={styles.actionTitle}>Shop</Text>
                <Text style={styles.actionCount}>New items!</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Progress */}
          <View style={styles.progressSection}>
            <Text style={styles.sectionTitle}>Today's Progress</Text>
            <View style={styles.progressCard}>
              <Text style={styles.progressTitle}>
                Focus Sessions: {state?.productivity?.focusSessions?.length || 0}/8
              </Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBg}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { width: `${Math.min(100, ((state?.productivity?.focusSessions?.length || 0) / 8) * 100)}%` }
                    ]} 
                  />
                </View>
              </View>
              <Text style={styles.progressText}>Keep going! You're doing great! 🌟</Text>
            </View>
          </View>

          {/* Motivation */}
          <View style={styles.motivationCard}>
            <Ionicons name="sparkles" size={24} color="#F59E0B" />
            <Text style={styles.motivationText}>
              "Every focus session makes your cat happier! 🐱✨"
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  mascotSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  mascotContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    width: 250,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotAnimation: {
    width: 180,
    height: 160,
  },
  mascotDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  actionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  actionCount: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  progressSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  progressCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 20,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4ECDC4',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  motivationCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  motivationText: {
    fontSize: 14,
    color: 'white',
    flex: 1,
    marginLeft: 16,
    lineHeight: 20,
    fontStyle: 'italic',
  },
});

export default HomeScreen;
const ACTION_CONFIGS = [
  {
    id: 'timer',
    title: 'Focus Timer',
    icon: 'timer-outline',
    gradient: COLORS.gradients.timer,
    action: 'startFocus',
  },
  {
    id: 'garden',
    title: 'My Garden',
    icon: 'leaf-outline',
    gradient: COLORS.gradients.garden,
    action: 'openGarden',
  },
  {
    id: 'collection',
    title: 'Cat Collection',
    icon: 'heart-outline',
    gradient: COLORS.gradients.collection,
    action: 'openCollection',
  },
  {
    id: 'shop',
    title: 'Shop',
    icon: 'storefront-outline',
    gradient: COLORS.gradients.shop,
    action: 'openShop',
  },
];

const HomeScreen = () => {
  // State management
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  // Game context
  const { state, completeFocusSession, addTask, updateUserStats } = useGame();

  // Memoized calculations for performance
  const userStats = useMemo(() => ({
    fishTreats: state?.user?.fishTreats || 0,
    seeds: state?.user?.seeds || 0,
    level: state?.user?.level || 1,
    focusSessions: state?.productivity?.focusSessions?.length || 0,
    streakCount: state?.productivity?.streakCount || 0,
    plantsCount: state?.garden?.plants?.length || 0,
    catsCount: state?.cats?.collection?.length || 0,
  }), [state]);

  const progressPercentage = useMemo(() => {
    return Math.min(100, (userStats.focusSessions / DAILY_FOCUS_TARGET) * 100);
  }, [userStats.focusSessions]);

  // Action handlers with error handling
  const handleFocusSession = useCallback(async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      await completeFocusSession(FOCUS_SESSION_DURATION, 'Work');
      setLastInteraction(Date.now());
      
      Alert.alert(
        'Focus Session Complete! 🎉',
        'Your cat is proud of your productivity!',
        [{ text: 'Continue', style: 'default' }]
      );
    } catch (error) {
      console.error('Focus session error:', error);
      Alert.alert('Oops!', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [completeFocusSession, isLoading]);

  const handleActionPress = useCallback((action) => {
    if (action === 'startFocus') {
      handleFocusSession();
    } else {
      console.log('Navigate to:', action);
    }
  }, [handleFocusSession]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  }, []);

  const getActionCount = useCallback((actionId) => {
    switch (actionId) {
      case 'timer': return `${userStats.streakCount} streak`;
      case 'garden': return `${userStats.plantsCount} plants`;
      case 'collection': return `${userStats.catsCount} cats`;
      case 'shop': return 'New items!';
      default: return '';
    }
  }, [userStats]);
>>>>>>> main

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