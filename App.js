import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar, 
  Platform, 
  TouchableOpacity, 
  ScrollView,
  TextInput,
  Modal,
  Animated,
  Alert,
  Vibration
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Note: Avoid using Dimensions for now to reduce layout edge cases

export default function App() {
  console.log('🐾 PurrPlan World - Premium App Starting...');
  
  // Animation References
  const catBounceAnim = useRef(new Animated.Value(1)).current;
  // Start at 0 and map to scale 1 via interpolation so items are visible by default
  const coinAnim = useRef(new Animated.Value(0)).current;
  const levelUpAnim = useRef(new Animated.Value(0)).current;
  
  // Core Game State
  const [gameState, setGameState] = useState({
    fishTreats: 150,
    gardenSeeds: 75,
    crystalGems: 10,
    level: 1,
    experience: 0,
    experienceToNext: 100,
    totalTasksCompleted: 0,
    totalFocusMinutes: 0,
    totalPlantsHarvested: 0,
    streak: 0,
    lastActiveDate: new Date().toDateString(),
  });
  
  // Enhanced Cat State
  const [cats, setCats] = useState([
    {
      id: 'whiskers',
      name: 'Whiskers',
      breed: 'tabby',
      mood: 'Excited',
      energy: 90,
      happiness: 85,
      isActive: true,
      color: '#FF6B6B',
      accessory: '🎀',
      favoriteActivity: 'gardening',
    }
  ]);
  
  // Tasks State with Priority System
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  
  // Enhanced Garden State
  const [garden, setGarden] = useState(
    Array(9).fill(null).map((_, index) => ({
      id: index,
      plant: null,
      stage: 'empty', // empty, planted, growing, ready, withered
      plantedAt: null,
      plantType: null, // tomato, carrot, flower, tree
      waterLevel: 100,
      fertilizerUsed: false,
    }))
  );
  
  // Advanced Focus Timer State
  const [focusTimer, setFocusTimer] = useState({
    isRunning: false,
    timeLeft: 25 * 60, // 25 minutes
    totalTime: 25 * 60,
    sessionsToday: 0,
    currentSession: 0,
    breakTime: false,
    pauseCount: 0,
    productivity: 100,
  });
  
  // UI and Navigation State
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [rewardData, setRewardData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Safe active cat fallback
  const activeCat = (cats && cats.length > 0) ? cats[0] : {
    id: 'default',
    name: 'Whiskers',
    breed: 'tabby',
    mood: 'Happy',
    energy: 80,
    happiness: 80,
    isActive: true,
    color: '#FF6B6B',
    accessory: '🎀',
    favoriteActivity: 'gardening',
  };

  // Purple gradient colors (top -> bottom)
  const gradientColors = [
    '#2e004f', '#3a0a6a', '#4a148c', '#5b2ca3', '#6c4ab6', '#7e60c0', '#8e79d6', '#9b8ee5'
  ];

  const GradientBackground = () => (
    <View style={styles.gradientContainer}>
      {gradientColors.map((c, i) => (
        <View key={i} style={[styles.gradientBand, { backgroundColor: c }]} />
      ))}
    </View>
  );
  
  // Plant Types Configuration
  const plantTypes = {
    tomato: { emoji: '🍅', name: 'Tomato', cost: 10, reward: { treats: 20, seeds: 5, exp: 25, gems: 1 }, growTime: 120000 },
    carrot: { emoji: '🥕', name: 'Carrot', cost: 15, reward: { treats: 30, seeds: 8, exp: 35, gems: 1 }, growTime: 180000 },
    flower: { emoji: '🌸', name: 'Flower', cost: 20, reward: { treats: 15, seeds: 12, exp: 40, gems: 2 }, growTime: 240000 },
    tree: { emoji: '🌳', name: 'Tree', cost: 50, reward: { treats: 100, seeds: 25, exp: 100, gems: 5 }, growTime: 600000 },
  };
  
  // Task Priority Configuration
  const priorityConfig = {
    low: { color: '#95a5a6', multiplier: 1, emoji: '🟢' },
    medium: { color: '#f39c12', multiplier: 1.5, emoji: '🟡' },
    high: { color: '#e74c3c', multiplier: 2, emoji: '🔴' },
    urgent: { color: '#8e44ad', multiplier: 3, emoji: '🟣' },
  };
  
  // Initialize App
  useEffect(() => {
    initializeApp();
    startCatAnimation();
    checkDailyStreak();
  }, []);
  
  // Auto-save game data
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      saveGameData();
    }, 1000);
    return () => clearTimeout(saveTimeout);
  }, [gameState, tasks, garden, cats]);
  
  // Focus timer logic
  useEffect(() => {
    let interval;
    if (focusTimer.isRunning && focusTimer.timeLeft > 0) {
      interval = setInterval(() => {
        setFocusTimer(prev => ({
          ...prev,
          timeLeft: Math.max(0, prev.timeLeft - 1),
        }));
      }, 1000);
    } else if (focusTimer.timeLeft === 0 && focusTimer.isRunning) {
      completeFocusSession();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [focusTimer.isRunning, focusTimer.timeLeft]);
  
  // Garden auto-growth logic
  useEffect(() => {
    const growthInterval = setInterval(() => {
      updateGardenGrowth();
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(growthInterval);
  }, [garden]);
  
  // Initialize App
  const initializeApp = async () => {
    await loadGameData();
    showWelcomeNotification();
  };
  
  // Cat Animations
  const startCatAnimation = () => {
    const bounce = () => {
      Animated.sequence([
        Animated.timing(catBounceAnim, { 
          toValue: 1.15, 
          duration: 2000, 
          useNativeDriver: true 
        }),
        Animated.timing(catBounceAnim, { 
          toValue: 1, 
          duration: 2000, 
          useNativeDriver: true 
        }),
      ]).start(() => bounce());
    };
    bounce();
  };
  
  // Coin Animation
  const animateCoinEarn = () => {
    coinAnim.setValue(0);
    Animated.sequence([
      Animated.timing(coinAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(coinAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  };
  
  // Level Up Animation
  const animateLevelUp = () => {
    Vibration.vibrate(200);
    levelUpAnim.setValue(0);
    Animated.sequence([
      Animated.spring(levelUpAnim, { toValue: 1, useNativeDriver: true }),
      Animated.timing(levelUpAnim, { toValue: 0, duration: 2000, useNativeDriver: true }),
    ]).start();
  };
  
  // Save/Load Game Data
  const saveGameData = async () => {
    try {
      const data = {
        gameState,
        tasks,
        garden,
        cats,
        focusTimer: { ...focusTimer, isRunning: false },
        achievements,
        lastSaved: new Date().toISOString(),
      };
      await AsyncStorage.setItem('purrplan_premium_data', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save game data:', error);
    }
  };
  
  const loadGameData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('purrplan_premium_data');
      if (savedData) {
        const data = JSON.parse(savedData);
        setGameState(data.gameState || gameState);
        setTasks(data.tasks || []);
        setGarden(data.garden || garden);
        setCats(data.cats || cats);
        setFocusTimer(prev => ({ ...prev, ...data.focusTimer, isRunning: false }));
        setAchievements(data.achievements || []);
      }
    } catch (error) {
      console.error('Failed to load game data:', error);
    }
  };
  
  // Daily Streak System
  const checkDailyStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (gameState.lastActiveDate === yesterday) {
      setGameState(prev => ({ ...prev, streak: prev.streak + 1, lastActiveDate: today }));
    } else if (gameState.lastActiveDate !== today) {
      setGameState(prev => ({ ...prev, streak: 1, lastActiveDate: today }));
    }
  };
  
  // Reward System
  const earnRewards = (treats, seeds, exp, gems = 0, source = 'activity') => {
    animateCoinEarn();
    
    setGameState(prev => {
      const newExp = prev.experience + exp;
      const levelUp = newExp >= prev.experienceToNext;
      
      const newState = {
        ...prev,
        fishTreats: prev.fishTreats + treats,
        gardenSeeds: prev.gardenSeeds + seeds,
        crystalGems: prev.crystalGems + gems,
        experience: levelUp ? newExp - prev.experienceToNext : newExp,
        level: levelUp ? prev.level + 1 : prev.level,
        experienceToNext: levelUp ? Math.floor(prev.experienceToNext * 1.5) : prev.experienceToNext,
      };
      
      if (levelUp) {
        animateLevelUp();
        setShowLevelUpModal(true);
        addNotification(`🎉 Level Up! Welcome to Level ${newState.level}!`);
      }
      
      return newState;
    });
    
    // Update cat happiness
    setCats(prev => prev.map(cat => ({
      ...cat,
      happiness: Math.min(100, cat.happiness + 5),
      energy: Math.min(100, cat.energy + 3),
    })));
    
    // Show reward modal
    setRewardData({ treats, seeds, exp, gems, source });
    setShowRewardModal(true);
  };
  
  // Task Management
  const addTask = () => {
    if (newTaskText.trim()) {
      const baseReward = { treats: 15, seeds: 8, exp: 30, gems: 1 };
      const multiplier = priorityConfig[selectedPriority].multiplier;
      
      const newTask = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        priority: selectedPriority,
        createdAt: new Date().toISOString(),
        reward: {
          treats: Math.floor(baseReward.treats * multiplier),
          seeds: Math.floor(baseReward.seeds * multiplier),
          exp: Math.floor(baseReward.exp * multiplier),
          gems: Math.floor(baseReward.gems * multiplier),
        },
      };
      
      setTasks(prev => [...prev, newTask]);
      setNewTaskText('');
      setSelectedPriority('medium');
      setShowTaskModal(false);
      addNotification('📝 New task added!');
    }
  };
  
  const completeTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task && !task.completed) {
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, completed: true, completedAt: new Date().toISOString() } : t
      ));
      
      setGameState(prev => ({ 
        ...prev, 
        totalTasksCompleted: prev.totalTasksCompleted + 1 
      }));
      
      earnRewards(task.reward.treats, task.reward.seeds, task.reward.exp, task.reward.gems, 'task');
      checkAchievements('task_completed');
    }
  };
  
  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    addNotification('🗑️ Task deleted');
  };
  
  // Focus Timer System
  const startFocusSession = () => {
    setFocusTimer(prev => ({
      ...prev,
      isRunning: true,
      timeLeft: prev.totalTime,
      currentSession: prev.currentSession + 1,
      breakTime: false,
    }));
    addNotification('🎯 Focus session started!');
  };
  
  const pauseFocusSession = () => {
    setFocusTimer(prev => ({
      ...prev,
      isRunning: false,
      pauseCount: prev.pauseCount + 1,
      productivity: Math.max(50, prev.productivity - 10),
    }));
  };
  
  const resumeFocusSession = () => {
    setFocusTimer(prev => ({ ...prev, isRunning: true }));
  };
  
  const stopFocusSession = () => {
    setFocusTimer(prev => ({
      ...prev,
      isRunning: false,
      timeLeft: prev.totalTime,
      pauseCount: 0,
      productivity: 100,
    }));
    addNotification('⏹️ Focus session stopped');
  };
  
  const completeFocusSession = () => {
    const session = focusTimer;
    const bonus = session.productivity > 80 ? 1.5 : 1;
    const minutes = Math.floor((session.totalTime - session.timeLeft) / 60);
    
    setFocusTimer(prev => ({
      ...prev,
      isRunning: false,
      timeLeft: prev.totalTime,
      sessionsToday: prev.sessionsToday + 1,
      pauseCount: 0,
      productivity: 100,
    }));
    
    setGameState(prev => ({ 
      ...prev, 
      totalFocusMinutes: prev.totalFocusMinutes + minutes 
    }));
    
    const rewards = {
      treats: Math.floor(25 * bonus),
      seeds: Math.floor(10 * bonus),
      exp: Math.floor(50 * bonus),
      gems: Math.floor(2 * bonus),
    };
    
    earnRewards(rewards.treats, rewards.seeds, rewards.exp, rewards.gems, 'focus');
    checkAchievements('focus_completed');
    addNotification('🎯 Focus session complete!');
  };
  
  // Garden Management
  const plantSeed = (plotId, plantType) => {
    const plant = plantTypes[plantType];
    if (gameState.gardenSeeds >= plant.cost) {
      setGarden(prev => prev.map(plot => 
        plot.id === plotId ? {
          ...plot,
          plant: plantType,
          plantType: plantType,
          stage: 'planted',
          plantedAt: new Date().toISOString(),
          waterLevel: 100,
          fertilizerUsed: false,
        } : plot
      ));
      
      setGameState(prev => ({ ...prev, gardenSeeds: prev.gardenSeeds - plant.cost }));
      addNotification(`🌱 ${plant.name} planted!`);
      
      // Start growth timer
      setTimeout(() => {
        setGarden(prev => prev.map(plot => 
          plot.id === plotId && plot.stage === 'planted' ? { ...plot, stage: 'growing' } : plot
        ));
      }, plant.growTime * 0.3);
      
      setTimeout(() => {
        setGarden(prev => prev.map(plot => 
          plot.id === plotId && plot.stage === 'growing' ? { ...plot, stage: 'ready' } : plot
        ));
        addNotification(`🌿 Your ${plant.name} is ready to harvest!`);
      }, plant.growTime);
    } else {
      Alert.alert('Not enough seeds! 🌱', `You need ${plant.cost} seeds to plant ${plant.name}.`);
    }
  };
  
  const waterPlant = (plotId) => {
    setGarden(prev => prev.map(plot => 
      plot.id === plotId ? { ...plot, waterLevel: 100 } : plot
    ));
    addNotification('💧 Plant watered!');
  };
  
  const useFertilizer = (plotId) => {
    if (gameState.crystalGems >= 1) {
      setGarden(prev => prev.map(plot => 
        plot.id === plotId ? { ...plot, fertilizerUsed: true } : plot
      ));
      setGameState(prev => ({ ...prev, crystalGems: prev.crystalGems - 1 }));
      addNotification('💎 Fertilizer applied!');
    }
  };
  
  const harvestPlant = (plotId) => {
    const plot = garden.find(p => p.id === plotId);
    if (plot && plot.stage === 'ready') {
      const plant = plantTypes[plot.plantType];
      const bonus = plot.fertilizerUsed ? 1.5 : 1;
      
      setGarden(prev => prev.map(p => 
        p.id === plotId ? {
          ...p,
          plant: null,
          plantType: null,
          stage: 'empty',
          plantedAt: null,
          waterLevel: 100,
          fertilizerUsed: false,
        } : p
      ));
      
      setGameState(prev => ({ 
        ...prev, 
        totalPlantsHarvested: prev.totalPlantsHarvested + 1 
      }));
      
      const rewards = {
        treats: Math.floor(plant.reward.treats * bonus),
        seeds: Math.floor(plant.reward.seeds * bonus),
        exp: Math.floor(plant.reward.exp * bonus),
        gems: Math.floor(plant.reward.gems * bonus),
      };
      
      earnRewards(rewards.treats, rewards.seeds, rewards.exp, rewards.gems, 'harvest');
      checkAchievements('plant_harvested');
    }
  };
  
  const updateGardenGrowth = () => {
    setGarden(prev => prev.map(plot => {
      if (plot.stage === 'planted' || plot.stage === 'growing') {
        return { ...plot, waterLevel: Math.max(0, plot.waterLevel - 2) };
      }
      return plot;
    }));
  };
  
  // Achievement System
  const checkAchievements = (trigger) => {
    const newAchievements = [];
    
    // Task achievements
    if (trigger === 'task_completed') {
      if (gameState.totalTasksCompleted + 1 === 10) {
        newAchievements.push({ id: 'tasks_10', title: 'Task Master', description: 'Complete 10 tasks' });
      }
    }
    
    // Focus achievements
    if (trigger === 'focus_completed') {
      if (focusTimer.sessionsToday + 1 === 5) {
        newAchievements.push({ id: 'focus_5', title: 'Focus Champion', description: 'Complete 5 focus sessions in one day' });
      }
    }
    
    // Garden achievements
    if (trigger === 'plant_harvested') {
      if (gameState.totalPlantsHarvested + 1 === 25) {
        newAchievements.push({ id: 'harvest_25', title: 'Green Thumb', description: 'Harvest 25 plants' });
      }
    }
    
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
      newAchievements.forEach(achievement => {
        addNotification(`🏆 Achievement Unlocked: ${achievement.title}!`);
      });
    }
  };
  
  // Notification System
  const addNotification = (message) => {
    const notification = {
      id: Date.now(),
      message,
      timestamp: new Date().toISOString(),
    };
    
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  };
  
  const showWelcomeNotification = () => {
    addNotification('🐾 Welcome back to PurrPlan World!');
  };
  
  // Utility Functions
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };
  
  const getCatMoodEmoji = () => {
    const moods = ['😸', '😺', '😻', '🙀', '😾', '😿'];
    return moods[Math.floor(Math.random() * moods.length)];
  };
  
  
  // Screen Rendering Functions
  const renderHomeScreen = () => (
    <ScrollView style={styles.screenContainer} showsVerticalScrollIndicator={false}>
      {/* Dynamic Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🐾 PurrPlan World</Text>
        <Text style={styles.greeting}>{getTimeOfDayGreeting()}, Planner!</Text>
        <Text style={styles.tagline}>Level {gameState.level} • {gameState.streak} day streak 🔥</Text>
      </View>

      {/* Enhanced Currency Display */}
      <View style={styles.currencyContainer}>
        <Animated.View style={[
          styles.currencyItem, 
          { transform: [{ scale: coinAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] }) }] }
        ]}>
          <Text style={styles.currencyIcon}>🐟</Text>
          <Text style={styles.currencyValue}>{gameState.fishTreats}</Text>
          <Text style={styles.currencyLabel}>Treats</Text>
        </Animated.View>
        <Animated.View style={[
          styles.currencyItem, 
          { transform: [{ scale: coinAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] }) }] }
        ]}>
          <Text style={styles.currencyIcon}>🌱</Text>
          <Text style={styles.currencyValue}>{gameState.gardenSeeds}</Text>
          <Text style={styles.currencyLabel}>Seeds</Text>
        </Animated.View>
        <Animated.View style={[
          styles.currencyItem, 
          { transform: [{ scale: coinAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] }) }] }
        ]}>
          <Text style={styles.currencyIcon}>💎</Text>
          <Text style={styles.currencyValue}>{gameState.crystalGems}</Text>
          <Text style={styles.currencyLabel}>Gems</Text>
        </Animated.View>
      </View>

      {/* Enhanced Cat Display */}
      <View style={styles.catContainer}>
        <Animated.View style={[styles.catMascot, { 
          transform: [{ scale: catBounceAnim }],
          backgroundColor: activeCat.color 
        }]}>
          <Text style={styles.catEmoji}>{getCatMoodEmoji()}</Text>
          <Text style={styles.catAccessory}>{activeCat.accessory}</Text>
        </Animated.View>
        <Text style={styles.catName}>{activeCat.name}</Text>
        <Text style={styles.catStatus}>
          Mood: {activeCat.mood} • Energy: {activeCat.energy}/100 • ❤️ {activeCat.happiness}/100
        </Text>
        
        {/* Enhanced Progress Bar */}
        <View style={styles.expBarContainer}>
          <View style={styles.expBar}>
            <Animated.View style={[
              styles.expFill, 
              { 
                width: `${Math.max(0, Math.min(100, gameState.experienceToNext ? (gameState.experience / gameState.experienceToNext) * 100 : 0))}%` 
              }
            ]} />
            <Text style={styles.expText}>
              {gameState.experience}/{gameState.experienceToNext} XP
            </Text>
          </View>
          <Animated.View style={[
            styles.levelUpIndicator,
            { transform: [{ scale: levelUpAnim }] }
          ]}>
            <Text style={styles.levelUpText}>🎉</Text>
          </Animated.View>
        </View>
      </View>

      {/* Enhanced Stats Dashboard */}
      <View style={styles.statsCard}>
        <Text style={styles.statsTitle}>📊 Your Progress Today</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{tasks.filter(t => t.completed).length}</Text>
            <Text style={styles.statText}>Tasks Done</Text>
            <Text style={styles.statEmoji}>✅</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{focusTimer.sessionsToday}</Text>
            <Text style={styles.statText}>Focus Sessions</Text>
            <Text style={styles.statEmoji}>🎯</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{garden.filter(p => p.stage === 'ready').length}</Text>
            <Text style={styles.statText}>Ready Plants</Text>
            <Text style={styles.statEmoji}>🌿</Text>
          </View>
        </View>
        
        {/* Lifetime Stats */}
        <View style={styles.lifetimeStats}>
          <Text style={styles.lifetimeTitle}>🏆 Lifetime Stats</Text>
          <View style={styles.lifetimeGrid}>
            <Text style={styles.lifetimeStat}>📝 {gameState.totalTasksCompleted} tasks</Text>
            <Text style={styles.lifetimeStat}>⏰ {gameState.totalFocusMinutes} minutes</Text>
            <Text style={styles.lifetimeStat}>🌱 {gameState.totalPlantsHarvested} harvests</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsCard}>
        <Text style={styles.quickActionsTitle}>⚡ Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => setCurrentScreen('tasks')}
          >
            <Text style={styles.quickActionEmoji}>📝</Text>
            <Text style={styles.quickActionText}>Add Task</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => setCurrentScreen('focus')}
          >
            <Text style={styles.quickActionEmoji}>🎯</Text>
            <Text style={styles.quickActionText}>Focus Now</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickActionButton}
            onPress={() => setCurrentScreen('garden')}
          >
            <Text style={styles.quickActionEmoji}>🌱</Text>
            <Text style={styles.quickActionText}>Check Garden</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  const renderTasksScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>📝 Task Manager</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowTaskModal(true)}
        >
          <Text style={styles.addButtonText}>+ New Task</Text>
        </TouchableOpacity>
      </View>
      
      {/* Task Stats */}
      <View style={styles.taskStats}>
        <View style={styles.taskStatItem}>
          <Text style={styles.taskStatNumber}>{tasks.filter(t => !t.completed).length}</Text>
          <Text style={styles.taskStatLabel}>Pending</Text>
        </View>
        <View style={styles.taskStatItem}>
          <Text style={styles.taskStatNumber}>{tasks.filter(t => t.completed).length}</Text>
          <Text style={styles.taskStatLabel}>Completed</Text>
        </View>
        <View style={styles.taskStatItem}>
          <Text style={styles.taskStatNumber}>{gameState.totalTasksCompleted}</Text>
          <Text style={styles.taskStatLabel}>Total Done</Text>
        </View>
      </View>
      
      <ScrollView style={styles.tasksList} showsVerticalScrollIndicator={false}>
        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateEmoji}>📋</Text>
            <Text style={styles.emptyStateText}>No tasks yet!</Text>
            <Text style={styles.emptyStateSubtext}>Add your first task to start earning rewards</Text>
          </View>
        ) : (
          tasks.map(task => (
            <View key={task.id} style={[
              styles.taskItem, 
              task.completed && styles.taskCompleted,
              { borderLeftColor: priorityConfig[task.priority].color }
            ]}>
              <TouchableOpacity 
                style={styles.taskContent}
                onPress={() => completeTask(task.id)}
                disabled={task.completed}
              >
                <Text style={styles.taskPriority}>{priorityConfig[task.priority].emoji}</Text>
                <View style={styles.taskTextContainer}>
                  <Text style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
                    {task.text}
                  </Text>
                  <Text style={styles.taskReward}>
                    Reward: +{task.reward.treats}🐟 +{task.reward.seeds}🌱 +{task.reward.exp}⭐ +{task.reward.gems}💎
                  </Text>
                </View>
                <Text style={styles.taskCheckbox}>{task.completed ? '✅' : '⬜'}</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteTask(task.id)}
              >
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );

  const renderFocusScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>🎯 Focus Zone</Text>
        <Text style={styles.screenSubtitle}>Deep work sessions with rewards</Text>
      </View>
      
      <View style={styles.timerContainer}>
        {/* Enhanced Timer Display */}
        <View style={[styles.timerCircle, focusTimer.isRunning && styles.timerActive]}>
          <Text style={styles.timerText}>{formatTime(focusTimer.timeLeft)}</Text>
          <Text style={styles.timerSession}>Session {focusTimer.currentSession}</Text>
          {focusTimer.isRunning && (
            <View style={styles.progressRing}>
              <View style={[
                styles.progressFill,
                { 
                  width: `${Math.max(0, Math.min(100, focusTimer.totalTime ? ((focusTimer.totalTime - focusTimer.timeLeft) / focusTimer.totalTime) * 100 : 0))}%` 
                }
              ]} />
            </View>
          )}
        </View>
        
        {/* Productivity Indicator */}
        <View style={styles.productivityContainer}>
          <Text style={styles.productivityLabel}>Productivity: {focusTimer.productivity}%</Text>
          <View style={styles.productivityBar}>
            <View style={[
              styles.productivityFill,
              { 
                width: `${focusTimer.productivity}%`,
                backgroundColor: focusTimer.productivity > 80 ? '#7e60c0' : '#b388ff'
              }
            ]} />
          </View>
        </View>
        
        {/* Enhanced Timer Controls */}
        <View style={styles.timerControls}>
          {!focusTimer.isRunning ? (
            <TouchableOpacity style={styles.timerButton} onPress={startFocusSession}>
              <Text style={styles.timerButtonText}>▶️ Start Focus (25min)</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.activeControls}>
              <TouchableOpacity 
                style={[styles.timerButton, styles.pauseButton]} 
                onPress={pauseFocusSession}
              >
                <Text style={styles.timerButtonText}>⏸️ Pause</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.timerButton, styles.stopButton]} 
                onPress={stopFocusSession}
              >
                <Text style={styles.timerButtonText}>⏹️ Stop</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {!focusTimer.isRunning && focusTimer.timeLeft < focusTimer.totalTime && (
            <TouchableOpacity style={styles.resumeButton} onPress={resumeFocusSession}>
              <Text style={styles.resumeButtonText}>▶️ Resume</Text>
            </TouchableOpacity>
          )}
        </View>
        
        {/* Focus Stats */}
        <View style={styles.focusStats}>
          <View style={styles.focusStatItem}>
            <Text style={styles.focusStatNumber}>{focusTimer.sessionsToday}</Text>
            <Text style={styles.focusStatLabel}>Today</Text>
          </View>
          <View style={styles.focusStatItem}>
            <Text style={styles.focusStatNumber}>{focusTimer.pauseCount}</Text>
            <Text style={styles.focusStatLabel}>Pauses</Text>
          </View>
          <View style={styles.focusStatItem}>
            <Text style={styles.focusStatNumber}>{gameState.totalFocusMinutes}</Text>
            <Text style={styles.focusStatLabel}>Total Min</Text>
          </View>
        </View>
        
        <Text style={styles.timerReward}>
          🎁 Reward: +25🐟 +10🌱 +50⭐ +2💎
        </Text>
      </View>
    </View>
  );

  const renderGardenScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>🌿 Magic Garden</Text>
        <Text style={styles.screenSubtitle}>Grow plants, earn rewards</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Garden Grid */}
        <View style={styles.gardenGrid}>
          {garden.map(plot => {
            const plant = plot.plantType ? plantTypes[plot.plantType] : null;
            return (
              <View key={plot.id} style={styles.gardenPlotContainer}>
                <TouchableOpacity 
                  style={[
                    styles.gardenPlot,
                    plot.stage === 'ready' && styles.plotReady,
                    plot.waterLevel < 30 && styles.plotThirsty
                  ]}
                  onPress={() => {
                    if (plot.stage === 'empty') {
                      // Show plant selection
                      Alert.alert(
                        'Choose Plant',
                        'What would you like to plant?',
                        Object.entries(plantTypes).map(([key, plantData]) => ({
                          text: `${plantData.emoji} ${plantData.name} (${plantData.cost}🌱)`,
                          onPress: () => plantSeed(plot.id, key)
                        })).concat([{ text: 'Cancel', style: 'cancel' }])
                      );
                    } else if (plot.stage === 'ready') {
                      harvestPlant(plot.id);
                    }
                  }}
                >
                  <Text style={styles.plotEmoji}>
                    {plot.stage === 'empty' && '🟫'}
                    {plot.stage === 'planted' && '🌱'}
                    {plot.stage === 'growing' && plant?.emoji}
                    {plot.stage === 'ready' && `✨${plant?.emoji}✨`}
                  </Text>
                  <Text style={styles.plotText}>
                    {plot.stage === 'empty' && 'Tap to Plant'}
                    {plot.stage === 'planted' && 'Growing...'}
                    {plot.stage === 'growing' && `${plant?.name}`}
                    {plot.stage === 'ready' && 'Tap to Harvest!'}
                  </Text>
                  
                  {/* Water Level Indicator */}
                  {plot.stage !== 'empty' && (
                    <View style={styles.waterIndicator}>
                      <View style={[
                        styles.waterLevel,
                        { width: `${plot.waterLevel}%` }
                      ]} />
                    </View>
                  )}
                  
                  {/* Fertilizer Indicator */}
                  {plot.fertilizerUsed && (
                    <Text style={styles.fertilizerIndicator}>💎</Text>
                  )}
                </TouchableOpacity>
                
                {/* Plot Actions */}
                {plot.stage !== 'empty' && plot.stage !== 'ready' && (
                  <View style={styles.plotActions}>
                    <TouchableOpacity 
                      style={styles.plotActionButton}
                      onPress={() => waterPlant(plot.id)}
                    >
                      <Text style={styles.plotActionText}>💧</Text>
                    </TouchableOpacity>
                    {!plot.fertilizerUsed && (
                      <TouchableOpacity 
                        style={styles.plotActionButton}
                        onPress={() => useFertilizer(plot.id)}
                      >
                        <Text style={styles.plotActionText}>💎</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
        
        {/* Garden Info & Tips */}
        <View style={styles.gardenInfoCard}>
          <Text style={styles.gardenInfoTitle}>🌱 Garden Guide</Text>
          <View style={styles.plantTypes}>
            {Object.entries(plantTypes).map(([key, plant]) => (
              <View key={key} style={styles.plantTypeInfo}>
                <Text style={styles.plantTypeEmoji}>{plant.emoji}</Text>
                <View style={styles.plantTypeDetails}>
                  <Text style={styles.plantTypeName}>{plant.name}</Text>
                  <Text style={styles.plantTypeCost}>Cost: {plant.cost}🌱</Text>
                  <Text style={styles.plantTypeReward}>
                    +{plant.reward.treats}🐟 +{plant.reward.seeds}🌱 +{plant.reward.exp}⭐ +{plant.reward.gems}💎
                  </Text>
                </View>
              </View>
            ))}
          </View>
          
          <View style={styles.gardenTips}>
            <Text style={styles.gardenTip}>💡 Water plants to keep them healthy</Text>
            <Text style={styles.gardenTip}>💎 Use fertilizer for 1.5x rewards</Text>
            <Text style={styles.gardenTip}>🌿 Higher tier plants give better rewards</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4a148c" />
      <GradientBackground />
      
      {/* Notifications */}
      <View style={styles.notificationContainer}>
        {notifications.map(notification => (
          <Animated.View 
            key={notification.id} 
            style={styles.notification}
          >
            <Text style={styles.notificationText}>{notification.message}</Text>
          </Animated.View>
        ))}
      </View>
      
      {/* Enhanced Navigation Bar */}
  <View style={styles.navbar}>
        {[
          { key: 'home', icon: '🏠', label: 'Home' },
          { key: 'tasks', icon: '📝', label: 'Tasks', badge: tasks.filter(t => !t.completed).length },
          { key: 'focus', icon: '🎯', label: 'Focus', active: focusTimer.isRunning },
          { key: 'garden', icon: '🌿', label: 'Garden', badge: garden.filter(p => p.stage === 'ready').length },
        ].map(nav => (
          <TouchableOpacity 
            key={nav.key}
            style={[styles.navItem, currentScreen === nav.key && styles.navItemActive]}
            onPress={() => setCurrentScreen(nav.key)}
          >
            <View style={styles.navIconContainer}>
              <Text style={[styles.navIcon, nav.active && styles.navIconActive]}>
                {nav.icon}
              </Text>
              {nav.badge > 0 && (
                <View style={styles.navBadge}>
                  <Text style={styles.navBadgeText}>{nav.badge > 9 ? '9+' : nav.badge}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.navLabel, currentScreen === nav.key && styles.navLabelActive]}>
              {nav.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Screen Content */}
      <View style={styles.content}>
        {currentScreen === 'home' && renderHomeScreen()}
        {currentScreen === 'tasks' && renderTasksScreen()}
        {currentScreen === 'focus' && renderFocusScreen()}
        {currentScreen === 'garden' && renderGardenScreen()}
      </View>

      {/* Enhanced Task Modal */}
      <Modal
        visible={showTaskModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowTaskModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>📝 Create New Task</Text>
            
            <TextInput
              style={styles.taskInput}
              placeholder="What would you like to accomplish?"
              placeholderTextColor="#b8a8ff"
              value={newTaskText}
              onChangeText={setNewTaskText}
              multiline
              autoFocus
            />
            
            {/* Priority Selection */}
            <Text style={styles.priorityLabel}>Priority Level:</Text>
            <View style={styles.priorityContainer}>
              {Object.entries(priorityConfig).map(([key, config]) => (
                <TouchableOpacity
                  key={key}
                  style={[
                    styles.priorityButton,
                    selectedPriority === key && { backgroundColor: config.color }
                  ]}
                  onPress={() => setSelectedPriority(key)}
                >
                  <Text style={styles.priorityEmoji}>{config.emoji}</Text>
                  <Text style={[
                    styles.priorityText,
                    selectedPriority === key && styles.priorityTextActive
                  ]}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Reward Preview */}
            <View style={styles.rewardPreview}>
              <Text style={styles.rewardPreviewTitle}>🎁 Reward Preview:</Text>
              <Text style={styles.rewardPreviewText}>
                +{Math.floor(15 * priorityConfig[selectedPriority].multiplier)}🐟 
                +{Math.floor(8 * priorityConfig[selectedPriority].multiplier)}🌱 
                +{Math.floor(30 * priorityConfig[selectedPriority].multiplier)}⭐ 
                +{Math.floor(1 * priorityConfig[selectedPriority].multiplier)}💎
              </Text>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowTaskModal(false);
                  setNewTaskText('');
                  setSelectedPriority('medium');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.addTaskButton]}
                onPress={addTask}
                disabled={!newTaskText.trim()}
              >
                <Text style={styles.addTaskButtonText}>Create Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Reward Modal */}
      <Modal
        visible={showRewardModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowRewardModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.rewardModalContent}>
            <Text style={styles.rewardModalTitle}>🎉 Rewards Earned!</Text>
            {rewardData && (
              <View style={styles.rewardDisplay}>
                <Text style={styles.rewardDisplayText}>
                  +{rewardData.treats} 🐟  +{rewardData.seeds} 🌱  +{rewardData.exp} ⭐
                </Text>
                {rewardData.gems > 0 && (
                  <Text style={styles.rewardDisplayText}>+{rewardData.gems} 💎</Text>
                )}
                <Text style={styles.rewardSource}>From: {rewardData.source}</Text>
              </View>
            )}
            <TouchableOpacity 
              style={styles.rewardCloseButton}
              onPress={() => setShowRewardModal(false)}
            >
              <Text style={styles.rewardCloseText}>Awesome! 🚀</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Level Up Modal */}
      <Modal
        visible={showLevelUpModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLevelUpModal(false)}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[
            styles.levelUpModalContent,
            { transform: [{ scale: levelUpAnim }] }
          ]}>
            <Text style={styles.levelUpTitle}>🎉 LEVEL UP! 🎉</Text>
            <Text style={styles.levelUpLevel}>Level {gameState.level}</Text>
            <Text style={styles.levelUpMessage}>You're becoming a productivity master!</Text>
            <TouchableOpacity 
              style={styles.levelUpButton}
              onPress={() => setShowLevelUpModal(false)}
            >
              <Text style={styles.levelUpButtonText}>Continue 🚀</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  // Gradient background layers
  gradientContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'column',
    pointerEvents: 'none',
  },
  gradientBand: {
    flex: 1,
  },
  
  // Notifications
  notificationContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  notification: {
    backgroundColor: 'rgba(155, 89, 182, 0.95)',
    padding: 12,
    borderRadius: 8,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  notificationText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Enhanced Navigation
  navbar: {
    flexDirection: 'row',
  backgroundColor: 'rgba(0,0,0,0.25)',
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 12 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  navItemActive: {
  backgroundColor: 'rgba(155, 89, 182, 0.25)',
    borderRadius: 12,
    marginHorizontal: 4,
  },
  navIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    fontSize: 22,
    marginBottom: 3,
  },
  navIconActive: {
    transform: [{ scale: 1.1 }],
  },
  navBadge: {
    position: 'absolute',
    top: -5,
    right: -8,
  backgroundColor: '#9b59b6',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  navLabel: {
    fontSize: 10,
  color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  navLabelActive: {
  color: '#d0b3ff',
    fontWeight: 'bold',
  },
  
  // Screen Layout
  content: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  backgroundColor: 'transparent',
  },
  screenHeader: {
    padding: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  screenSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  
  // Enhanced Header
  header: {
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  greeting: {
    fontSize: 16,
    color: '#ecf0f1',
    marginBottom: 2,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
  // Enhanced Currency
  currencyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  currencyItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 6,
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  currencyIcon: {
    fontSize: 18,
    marginBottom: 3,
  },
  currencyValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },
  currencyLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
  },
  
  // Enhanced Cat
  catContainer: {
    alignItems: 'center',
    paddingVertical: 25,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  catMascot: {
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  catEmoji: {
    fontSize: 50,
  },
  catAccessory: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 20,
  },
  catName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  catStatus: {
    fontSize: 11,
    color: '#ecf0f1',
    textAlign: 'center',
    marginBottom: 15,
  },
  expBarContainer: {
    width: '85%',
    position: 'relative',
  },
  expBar: {
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  expFill: {
    height: '100%',
  backgroundColor: '#bb86fc',
    borderRadius: 10,
  },
  expText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 11,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  levelUpIndicator: {
    position: 'absolute',
    right: -10,
    top: -5,
  },
  levelUpText: {
    fontSize: 30,
  },
  
  // Enhanced Stats
  statsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  color: '#2c2140',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  color: '#d0b3ff',
    marginBottom: 5,
  },
  statText: {
    fontSize: 10,
    color: '#7f8c8d',
    marginBottom: 3,
  },
  statEmoji: {
    fontSize: 16,
  },
  lifetimeStats: {
    borderTopWidth: 1,
  borderTopColor: 'rgba(255,255,255,0.4)',
    paddingTop: 15,
  },
  lifetimeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  color: '#2c2140',
    textAlign: 'center',
    marginBottom: 10,
  },
  lifetimeGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  lifetimeStat: {
    fontSize: 10,
  color: '#c9bbff',
    textAlign: 'center',
  },
  
  // Quick Actions
  quickActionsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  color: '#2c2140',
    textAlign: 'center',
    marginBottom: 15,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionButton: {
    alignItems: 'center',
  backgroundColor: '#f3edff',
    borderRadius: 15,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
  },
  quickActionEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  quickActionText: {
    fontSize: 11,
    color: '#2c3e50',
    fontWeight: '600',
  },
  
  // Task Management
  addButton: {
  backgroundColor: '#7e60c0',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  taskStatItem: {
    alignItems: 'center',
  },
  taskStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  taskStatLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  tasksList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateEmoji: {
    fontSize: 48,
    marginBottom: 15,
  },
  emptyStateText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 12,
    padding: 15,
    borderRadius: 15,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskCompleted: {
  backgroundColor: '#f6f0ff',
    opacity: 0.8,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskPriority: {
    fontSize: 16,
    marginRight: 12,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 14,
  color: '#2c2140',
    fontWeight: '500',
    marginBottom: 3,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
  color: '#9b8ee5',
  },
  taskReward: {
    fontSize: 10,
  color: '#b8a8ff',
  },
  taskCheckbox: {
    fontSize: 18,
    marginLeft: 10,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 5,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  
  // Enhanced Focus Timer
  timerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  timerCircle: {
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    position: 'relative',
  },
  timerActive: {
  backgroundColor: '#f8f9fa',
    borderWidth: 3,
  borderColor: '#bb86fc',
  },
  timerText: {
    fontSize: 42,
    fontWeight: 'bold',
  color: '#4a148c',
    marginBottom: 5,
  },
  timerSession: {
    fontSize: 14,
  color: '#e3d7ff',
    fontWeight: '600',
  },
  progressRing: {
    position: 'absolute',
    bottom: -3,
    left: -3,
    right: -3,
    height: 6,
  backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
  backgroundColor: '#bb86fc',
  },
  productivityContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  productivityLabel: {
    fontSize: 14,
  color: '#f5e9ff',
    marginBottom: 5,
  },
  productivityBar: {
    width: 200,
    height: 8,
  backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  productivityFill: {
    height: '100%',
    borderRadius: 4,
  },
  timerControls: {
    alignItems: 'center',
    marginBottom: 20,
  },
  activeControls: {
    flexDirection: 'row',
  },
  timerButton: {
  backgroundColor: '#7e60c0',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  pauseButton: {
  backgroundColor: '#a881ff',
  },
  stopButton: {
  backgroundColor: '#8e44ad',
  },
  resumeButton: {
  backgroundColor: '#6c4ab6',
    marginTop: 10,
  },
  timerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resumeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  focusStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  backgroundColor: 'rgba(255,255,255,0.12)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    width: '100%',
  },
  focusStatItem: {
    alignItems: 'center',
  },
  focusStatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  color: '#ffffff',
  },
  focusStatLabel: {
    fontSize: 10,
  color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  timerReward: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontWeight: '600',
  },
  
  // Enhanced Garden
  gardenGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  gardenPlotContainer: {
    width: '30%',
    marginBottom: 20,
    alignItems: 'center',
  },
  gardenPlot: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  plotReady: {
  backgroundColor: '#e8ddff',
    borderWidth: 2,
  borderColor: '#bb86fc',
  },
  plotThirsty: {
  backgroundColor: '#f2e5ff',
    borderWidth: 2,
  borderColor: '#9b59b6',
  },
  plotEmoji: {
    fontSize: 32,
    marginBottom: 5,
  },
  plotText: {
    fontSize: 9,
  color: '#2c2140',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  waterIndicator: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    right: 5,
    height: 4,
  backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  waterLevel: {
    height: '100%',
  backgroundColor: '#9575cd',
  },
  fertilizerIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    fontSize: 12,
  },
  plotActions: {
    flexDirection: 'row',
    marginTop: 5,
  },
  plotActionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 15,
    padding: 5,
    marginHorizontal: 2,
  },
  plotActionText: {
    fontSize: 12,
  },
  gardenInfoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  borderWidth: 1,
  borderColor: '#e8ddff',
  },
  gardenInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  color: '#2c2140',
    textAlign: 'center',
    marginBottom: 15,
  },
  plantTypes: {
    marginBottom: 15,
  },
  plantTypeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
  },
  plantTypeEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  plantTypeDetails: {
    flex: 1,
  },
  plantTypeName: {
    fontSize: 14,
    fontWeight: 'bold',
  color: '#2c2140',
  },
  plantTypeCost: {
    fontSize: 12,
  color: '#8f7fd8',
  },
  plantTypeReward: {
    fontSize: 10,
  color: '#7e60c0',
  },
  gardenTips: {
    borderTopWidth: 1,
  borderTopColor: 'rgba(255,255,255,0.4)',
    paddingTop: 15,
  },
  gardenTip: {
    fontSize: 12,
  color: '#d6c8ff',
    marginBottom: 5,
  },
  
  // Enhanced Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 20,
    width: '85%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  color: '#2c2140',
    textAlign: 'center',
    marginBottom: 20,
  },
  taskInput: {
    borderWidth: 2,
  borderColor: 'rgba(255,255,255,0.4)',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  color: '#2c2140',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  priorityLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  color: '#2c2140',
    marginBottom: 10,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  priorityButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 2,
  backgroundColor: '#f3edff',
  },
  priorityEmoji: {
    fontSize: 16,
    marginBottom: 3,
  },
  priorityText: {
    fontSize: 10,
  color: '#2c2140',
    fontWeight: '600',
  },
  priorityTextActive: {
    color: '#ffffff',
  },
  rewardPreview: {
  backgroundColor: '#f3edff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  rewardPreviewTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  color: '#2c2140',
    marginBottom: 5,
  },
  rewardPreviewText: {
    fontSize: 14,
  color: '#bb86fc',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  cancelButton: {
  backgroundColor: '#8f7fd8',
  },
  addTaskButton: {
  backgroundColor: '#9b59b6',
  },
  cancelButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addTaskButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
  // Reward Modal
  rewardModalContent: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  rewardModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  color: '#2c2140',
    marginBottom: 20,
  },
  rewardDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  rewardDisplayText: {
    fontSize: 18,
  color: '#bb86fc',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rewardSource: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  rewardCloseButton: {
  backgroundColor: '#9b59b6',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  rewardCloseText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Level Up Modal
  levelUpModalContent: {
    backgroundColor: '#ffffff',
    padding: 40,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
  },
  levelUpTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  color: '#bb86fc',
    marginBottom: 15,
    textAlign: 'center',
  },
  levelUpLevel: {
    fontSize: 48,
    fontWeight: 'bold',
  color: '#e0c3fc',
    marginBottom: 15,
  },
  levelUpMessage: {
    fontSize: 16,
  color: '#2c2140',
    textAlign: 'center',
    marginBottom: 25,
  },
  levelUpButton: {
  backgroundColor: '#7e60c0',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  levelUpButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


