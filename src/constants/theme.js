// Study Bunny inspired theme
export const colors = {
  // Primary colors - warm and cozy
  primary: '#8B5CF6', // Purple
  primaryLight: '#A78BFA',
  primaryDark: '#7C3AED',
  
  // Background colors - warm beige/cream
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Purple gradient
  backgroundSolid: '#8B5CF6', // Fallback solid purple
  surface: '#FFFFFF',
  surfaceSecondary: '#F3F4F6',
  
  // Accent colors
  accent: '#10B981', // Green accent
  accentLight: '#34D399',
  success: '#7FB069', // Soft green
  warning: '#F39C12',
  danger: '#E74C3C',
  
  // Text colors
  textPrimary: '#2C3E50',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textOnPrimary: '#FFFFFF',
  
  // UI element colors
  progressGreen: '#7FB069',
  progressBackground: '#E8E8E8',
  currencyBackground: '#E8E8E8',
  buttonBackground: '#FFFFFF',
  
  // Room colors
  roomWall: '#E5E7EB',
  roomFloor: '#F3F4F6',
  roomAccent: '#8B5CF6',
  
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