import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect, G, Polygon } from 'react-native-svg';
import { colors } from '../constants/theme';

const StudyBunnyMascot = () => {
  // Animation values
  const bobAnimation = useRef(new Animated.Value(0)).current;
  const blinkAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Gentle bobbing animation
    const bobLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnimation, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(bobAnimation, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    );

    // Blinking animation
    const blinkLoop = Animated.loop(
      Animated.sequence([
        Animated.delay(4000),
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

    bobLoop.start();
    blinkLoop.start();

    return () => {
      bobLoop.stop();
      blinkLoop.stop();
    };
  }, []);

  const bobTransform = bobAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 3],
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
      <Svg width={120} height={140} viewBox="0 0 120 140">
        {/* Bunny Body */}
        <Ellipse cx="60" cy="100" rx="35" ry="40" fill="#A8A8A8" stroke="#2C3E50" strokeWidth="2" />
        
        {/* Bunny Head */}
        <Ellipse cx="60" cy="55" rx="30" ry="35" fill="#A8A8A8" stroke="#2C3E50" strokeWidth="2" />
        
        {/* Bunny Ears */}
        <Ellipse cx="45" cy="25" rx="8" ry="20" fill="#A8A8A8" stroke="#2C3E50" strokeWidth="2" />
        <Ellipse cx="75" cy="25" rx="8" ry="20" fill="#A8A8A8" stroke="#2C3E50" strokeWidth="2" />
        
        {/* Inner ears */}
        <Ellipse cx="45" cy="28" rx="4" ry="12" fill="#FFB6C1" />
        <Ellipse cx="75" cy="28" rx="4" ry="12" fill="#FFB6C1" />
        
        {/* Eyes with blinking */}
        <Animated.View style={{ opacity: blinkAnimation }}>
          <Circle cx="50" cy="50" r="3" fill="#2C3E50" />
          <Circle cx="70" cy="50" r="3" fill="#2C3E50" />
        </Animated.View>
        
        {/* Cute mouth */}
        <Path d="M60 62 Q55 65 50 62" stroke="#2C3E50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <Path d="M60 62 Q65 65 70 62" stroke="#2C3E50" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        
        {/* Nose */}
        <Polygon points="60,58 57,62 63,62" fill="#FFB6C1" />
        
        {/* Arms */}
        <Ellipse cx="35" cy="85" rx="8" ry="15" fill="#A8A8A8" stroke="#2C3E50" strokeWidth="2" />
        <Ellipse cx="85" cy="85" rx="8" ry="15" fill="#A8A8A8" stroke="#2C3E50" strokeWidth="2" />
        
        {/* Paws */}
        <Circle cx="35" cy="98" r="6" fill="#A8A8A8" stroke="#2C3E50" strokeWidth="2" />
        <Circle cx="85" cy="98" r="6" fill="#A8A8A8" stroke="#2C3E50" strokeWidth="2" />
        
        {/* Belly */}
        <Ellipse cx="60" cy="105" rx="20" ry="25" fill="#D3D3D3" opacity="0.6" />
        
        {/* Feet */}
        <Ellipse cx="50" cy="135" rx="8" ry="5" fill="#A8A8A8" stroke="#2C3E50" strokeWidth="2" />
        <Ellipse cx="70" cy="135" rx="8" ry="5" fill="#A8A8A8" stroke="#2C3E50" strokeWidth="2" />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StudyBunnyMascot;