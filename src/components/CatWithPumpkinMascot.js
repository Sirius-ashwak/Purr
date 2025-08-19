import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

const CatWithPumpkinMascot = () => {
  const animationRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start the Lottie animation
    if (animationRef.current) {
      animationRef.current.play();
    }

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

    breathingAnimation.start();

    return () => {
      breathingAnimation.stop();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.animationContainer,
          {
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <LottieView
          ref={animationRef}
          source={require('../../assets/cat-with-pumpkin.json')}
          style={styles.animation}
          autoPlay
          loop
          speed={0.8}
        />
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
  animation: {
    width: '100%',
    height: '100%',
  },
});

export default CatWithPumpkinMascot;