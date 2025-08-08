import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, G, Defs, Pattern } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const PawPrintBackground = () => {
  const PawPrint = ({ x, y, opacity = 0.05, scale = 1 }) => (
    <G transform={`translate(${x}, ${y}) scale(${scale})`} opacity={opacity}>
      {/* Main paw pad */}
      <Circle cx="15" cy="20" r="8" fill="#E67E22" />
      
      {/* Toe pads */}
      <Circle cx="8" cy="10" r="4" fill="#E67E22" />
      <Circle cx="15" cy="8" r="4" fill="#E67E22" />
      <Circle cx="22" cy="10" r="4" fill="#E67E22" />
      <Circle cx="25" cy="16" r="3" fill="#E67E22" />
    </G>
  );

  return (
    <View style={styles.container}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        {/* Scattered paw prints across the screen */}
        <PawPrint x={50} y={100} opacity={0.03} scale={0.8} />
        <PawPrint x={width - 80} y={150} opacity={0.04} scale={0.6} />
        <PawPrint x={30} y={300} opacity={0.03} scale={0.7} />
        <PawPrint x={width - 60} y={350} opacity={0.04} scale={0.5} />
        <PawPrint x={width / 2} y={450} opacity={0.03} scale={0.6} />
        <PawPrint x={80} y={500} opacity={0.04} scale={0.8} />
        <PawPrint x={width - 100} y={550} opacity={0.03} scale={0.7} />
        <PawPrint x={40} y={650} opacity={0.04} scale={0.6} />
        <PawPrint x={width - 70} y={700} opacity={0.03} scale={0.5} />
        
        {/* Additional scattered prints for fuller coverage */}
        <PawPrint x={150} y={200} opacity={0.02} scale={0.4} />
        <PawPrint x={width - 150} y={250} opacity={0.03} scale={0.5} />
        <PawPrint x={100} y={400} opacity={0.02} scale={0.6} />
        <PawPrint x={width - 120} y={450} opacity={0.03} scale={0.4} />
        <PawPrint x={200} y={600} opacity={0.02} scale={0.7} />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});

export default PawPrintBackground;
