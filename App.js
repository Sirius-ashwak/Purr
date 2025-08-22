import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

const Stack = createStackNavigator();
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
          colors={['#f3f0ff', '#e9e5ff', '#ddd6fe']}
          style={styles.menuButtonGradient}
        >
          <Ionicons 
            name={isVisible ? 'close' : 'menu'} 
            size={24} 
            color="#000000" 
          />
        </LinearGradient>
      </TouchableOpacity>

      {/* Collapsible Navigation Icons */}
      {isVisible && (
        <View style={styles.navigationIcons}>
          <LinearGradient
            colors={['rgba(243, 240, 255, 0.95)', 'rgba(233, 229, 255, 0.95)', 'rgba(221, 214, 254, 0.95)']}
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
                  color="#000000" 
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
      <NavigationContainer>
        <MainNavigator />
        <StatusBar style="dark" />
      </NavigationContainer>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topNavigationContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  menuButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    right: 20, // Changed from left to right
    zIndex: 1001,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuButtonGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
    }),
  },
  navigationIcons: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    right: 80, // Position to the left of the button
    zIndex: 1000,
  },
  iconsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  navIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transitionDuration: '200ms',
    }),
  },
  navIconActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    transform: [{ scale: 1.1 }],
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'ios' ? 120 : 90, // Add space for the top navigation
  },
});