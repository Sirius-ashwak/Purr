// Study Bunny inspired theme
export const colors = {
  // Primary colors - warm and cozy
  primary: '#B794F6', // Light purple
  primaryLight: '#E9D8FD', // Very light purple
  primaryDark: '#9F7AEA',
  
  // Background colors - warm beige/cream
  background: '#F7FAFC', // Very light background
  surface: '#FFFFFF',
  surfaceSecondary: '#EDF2F7',
  
  // Accent colors
  accent: '#9F7AEA', // Purple accent
  accentLight: '#B794F6',
  success: '#68D391', // Soft green
  warning: '#F6E05E',
  danger: '#FC8181',
  
  // Text colors
  textPrimary: '#2D3748',
  textSecondary: '#4A5568',
  textMuted: '#718096',
  textOnPrimary: '#FFFFFF',
  
  // UI element colors
  progressGreen: '#68D391',
  progressBackground: '#E8E8E8',
  currencyBackground: '#EDF2F7',
  buttonBackground: '#FFFFFF',
  
  // Room colors
  roomWall: '#D4C4A8',
  roomFloor: '#C8B99C',
  roomAccent: '#A68B5B',
  
  // Special colors
  white: '#FFFFFF',
  black: '#1A202C',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Gradient colors
  gradientStart: '#E9D8FD',
  gradientEnd: '#B794F6',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 50,
};

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  hero: 32,
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};