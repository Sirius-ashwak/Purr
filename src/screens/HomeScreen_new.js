import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  RefreshControl,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';

// Constants for better maintainability
const COLORS = {
  primary: {
    purple: ['#8B5CF6', '#A855F7', '#9333EA'],
    white: '#FFFFFF',
    whiteTransparent: 'rgba(255,255,255,0.1)',
    whiteText: 'rgba(255,255,255,0.8)',
  },
  actions: {
    timer: ['#FF6B6B', '#FF8E8E'],
    garden: ['#4ECDC4', '#6EE7B7'],
    cats: ['#A78BFA', '#C084FC'],
    shop: ['#F59E0B', '#FBBF24'],
  },
  stats: {
    fish: '#4ECDC4',
    leaf: '#6EE7B7',
    trophy: '#F59E0B',
  }
};

const LAYOUT = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 20,
    xl: 30,
  },
  borderRadius: {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },
  animation: {
    width: 180,
    height: 160,
  }
};

const HomeScreen = () => {
  // State management
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animationLoaded, setAnimationLoaded] = useState(false);
  
  // Game context
  const { state, completeFocusSession, refreshGameState } = useGame();

  // Memoized values for performance
  const progressPercentage = React.useMemo(() => {
    const sessions = state?.productivity?.focusSessions?.length || 0;
    return Math.min(100, (sessions / 8) * 100);
  }, [state?.productivity?.focusSessions]);

  const statsData = React.useMemo(() => [
    {
      id: 'fish',
      icon: 'fish',
      value: state?.user?.fishTreats || 0,
      label: 'Fish Treats',
      color: COLORS.stats.fish,
    },
    {
      id: 'seeds',
      icon: 'leaf',
      value: state?.user?.seeds || 0,
      label: 'Seeds',
      color: COLORS.stats.leaf,
    },
    {
      id: 'level',
      icon: 'trophy',
      value: state?.user?.level || 1,
      label: 'Level',
      color: COLORS.stats.trophy,
    },
  ], [state?.user]);

  const actionButtons = React.useMemo(() => [
    {
      id: 'timer',
      title: 'Focus Timer',
      icon: 'timer-outline',
      gradient: COLORS.actions.timer,
      count: `${state?.productivity?.streakCount || 0} streak`,
      onPress: () => handleFocusTimer(),
    },
    {
      id: 'garden',
      title: 'My Garden',
      icon: 'leaf-outline',
      gradient: COLORS.actions.garden,
      count: `${state?.garden?.plants?.length || 0} plants`,
      onPress: () => handleNavigateToGarden(),
    },
    {
      id: 'cats',
      title: 'Cat Collection',
      icon: 'heart-outline',
      gradient: COLORS.actions.cats,
      count: `${state?.cats?.collection?.length || 0} cats`,
      onPress: () => handleNavigateToCats(),
    },
    {
      id: 'shop',
      title: 'Shop',
      icon: 'storefront-outline',
      gradient: COLORS.actions.shop,
      count: 'New items!',
      onPress: () => handleNavigateToShop(),
    },
  ], [state]);

  // Event handlers
  const handleFocusTimer = useCallback(async () => {
    try {
      setLoading(true);
      await completeFocusSession(1500, 'Work'); // 25 minutes
      Alert.alert('Success!', 'Focus session completed! 🎉');
    } catch (error) {
      Alert.alert('Error', 'Failed to complete focus session. Please try again.');
      console.error('Focus timer error:', error);
    } finally {
      setLoading(false);
    }
  }, [completeFocusSession]);

  const handleNavigateToGarden = useCallback(() => {
    // TODO: Navigate to Garden screen
    Alert.alert('Coming Soon', 'Garden feature will be available soon! 🌱');
  }, []);

  const handleNavigateToCats = useCallback(() => {
    // TODO: Navigate to Cat Collection screen
    Alert.alert('Coming Soon', 'Cat collection feature will be available soon! 🐱');
  }, []);

  const handleNavigateToShop = useCallback(() => {
    // TODO: Navigate to Shop screen
    Alert.alert('Coming Soon', 'Shop feature will be available soon! 🛒');
  }, []);

  const handleRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await refreshGameState?.();
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshGameState]);

  const handleAnimationFinish = useCallback(() => {
    setAnimationLoaded(true);
  }, []);

  // Effects
  useEffect(() => {
    // Pre-load animation or perform initial setup
    const timer = setTimeout(() => {
      setAnimationLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Helper function to get greeting based on time
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning! ☀️';
    if (hour < 17) return 'Good Afternoon! 🌤️';
    return 'Good Evening! 🌙';
  };

  // Component render methods
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.greeting}>{getTimeBasedGreeting()}</Text>
        <Text style={styles.welcomeText}>Welcome back</Text>
      </View>
      <TouchableOpacity 
        style={styles.profileButton}
        onPress={() => Alert.alert('Profile', 'Profile settings coming soon!')}
        accessibilityLabel="Profile settings"
      >
        <Ionicons name="person-circle-outline" size={32} color={COLORS.primary.white} />
      </TouchableOpacity>
    </View>
  );

  const renderStatsCards = () => (
    <View style={styles.statsContainer}>
      {statsData.map((stat, index) => (
        <TouchableOpacity 
          key={stat.id}
          style={[styles.statCard, { marginLeft: index > 0 ? LAYOUT.spacing.xs : 0 }]}
          onPress={() => Alert.alert(stat.label, `You have ${stat.value} ${stat.label.toLowerCase()}`)}
          accessibilityLabel={`${stat.value} ${stat.label}`}
        >
          <Ionicons name={stat.icon} size={24} color={stat.color} />
          <Text style={styles.statNumber}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderCatMascot = () => (
    <View style={styles.mascotSection}>
      <Text style={styles.sectionTitle}>Your Cat Companion 🐱</Text>
      <View style={styles.mascotContainer}>
        {!animationLoaded && (
          <ActivityIndicator 
            size="large" 
            color={COLORS.primary.white} 
            style={styles.loadingIndicator}
          />
        )}
        <LottieView
          source={require('../../assets/cat.json')}
          autoPlay
          loop
          style={styles.mascotAnimation}
          resizeMode="contain"
          onAnimationFinish={handleAnimationFinish}
        />
      </View>
      <Text style={styles.mascotDescription}>
        Your adorable companion is here to boost your productivity! 🌟
      </Text>
    </View>
  );

  const renderActionButtons = () => (
    <View style={styles.actionsSection}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      {actionButtons.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.actionCard}
          onPress={action.onPress}
          disabled={loading}
          accessibilityLabel={`${action.title} - ${action.count}`}
        >
          <LinearGradient colors={action.gradient} style={styles.actionGradient}>
            {loading && action.id === 'timer' ? (
              <ActivityIndicator size="small" color={COLORS.primary.white} />
            ) : (
              <Ionicons name={action.icon} size={28} color={COLORS.primary.white} />
            )}
            <Text style={styles.actionTitle}>{action.title}</Text>
            <Text style={styles.actionCount}>{action.count}</Text>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderProgress = () => {
    const sessions = state?.productivity?.focusSessions?.length || 0;
    return (
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Focus Sessions</Text>
            <Text style={styles.progressCount}>{sessions}/8</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <View 
                style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} 
              />
            </View>
          </View>
          <Text style={styles.progressText}>
            {sessions >= 8 ? 'Amazing! Goal completed! 🎉' : 'Keep going! You\'re doing great! 🌟'}
          </Text>
        </View>
      </View>
    );
  };

  const renderMotivation = () => (
    <View style={styles.motivationCard}>
      <Ionicons name="sparkles" size={24} color={COLORS.stats.trophy} />
      <Text style={styles.motivationText}>
        "Every focus session brings you closer to your goals and makes your cat happier! 🐱✨"
      </Text>
    </View>
  );

  // Main render
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary.purple[0]} />
      <LinearGradient colors={COLORS.primary.purple} style={styles.gradient}>
        {renderHeader()}
        
        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={COLORS.primary.white}
              colors={[COLORS.primary.white]}
            />
          }
        >
          {renderStatsCards()}
          {renderCatMascot()}
          {renderActionButtons()}
          {renderProgress()}
          {renderMotivation()}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.spacing.lg,
    paddingTop: LAYOUT.spacing.lg,
    paddingBottom: LAYOUT.spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: COLORS.primary.whiteText,
    marginBottom: LAYOUT.spacing.xs,
    fontWeight: '500',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary.white,
  },
  profileButton: {
    padding: LAYOUT.spacing.sm,
    borderRadius: LAYOUT.borderRadius.md,
    backgroundColor: COLORS.primary.whiteTransparent,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: LAYOUT.spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: LAYOUT.spacing.lg,
    marginBottom: LAYOUT.spacing.xl,
  },
  statCard: {
    backgroundColor: COLORS.primary.whiteTransparent,
    borderRadius: LAYOUT.borderRadius.md,
    padding: LAYOUT.spacing.md,
    alignItems: 'center',
    flex: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary.white,
    marginTop: LAYOUT.spacing.sm,
    marginBottom: LAYOUT.spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.primary.whiteText,
    textAlign: 'center',
    fontWeight: '500',
  },
  mascotSection: {
    alignItems: 'center',
    paddingHorizontal: LAYOUT.spacing.lg,
    marginBottom: LAYOUT.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary.white,
    marginBottom: LAYOUT.spacing.lg,
    textAlign: 'center',
  },
  mascotContainer: {
    backgroundColor: COLORS.primary.whiteTransparent,
    borderRadius: LAYOUT.borderRadius.xl,
    padding: LAYOUT.spacing.lg,
    marginBottom: LAYOUT.spacing.md,
    width: 250,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  loadingIndicator: {
    position: 'absolute',
    zIndex: 1,
  },
  mascotAnimation: {
    width: LAYOUT.animation.width,
    height: LAYOUT.animation.height,
  },
  mascotDescription: {
    fontSize: 14,
    color: COLORS.primary.whiteText,
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  actionsSection: {
    paddingHorizontal: LAYOUT.spacing.lg,
    marginBottom: LAYOUT.spacing.xl,
  },
  actionCard: {
    borderRadius: LAYOUT.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: LAYOUT.spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  actionGradient: {
    padding: LAYOUT.spacing.lg,
    alignItems: 'center',
    minHeight: 100,
    justifyContent: 'center',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary.white,
    textAlign: 'center',
    marginTop: LAYOUT.spacing.sm,
    marginBottom: LAYOUT.spacing.xs,
  },
  actionCount: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  progressSection: {
    paddingHorizontal: LAYOUT.spacing.lg,
    marginBottom: LAYOUT.spacing.xl,
  },
  progressCard: {
    backgroundColor: COLORS.primary.whiteTransparent,
    borderRadius: LAYOUT.borderRadius.lg,
    padding: LAYOUT.spacing.lg,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: LAYOUT.spacing.md,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary.white,
  },
  progressCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary.white,
  },
  progressBarContainer: {
    marginBottom: LAYOUT.spacing.sm,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.stats.fish,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: COLORS.primary.whiteText,
    textAlign: 'center',
    fontWeight: '500',
  },
  motivationCard: {
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderRadius: LAYOUT.borderRadius.lg,
    padding: LAYOUT.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: LAYOUT.spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  motivationText: {
    fontSize: 14,
    color: COLORS.primary.white,
    flex: 1,
    marginLeft: LAYOUT.spacing.md,
    lineHeight: 20,
    fontStyle: 'italic',
    fontWeight: '500',
  },
});

export default HomeScreen;
