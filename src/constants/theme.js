// Study Bunny inspired theme
export const colors = {
  // Primary colors - warm and cozy
  primary: '#8B7355', // Warm brown
  primaryLight: '#A68B5B',
  primaryDark: '#6B5B47',
  
  // Background colors - warm beige/cream
  background: '#F5E6D3', // Warm cream background
  surface: '#FFFFFF',
  surfaceSecondary: '#F0E6D6',
  
  // Accent colors
  accent: '#E67E22', // Orange
  accentLight: '#F39C12',
  success: '#7FB069', // Soft green
  warning: '#F39C12',
  danger: '#E74C3C',
  
  // Text colors
  textPrimary: '#2C3E50',
  textSecondary: '#5D4E37',
  textMuted: '#8B7355',
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