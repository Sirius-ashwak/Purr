import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
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
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    setIsPaused(false);
    completeFocusSession(selectedTime * 60, subject);
    Alert.alert(
      '🎉 Great Job!',
      `You completed a ${selectedTime}-minute focus session! You earned Fish Treats and Seeds.`,
      [{ text: 'Awesome!', onPress: resetTimer }]
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

  const TimeButton = ({ minutes, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.timeButton,
        isSelected && styles.timeButtonSelected,
        isRunning && styles.timeButtonDisabled,
      ]}
      onPress={() => onPress(minutes)}
      disabled={isRunning}
    >
      <Text style={[
        styles.timeButtonText,
        isSelected && styles.timeButtonTextSelected,
      ]}>
        {minutes}m
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
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Focus Timer</Text>
        <Text style={styles.subtitle}>Stay focused and earn rewards!</Text>
      </View>

      {/* Timer Circle */}
      <View style={styles.timerContainer}>
        <View style={styles.timerCircle}>
          <View style={styles.progressRing}>
            <View 
              style={[
                styles.progressFill,
                { 
                  transform: [{ rotate: `${(getProgress() * 3.6)}deg` }],
                  opacity: isRunning ? 1 : 0.3,
                }
              ]} 
            />
          </View>
          <View style={styles.timerContent}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            <Text style={styles.timerLabel}>
              {isRunning ? (isPaused ? 'Paused' : 'Focusing') : 'Ready'}
            </Text>
          </View>
        </View>
      </View>

      {/* Time Selection */}
      {!isRunning && (
        <View style={styles.timeSelection}>
          <Text style={styles.sectionTitle}>Select Duration</Text>
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
            <Ionicons name="play" size={24} color={colors.white} />
            <Text style={styles.startButtonText}>Start Focus</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.runningControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={isPaused ? resumeTimer : pauseTimer}
            >
              <Ionicons 
                name={isPaused ? "play" : "pause"} 
                size={24} 
                color={colors.white} 
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetButton} onPress={resetTimer}>
              <Ionicons name="stop" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Tips */}
      <View style={styles.tipsCard}>
        <Text style={styles.tipsTitle}>💡 Focus Tips</Text>
        <Text style={styles.tipsText}>
          • Put your phone in silent mode{'\n'}
          • Find a quiet, comfortable space{'\n'}
          • Take breaks between sessions{'\n'}
          • Stay hydrated!
        </Text>
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
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  timerCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    ...shadows.large,
  },
  progressRing: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 8,
    borderColor: colors.progressBackground,
  },
  progressFill: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 8,
    borderColor: colors.accent,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
  },
  timerContent: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  timerLabel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  timeSelection: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  timeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  timeButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.progressBackground,
    ...shadows.small,
  },
  timeButtonSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  timeButtonDisabled: {
    opacity: 0.5,
  },
  timeButtonText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  timeButtonTextSelected: {
    color: colors.white,
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
    borderRadius: borderRadius.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.progressBackground,
  },
  subjectButtonSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  subjectButtonText: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },
  subjectButtonTextSelected: {
    color: colors.white,
  },
  controlButtons: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    ...shadows.medium,
  },
  startButtonText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.white,
    marginLeft: spacing.sm,
  },
  runningControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  resetButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  tipsCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.xl,
    ...shadows.small,
  },
  tipsTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  tipsText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});

export default TimerScreen;