// Study Bunny inspired theme
export const colors = {
  // Primary colors - warm and cozy
  primary: '#667eea', // Purple gradient start
  primaryLight: '#764ba2', // Purple gradient end
  primaryDark: '#5a67d8',
  
  // Background colors - warm beige/cream
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple gradient
  surface: 'rgba(255, 255, 255, 0.1)',
  surfaceSecondary: 'rgba(255, 255, 255, 0.05)',
  
  // Accent colors
  accent: '#ff6b6b', // Bright accent
  accentLight: '#ff8e8e',
  success: '#51cf66', // Soft green
  warning: '#ffd43b',
  danger: '#ff6b6b',
  
  // Text colors
  textPrimary: '#FFFFFF',
  textSecondary: 'rgba(255, 255, 255, 0.8)',
  textMuted: 'rgba(255, 255, 255, 0.6)',
  textOnPrimary: '#FFFFFF',
  
  // UI element colors
  progressGreen: '#7FB069',
  progressBackground: '#E8E8E8',
  currencyBackground: '#E8E8E8',
  buttonBackground: '#FFFFFF',
  
  // Room colors
  roomWall: '#D4C4A8',
  roomFloor: '#C8B99C',
  roomAccent: '#A68B5B',
  
  // Special colors
  white: '#FFFFFF',
  black: '#2C3E50',
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
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