import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';

const PawClockLogo = ({ size = 32 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 32 32">
        {/* Paw Print Background */}
        <Path
          d="M16 28C22.627 28 28 22.627 28 16C28 9.373 22.627 4 16 4C9.373 4 4 9.373 4 16C4 22.627 9.373 28 16 28Z"
          fill="#E67E22"
        />
        
        {/* Paw Pads */}
        <Circle cx="12" cy="14" r="2.5" fill="#FFFFFF" opacity="0.9" />
        <Circle cx="20" cy="14" r="2.5" fill="#FFFFFF" opacity="0.9" />
        <Circle cx="10" cy="20" r="2" fill="#FFFFFF" opacity="0.9" />
        <Circle cx="22" cy="20" r="2" fill="#FFFFFF" opacity="0.9" />
        
        {/* Main Paw Pad with Clock */}
        <Circle cx="16" cy="18" r="4" fill="#FFFFFF" />
        
        {/* Clock Hands */}
        <Line x1="16" y1="18" x2="16" y2="15" stroke="#E67E22" strokeWidth="1.5" strokeLinecap="round" />
        <Line x1="16" y1="18" x2="18" y2="18" stroke="#E67E22" strokeWidth="1" strokeLinecap="round" />
        
        {/* Clock Center Dot */}
        <Circle cx="16" cy="18" r="0.8" fill="#E67E22" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PawClockLogo;
