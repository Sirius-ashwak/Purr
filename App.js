import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform, Animated } from 'react-native';
import { GameProvider } from './src/context/GameContext';
import HomeScreen from './src/screens/HomeScreen';
import TimerScreen from './src/screens/TimerScreen';
import TodoScreen from './src/screens/TodoScreen';
import StatsScreen from './src/screens/StatsScreen';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './src/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

function TopNavigation({ currentScreen, onNavigate, isVisible, toggleMenu }) {
  const menuItems = [
    { name: 'Home', icon: 'home', screen: 'Home' },
    { name: 'Timer', icon: 'timer', screen: 'Timer' },
    { name: 'Todo', icon: 'list', screen: 'Todo' },
    { name: 'Stats', icon: 'bar-chart', screen: 'Stats' },
  ];

  return (
    <View style={styles.topNavigationContainer}>
      {/* Menu Toggle Button */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={toggleMenu}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
          style={styles.menuButtonGradient}
        >
          <Ionicons 
            name={isVisible ? 'close' : 'menu'} 
            size={24} 
            color={colors.black} 
          />
        </LinearGradient>
      </TouchableOpacity>

      {/* Collapsible Navigation Icons */}
      {isVisible && (
        <View style={styles.navigationIcons}>
          <LinearGradient
            colors={[`${colors.gradientStart}F0`, `${colors.gradientMid}F0`, `${colors.gradientEnd}F0`]}
            style={styles.iconsContainer}
          >
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.screen}
                style={[
                  styles.navIcon,
                  currentScreen === item.screen && styles.navIconActive
                ]}
                onPress={() => {
                  onNavigate(item.screen);
                  toggleMenu(); // Auto-close menu after selection
                }}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={currentScreen === item.screen ? item.icon : `${item.icon}-outline`} 
                  size={20} 
                  color={colors.black} 
                />
              </TouchableOpacity>
            ))}
          </LinearGradient>
        </View>
      )}
    </View>
  );
}

function MainNavigator() {
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const renderScreen = () => {
    switch(currentScreen) {
      case 'Timer': return <TimerScreen />;
      case 'Todo': return <TodoScreen />;
      case 'Stats': return <StatsScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <TopNavigation 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen}
        isVisible={isMenuVisible}
        toggleMenu={toggleMenu}
      />
      <View style={styles.content}>
        {renderScreen()}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <GameProvider>
      <View style={{ flex: 1, backgroundColor: '#F7F3E9' }}>
        <StatusBar style="dark" backgroundColor="#F7F3E9" translucent={false} />
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </View>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F3E9', // Warm cream background
  },
  topNavigationContainer: {
    position: 'relative',
    backgroundColor: '#F7F3E9', // Match the warm cream background
    zIndex: 1000,
  },
  menuButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    right: 20,
    zIndex: 1001,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  menuButtonGradient: {
    width: 55,
    height: 55,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
    }),
  },
  navigationIcons: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    right: 85,
    zIndex: 1000,
  },
  iconsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: colors.primary,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  navIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: `${colors.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: `${colors.primary}40`,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transitionDuration: '200ms',
    }),
  },
  navIconActive: {
    backgroundColor: colors.accent,
    borderColor: colors.primary,
    transform: [{ scale: 1.15 }],
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#F7F3E9', // Warm cream background to match
    paddingTop: Platform.OS === 'ios' ? 120 : 90, // Add space for the top navigation
  },
});