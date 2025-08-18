import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';

const HomeScreen = () => {
  const { state, completeFocusSession } = useGame();

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
              <Text style={styles.statNumber}>{state.user.fishTreats}</Text>
              <Text style={styles.statLabel}>Fish Treats</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="leaf" size={24} color="#6EE7B7" />
              <Text style={styles.statNumber}>{state.user.seeds}</Text>
              <Text style={styles.statLabel}>Seeds</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="trophy" size={24} color="#F59E0B" />
              <Text style={styles.statNumber}>{state.user.level}</Text>
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
              Your adorable cat is here to help with your productivity! �
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            
            <TouchableOpacity 
              style={styles.actionCard}
              onPress={() => completeFocusSession(1500, 'Work')}
            >
              <LinearGradient colors={['#FF6B6B', '#FF8E8E']} style={styles.actionGradient}>
                <Ionicons name="timer-outline" size={28} color="white" />
                <Text style={styles.actionTitle}>Focus Timer</Text>
                <Text style={styles.actionCount}>{state.productivity.streakCount} streak</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient colors={['#4ECDC4', '#6EE7B7']} style={styles.actionGradient}>
                <Ionicons name="leaf-outline" size={28} color="white" />
                <Text style={styles.actionTitle}>My Garden</Text>
                <Text style={styles.actionCount}>{state.garden.plants.length} plants</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionCard}>
              <LinearGradient colors={['#A78BFA', '#C084FC']} style={styles.actionGradient}>
                <Ionicons name="heart-outline" size={28} color="white" />
                <Text style={styles.actionTitle}>Cat Collection</Text>
                <Text style={styles.actionCount}>{state.cats.collection.length} cats</Text>
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
              <Text style={styles.progressTitle}>Focus Sessions: {state.productivity.focusSessions.length}/8</Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBg}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { width: `${Math.min(100, (state.productivity.focusSessions.length / 8) * 100)}%` }
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
