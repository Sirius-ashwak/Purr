import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { colors, spacing, borderRadius, fontSize, shadows } from '../constants/theme';
import { useGame } from '../context/GameContext';

const { width } = Dimensions.get('window');

const TimerScreen = () => {
  const { completeFocusSession } = useGame();
  const [selectedTime, setSelectedTime] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [subject, setSubject] = useState('General Study');
  const intervalRef = useRef(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const timeOptions = [15, 25, 45, 60];
  const subjects = ['General Study', 'Math', 'Science', 'Language', 'History', 'Art'];

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Pulse animation when running
      const pulseLoop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulseLoop.start();

      return () => {
        pulseLoop.stop();
        clearInterval(intervalRef.current);
      };
    } else {
      clearInterval(intervalRef.current);
      pulseAnim.setValue(1);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    setIsPaused(false);
    completeFocusSession(selectedTime * 60, subject);
    Alert.alert(
      '🎉 Fantastic Work!',
      `You completed a ${selectedTime}-minute focus session on ${subject}! You earned Fish Treats and Seeds.`,
      [{ text: 'Amazing!', onPress: resetTimer }]
    );
  };

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(selectedTime * 60);
  };

  const selectTime = (minutes) => {
    if (!isRunning) {
      setSelectedTime(minutes);
      setTimeLeft(minutes * 60);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalSeconds = selectedTime * 60;
    return ((totalSeconds - timeLeft) / totalSeconds) * 100;
  };

  const getTimerColor = () => {
    if (isRunning && !isPaused) return colors.success;
    if (isPaused) return colors.warning;
    return colors.primary;
  };

  const TimeButton = ({ minutes, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.timeButton,
        isSelected && styles.timeButtonSelected,
        isRunning && styles.timeButtonDisabled,
      ]}
      onPress={() => onPress(minutes)}
      disabled={isRunning}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.timeButtonText,
        isSelected && styles.timeButtonTextSelected,
      ]}>
        {minutes}
      </Text>
      <Text style={[
        styles.timeButtonLabel,
        isSelected && styles.timeButtonLabelSelected,
      ]}>
        min
      </Text>
    </TouchableOpacity>
  );

  const SubjectButton = ({ subjectName, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.subjectButton,
        isSelected && styles.subjectButtonSelected,
      ]}
      onPress={() => onPress(subjectName)}
      disabled={isRunning}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.subjectButtonText,
        isSelected && styles.subjectButtonTextSelected,
      ]}>
        {subjectName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.title}>Focus Timer</Text>
          <Text style={styles.subtitle}>Stay focused, earn rewards! 🎯</Text>
        </View>

        {/* Timer Circle */}
        <View style={styles.timerContainer}>
          <Animated.View style={[
            styles.timerCircle,
            { 
              transform: [{ scale: pulseAnim }],
              borderColor: getTimerColor(),
            }
          ]}>
            <View style={styles.progressRing}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    transform: [{ rotate: `${(getProgress() * 3.6)}deg` }],
                    borderTopColor: getTimerColor(),
                    borderRightColor: getTimerColor(),
                  }
                ]} 
              />
            </View>
            <View style={styles.timerContent}>
              <Text style={[styles.timerText, { color: getTimerColor() }]}>
                {formatTime(timeLeft)}
              </Text>
              <Text style={styles.timerLabel}>
                {isRunning ? (isPaused ? '⏸️ Paused' : '🔥 Focusing') : '⏰ Ready'}
              </Text>
              <Text style={styles.timerSubject}>{subject}</Text>
            </View>
          </Animated.View>
        </View>

        {/* Time Selection */}
        {!isRunning && (
          <View style={styles.timeSelection}>
            <Text style={styles.sectionTitle}>Duration</Text>
            <View style={styles.timeButtons}>
              {timeOptions.map((time) => (
                <TimeButton
                  key={time}
                  minutes={time}
                  isSelected={selectedTime === time}
                  onPress={selectTime}
                />
              ))}
            </View>
          </View>
        )}

        {/* Subject Selection */}
        <View style={styles.subjectSelection}>
          <Text style={styles.sectionTitle}>Subject</Text>
          <View style={styles.subjectButtons}>
            {subjects.map((subjectName) => (
              <SubjectButton
                key={subjectName}
                subjectName={subjectName}
                isSelected={subject === subjectName}
                onPress={setSubject}
              />
            ))}
          </View>
        </View>

        {/* Control Buttons */}
        <View style={styles.controlButtons}>
          {!isRunning ? (
            <TouchableOpacity 
              style={styles.startButton} 
              onPress={startTimer}
              activeOpacity={0.8}
            >
              <Ionicons name="play" size={28} color={colors.white} />
              <Text style={styles.startButtonText}>Start Focus Session</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.runningControls}>
              <TouchableOpacity
                style={[styles.controlButton, { backgroundColor: isPaused ? colors.success : colors.warning }]}
                onPress={isPaused ? resumeTimer : pauseTimer}
                activeOpacity={0.8}
              >
                <Ionicons 
                  name={isPaused ? "play" : "pause"} 
                  size={28} 
                  color={colors.white} 
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.controlButton, { backgroundColor: colors.danger }]} 
                onPress={resetTimer}
                activeOpacity={0.8}
              >
                <Ionicons name="stop" size={28} color={colors.white} />
              </TouchableOpacity>
            </View>
          )}
        </View>
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
  header: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.hero,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    opacity: 0.8,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  timerCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 6,
    ...shadows.large,
  },
  progressRing: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
  },
  progressFill: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 4,
    borderColor: 'transparent',
  },
  timerContent: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 52,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  timerLabel: {
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    opacity: 0.7,
    marginBottom: spacing.xs,
  },
  timerSubject: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    opacity: 0.6,
  },
  timeSelection: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  timeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeButton: {
    width: (width - spacing.xl * 2 - spacing.md * 3) / 4,
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    ...shadows.small,
    borderWidth: 1,
    borderColor: 'rgba(139, 115, 85, 0.2)',
  },
  timeButtonSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    transform: [{ scale: 1.05 }],
    ...shadows.medium,
  },
  timeButtonDisabled: {
    opacity: 0.5,
  },
  timeButtonText: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  timeButtonTextSelected: {
    color: colors.textOnPrimary,
  },
  timeButtonLabel: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    opacity: 0.7,
    marginTop: 2,
  },
  timeButtonLabelSelected: {
    color: colors.textOnPrimary,
    opacity: 0.9,
  },
  subjectSelection: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  subjectButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  subjectButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    ...shadows.small,
    borderWidth: 1,
    borderColor: 'rgba(139, 115, 85, 0.2)',
  },
  subjectButtonSelected: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  subjectButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  subjectButtonTextSelected: {
    color: colors.textOnPrimary,
  },
  controlButtons: {
    paddingHorizontal: spacing.xl,
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: spacing.xl,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    marginHorizontal: spacing.lg,
    ...shadows.large,
    borderWidth: 1,
    borderColor: 'rgba(139, 115, 85, 0.3)',
  },
  startButtonText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textOnPrimary,
    marginLeft: spacing.sm,
  },
  runningControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  controlButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
});

export default TimerScreen;