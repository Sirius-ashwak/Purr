import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect, Text as SvgText, G } from 'react-native-svg';
import { useGame } from '../context/GameContext';

const CatMascot = () => {
  const { getActiveCat, state } = useGame();
  const activeCat = getActiveCat();
  
  // Animation values
  const bobAnimation = useRef(new Animated.Value(0)).current;
  const blinkAnimation = useRef(new Animated.Value(1)).current;
  const tailAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bobbing animation
    const bobLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(bobAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Blinking animation
    const blinkLoop = Animated.loop(
      Animated.sequence([
        Animated.delay(3000),
        Animated.timing(blinkAnimation, {
          toValue: 0.1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnimation, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ])
    );

    // Tail swaying animation
    const tailLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(tailAnimation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(tailAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );

    bobLoop.start();
    blinkLoop.start();
    tailLoop.start();

    return () => {
      bobLoop.stop();
      blinkLoop.stop();
      tailLoop.stop();
    };
  }, []);

  const getCatColor = (breed) => {
    const colors = {
      'Tabby': '#F39C12',
      'Persian': '#F8F9FA',
      'Siamese': '#FAEBD7',
      'Bengal': '#D4A574',
      'Russian Blue': '#708090',
      'Maine Coon': '#8B4513',
    };
    return colors[breed] || '#F39C12';
  };

  const getPersonalityAnimation = (personality) => {
    switch (personality) {
      case 'energetic':
        return { speed: 1.5, amplitude: 8 };
      case 'lazy':
        return { speed: 0.5, amplitude: 3 };
      case 'curious':
      default:
        return { speed: 1, amplitude: 5 };
    }
  };

  const { speed, amplitude } = getPersonalityAnimation(activeCat?.personality || 'curious');

  const bobTransform = bobAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, amplitude],
  });

  const tailRotation = tailAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          transform: [{ translateY: bobTransform }]
        }
      ]}
    >
      <Svg width={220} height={240} viewBox="0 0 220 240">
        {/* Garden elements behind cat */}
        <G opacity="0.3">
          {/* Flowers around cat */}
          <Circle cx="40" cy="200" r="8" fill="#FFB6C1" />
          <Circle cx="180" cy="210" r="6" fill="#98FB98" />
          <Circle cx="30" cy="180" r="5" fill="#DDA0DD" />
          <Circle cx="190" cy="190" r="7" fill="#F0E68C" />
        </G>

        {/* Cat Body */}
        <Ellipse cx="110" cy="150" rx="50" ry="55" fill={getCatColor(activeCat?.breed)} />
        
        {/* Cat Head */}
        <Circle cx="110" cy="90" r="45" fill={getCatColor(activeCat?.breed)} />
        
        {/* Cat Ears */}
        <Path d="M75 60 L90 35 L100 60 Z" fill="#E67E22" />
        <Path d="M120 60 L130 35 L145 60 Z" fill="#E67E22" />
        <Path d="M80 57 L90 42 L95 57 Z" fill="#FFB6C1" />
        <Path d="M125 57 L130 42 L140 57 Z" fill="#FFB6C1" />
        
        {/* Cat Face Features */}
        {/* Eyes with blinking */}
        <Animated.View style={{ opacity: blinkAnimation }}>
          <Ellipse cx="95" cy="85" rx="8" ry="10" fill="#2C3E50" />
          <Ellipse cx="125" cy="85" rx="8" ry="10" fill="#2C3E50" />
          <Circle cx="97" cy="82" r="3" fill="#FFFFFF" />
          <Circle cx="127" cy="82" r="3" fill="#FFFFFF" />
        </Animated.View>
        
        {/* Nose */}
        <Path d="M110 95 L105 100 L115 100 Z" fill="#FFB6C1" />
        
        {/* Mouth */}
        <Path d="M110 102 Q105 106 100 102" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
        <Path d="M110 102 Q115 106 120 102" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
        
        {/* Whiskers */}
        <Path d="M70 88 L85 90" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
        <Path d="M70 95 L85 95" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
        <Path d="M135 90 L150 88" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
        <Path d="M135 95 L150 95" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Cat Arms holding magical calendar */}
        <Ellipse cx="75" cy="120" rx="15" ry="25" fill={getCatColor(activeCat?.breed)} />
        <Ellipse cx="145" cy="120" rx="15" ry="25" fill={getCatColor(activeCat?.breed)} />
        
        {/* Paws */}
        <Circle cx="72" cy="140" r="10" fill="#E67E22" />
        <Circle cx="148" cy="140" r="10" fill="#E67E22" />
        
        {/* Magical calendar with sparkles */}
        <G>
          <Rect x="90" y="125" width="40" height="45" rx="4" fill="#FFFFFF" stroke="#E67E22" strokeWidth="3" />
          <Rect x="90" y="125" width="40" height="12" fill="#E67E22" />
          
          {/* Calendar rings */}
          <Circle cx="97" cy="120" r="2" fill="#95A5A6" />
          <Circle cx="110" cy="120" r="2" fill="#95A5A6" />
          <Circle cx="123" cy="120" r="2" fill="#95A5A6" />
          
          {/* Current date (dynamic) */}
          <SvgText x="110" y="145" textAnchor="middle" fontSize="12" fill="#2C3E50" fontWeight="bold">
            {new Date().getDate()}
          </SvgText>
          
          {/* Calendar grid */}
          <Circle cx="95" cy="155" r="1.5" fill="#E67E22" />
          <Circle cx="102" cy="155" r="1.5" fill="#E67E22" />
          <Circle cx="110" cy="155" r="1.5" fill="#E67E22" />
          <Circle cx="118" cy="155" r="1.5" fill="#E67E22" />
          <Circle cx="125" cy="155" r="1.5" fill="#E67E22" />
          
          <Circle cx="95" cy="163" r="1.5" fill="#E67E22" />
          <Circle cx="102" cy="163" r="1.5" fill="#E67E22" />
          <Circle cx="118" cy="163" r="1.5" fill="#E67E22" />
          <Circle cx="125" cy="163" r="1.5" fill="#E67E22" />
          
          {/* Magical sparkles around calendar */}
          <Circle cx="75" cy="130" r="2" fill="#F1C40F" opacity="0.8" />
          <Circle cx="140" cy="135" r="1.5" fill="#F1C40F" opacity="0.6" />
          <Circle cx="85" cy="160" r="1" fill="#F1C40F" opacity="0.9" />
          <Circle cx="135" cy="155" r="2" fill="#F1C40F" opacity="0.7" />
        </G>
        
        {/* Animated Tail */}
        <Animated.View style={{ 
          transform: [{ rotate: tailRotation.interpolate({
            inputRange: [0, 20],
            outputRange: ['0deg', '20deg'],
          }) }]
        }}>
          <Path d="M155 170 Q175 150 185 130 Q180 125 170 135 Q160 155 150 165" fill={getCatColor(activeCat?.breed)} />
        </Animated.View>
        
        {/* Cat Legs */}
        <Ellipse cx="90" cy="200" rx="10" ry="18" fill={getCatColor(activeCat?.breed)} />
        <Ellipse cx="130" cy="200" rx="10" ry="18" fill={getCatColor(activeCat?.breed)} />
        
        {/* Cat Paws (feet) */}
        <Ellipse cx="90" cy="218" rx="12" ry="8" fill="#E67E22" />
        <Ellipse cx="130" cy="218" rx="12" ry="8" fill="#E67E22" />
        
        {/* Chest/Belly marking */}
        <Ellipse cx="110" cy="160" rx="25" ry="30" fill="#FFE5D9" opacity="0.8" />
        
        {/* Cat ability indicator */}
        {activeCat?.ability === 'focus_bonus' && (
          <G>
            <Circle cx="160" cy="70" r="15" fill="#3498DB" opacity="0.2" />
            <SvgText x="160" y="75" textAnchor="middle" fontSize="14">⏱️</SvgText>
          </G>
        )}
        {activeCat?.ability === 'seed_bonus' && (
          <G>
            <Circle cx="160" cy="70" r="15" fill="#27AE60" opacity="0.2" />
            <SvgText x="160" y="75" textAnchor="middle" fontSize="14">🌱</SvgText>
          </G>
        )}
      </Svg>
      
      {/* Cat name and mood indicator */}
      <View style={styles.catInfo}>
        <SvgText style={styles.catName}>{activeCat?.name || 'Whiskers'}</SvgText>
        <View style={styles.moodIndicator}>
          <SvgText style={styles.moodText}>
            {state.productivity.streakCount > 3 ? '😺' : state.productivity.streakCount > 0 ? '😸' : '😴'}
          </SvgText>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  catInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  catName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 5,
  },
  moodIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  moodText: {
    fontSize: 18,
  },
});

export default CatMascot;
