import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Svg, { Circle, Ellipse, Path, Rect, G, Polygon } from 'react-native-svg';

const CatWithPumpkinMascot = () => {
  // Animation values
  const bobAnimation = useRef(new Animated.Value(0)).current;
  const blinkAnimation = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

    // Gentle breathing animation
    const breathingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    bobLoop.start();
    blinkLoop.start();
    breathingAnimation.start();

    return () => {
      bobLoop.stop();
      blinkLoop.stop();
      breathingAnimation.stop();
    };
  }, []);

  const bobTransform = bobAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 5],
  });

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.animationContainer,
          {
            transform: [{ scale: scaleAnim }, { translateY: bobTransform }]
          }
        ]}
      >
        <Svg width={200} height={200} viewBox="0 0 200 200">
          {/* Pumpkin */}
          <G transform="translate(100, 140)">
            <Ellipse cx="0" cy="0" rx="35" ry="30" fill="#FF6B35" />
            <Path d="M-30 -10 Q-20 -20 -10 -10 Q0 -20 10 -10 Q20 -20 30 -10" stroke="#E55A2B" strokeWidth="2" fill="none" />
            <Path d="M-20 0 Q-10 -10 0 0 Q10 -10 20 0" stroke="#E55A2B" strokeWidth="2" fill="none" />
            <Path d="M-15 10 Q0 0 15 10" stroke="#E55A2B" strokeWidth="2" fill="none" />
            <Rect x="-3" y="-35" width="6" height="8" fill="#4A5D23" />
          </G>

          {/* Cat Body */}
          <Ellipse cx="100" cy="110" rx="40" ry="35" fill="#F5F5F5" />
          
          {/* Cat Head */}
          <Circle cx="100" cy="70" r="35" fill="#F5F5F5" />
          
          {/* Cat Ears */}
          <Path d="M75 45 L85 25 L95 45 Z" fill="#F5F5F5" />
          <Path d="M105 45 L115 25 L125 45 Z" fill="#F5F5F5" />
          <Path d="M80 42 L85 32 L90 42 Z" fill="#FFB6C1" />
          <Path d="M110 42 L115 32 L120 42 Z" fill="#FFB6C1" />
          
          {/* Eyes with blinking - BLUE EYES */}
          <Animated.View style={{ opacity: blinkAnimation }}>
            <Ellipse cx="88" cy="65" rx="6" ry="8" fill="#4A90E2" />
            <Ellipse cx="112" cy="65" rx="6" ry="8" fill="#4A90E2" />
            <Circle cx="90" cy="63" r="2" fill="#FFFFFF" />
            <Circle cx="114" cy="63" r="2" fill="#FFFFFF" />
          </Animated.View>
          
          {/* Nose */}
          <Path d="M100 75 L95 80 L105 80 Z" fill="#FFB6C1" />
          
          {/* Mouth */}
          <Path d="M100 82 Q95 86 90 82" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
          <Path d="M100 82 Q105 86 110 82" stroke="#2C3E50" strokeWidth="2" fill="none" strokeLinecap="round" />
          
          {/* Whiskers */}
          <Path d="M65 68 L80 70" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
          <Path d="M65 75 L80 75" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
          <Path d="M120 70 L135 68" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
          <Path d="M120 75 L135 75" stroke="#2C3E50" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Cat Arms */}
          <Ellipse cx="70" cy="95" rx="12" ry="20" fill="#F5F5F5" />
          <Ellipse cx="130" cy="95" rx="12" ry="20" fill="#F5F5F5" />
          
          {/* Paws */}
          <Circle cx="68" cy="112" r="8" fill="#F5F5F5" />
          <Circle cx="132" cy="112" r="8" fill="#F5F5F5" />
          
          {/* Tail */}
          <Path d="M140 120 Q160 100 170 80 Q165 75 155 85 Q145 105 135 115" fill="#F5F5F5" />
          
          {/* Cat Legs */}
          <Ellipse cx="85" cy="140" rx="8" ry="15" fill="#F5F5F5" />
          <Ellipse cx="115" cy="140" rx="8" ry="15" fill="#F5F5F5" />
          
          {/* Cat Paws (feet) */}
          <Ellipse cx="85" cy="155" rx="10" ry="6" fill="#F5F5F5" />
          <Ellipse cx="115" cy="155" rx="10" ry="6" fill="#F5F5F5" />
          
          {/* Chest marking */}
          <Ellipse cx="100" cy="115" rx="20" ry="25" fill="#FFFFFF" opacity="0.8" />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CatWithPumpkinMascot;