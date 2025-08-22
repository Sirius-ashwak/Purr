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

  const TreatIcon = ({ icon, value, label }) => (
    <View style={styles.treatIcon}>
      <Ionicons name={icon} size={20} color={colors.primary} />
      <Text style={styles.treatValue}>{value}</Text>
      <Text style={styles.treatLabel}>{label}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Treats Row at Top */}
          <View style={styles.treatsContainer}>
            <TreatIcon 
              icon="fish" 
              value={state?.user?.fishTreats || 100} 
              label="Fish" 
            />
            <TreatIcon 
              icon="leaf" 
              value={state?.user?.seeds || 20} 
              label="Seeds" 
            />
            <TreatIcon 
              icon="trophy" 
              value={state?.user?.level || 1} 
              label="Level" 
            />
            <TreatIcon 
              icon="flame" 
              value={state?.productivity?.streakCount || 0} 
              label="Streak" 
            />
          </View>

          {/* Main Cat Center Section */}
          <View style={styles.catCenterContainer}>
            <View style={styles.catMainContainer}>
              <LottieView
                source={require('../../assets/cat-with-pumpkin.json')}
                style={styles.catMainImage}
                autoPlay
                loop
              />
            </View>
            <Text style={styles.catMainName}>Pumpkin Purr</Text>
            <Text style={styles.catMainGreeting}>Happy Fall Studies! 🎃</Text>
            <Text style={styles.catMainSubtitle}>Time to harvest knowledge! 🍂</Text>
          </View>

          {/* Progress Circle */}
          <View style={styles.progressContainer}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressNumber}>
                {state?.productivity?.focusSessions?.length || 0}
              </Text>
              <Text style={styles.progressLabel}>Sessions</Text>
              <Text style={styles.progressSubLabel}>Today</Text>
            </View>
          </View>

          {/* Quick Action */}
          <View style={styles.actionContainer}>
            <Text style={styles.motivationText}>
              "Ready to focus and earn some treats? Let's purr-fect your skills! 🐾"
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
    backgroundColor: 'transparent', // Make SafeAreaView transparent
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
  },
  
  // Treats Row at Top
  treatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  treatIcon: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    minWidth: 60,
    ...shadows.small,
  },
  treatValue: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  treatLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },

  // Main Cat Center Section
  catCenterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  catMainContainer: {
    width: 280,
    height: 280,
    backgroundColor: colors.surface,
    borderRadius: 140,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.large,
    marginBottom: spacing.lg,
    borderWidth: 4,
    borderColor: colors.primary,
  },
  catMainImage: {
    width: 240,
    height: 240,
  },
  catMainName: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  catMainGreeting: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  catMainSubtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },

  // Progress Circle
  progressContainer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.surface,
    borderWidth: 6,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  progressNumber: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.primary,
  },
  progressLabel: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  progressSubLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },

  // Action Container
  actionContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  motivationText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});

export default HomeScreen;