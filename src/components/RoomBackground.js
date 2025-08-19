import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Rect, Path, Circle, Ellipse, G, Polygon } from 'react-native-svg';
import { colors } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const RoomBackground = () => {
  return (
    <View style={styles.container}>
      <Svg width={width} height={height * 0.6} viewBox={`0 0 ${width} ${height * 0.6}`}>
        {/* Room walls */}
        <Rect x="0" y="0" width={width} height={height * 0.4} fill={colors.roomWall} />
        <Rect x="0" y={height * 0.4} width={width} height={height * 0.2} fill={colors.roomFloor} />
        
        {/* Door on the left */}
        <G transform="translate(20, 80)">
          <Rect x="0" y="0" width="60" height="120" fill="#8BB6D6" stroke="#2C3E50" strokeWidth="2" rx="5" />
          <Rect x="5" y="10" width="25" height="50" fill="#A8C8E8" stroke="#2C3E50" strokeWidth="1" />
          <Rect x="30" y="10" width="25" height="50" fill="#A8C8E8" stroke="#2C3E50" strokeWidth="1" />
          <Rect x="5" y="70" width="25" height="40" fill="#A8C8E8" stroke="#2C3E50" strokeWidth="1" />
          <Rect x="30" y="70" width="25" height="40" fill="#A8C8E8" stroke="#2C3E50" strokeWidth="1" />
          <Circle cx="45" cy="60" r="2" fill="#2C3E50" />
        </G>
        
        {/* Window with curtains */}
        <G transform={`translate(${width * 0.3}, 60)`}>
          <Rect x="0" y="0" width="120" height="80" fill="#E8F4F8" stroke="#2C3E50" strokeWidth="2" />
          <Path d="M0 0 L120 0 L120 80 L0 80 Z M60 0 L60 80" stroke="#2C3E50" strokeWidth="2" fill="none" />
          
          {/* Curtains */}
          <Path d="M-10 -5 Q30 15 60 -5 Q90 15 130 -5 L130 25 Q90 5 60 25 Q30 5 -10 25 Z" fill={colors.success} opacity="0.8" />
          <Path d="M-10 -5 Q30 15 60 -5" stroke="#2C3E50" strokeWidth="1" fill="none" />
          <Path d="M60 -5 Q90 15 130 -5" stroke="#2C3E50" strokeWidth="1" fill="none" />
        </G>
        
        {/* Desk/shelf */}
        <G transform={`translate(${width * 0.25}, 140)`}>
          <Rect x="0" y="0" width="140" height="15" fill="#D4A574" stroke="#2C3E50" strokeWidth="2" />
          <Rect x="0" y="15" width="140" height="40" fill="#C8965F" stroke="#2C3E50" strokeWidth="2" />
          
          {/* Books on shelf */}
          <Rect x="10" y="-15" width="8" height="15" fill="#E74C3C" />
          <Rect x="20" y="-18" width="8" height="18" fill="#3498DB" />
          <Rect x="30" y="-12" width="8" height="12" fill="#27AE60" />
          <Rect x="40" y="-16" width="8" height="16" fill="#F39C12" />
          
          {/* Bunny figurines */}
          <Circle cx="60" cy="-8" r="4" fill="#A8A8A8" />
          <Circle cx="70" cy="-8" r="4" fill="#D3D3D3" />
          
          {/* Lamp */}
          <Circle cx="120" cy="-10" r="8" fill="#F1C40F" opacity="0.7" />
          <Rect x="118" y="-2" width="4" height="10" fill="#8B7355" />
        </G>
        
        {/* Motivational poster */}
        <G transform={`translate(${width * 0.75}, 80)`}>
          <Rect x="0" y="0" width="60" height="80" fill="#E8D5E8" stroke="#2C3E50" strokeWidth="2" />
          <Circle cx="30" cy="25" r="8" fill="#A8A8A8" />
          <Rect x="10" y="40" width="40" height="3" fill="#2C3E50" />
          <Rect x="15" y="48" width="30" height="2" fill="#2C3E50" />
          <Rect x="12" y="55" width="36" height="2" fill="#2C3E50" />
        </G>
        
        {/* Bed corner */}
        <G transform={`translate(${width * 0.7}, 160)`}>
          <Ellipse cx="40" cy="20" rx="40" ry="20" fill="#F39C12" />
          <Ellipse cx="40" cy="15" rx="35" ry="15" fill="#E67E22" />
          <Rect x="0" y="20" width="80" height="30" fill="#D4A574" />
        </G>
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
    zIndex: -1,
  },
});

export default RoomBackground;