// Soft Purple Gradient Theme - Elegant and Subtle
export const colors = {
  // Primary colors - Soft Purple Theme
  primary: '#B794F6', // Soft purple
  primaryLight: '#D6BCFA',
  primaryDark: '#9F7AEA',
  
  // Background colors - Clean and soft
  background: '#FDFCFE', // Very light purple tint
  surface: '#FFFFFF',
  surfaceSecondary: '#FAF9FC',
  
  // Accent colors - Harmonious purples
  accent: '#E879F9', // Light magenta
  accentLight: '#F0ABFC',
  success: '#A78BFA', // Purple success
  warning: '#C084FC', // Purple warning
  danger: '#E879F9', // Purple danger
  
  // Text colors - Elegant contrast
  textPrimary: '#4C1D95', // Deep purple
  textSecondary: '#7C3AED', // Medium purple
  textMuted: '#A78BFA', // Light purple
  textOnPrimary: '#FFFFFF',
  
  // Special colors - Purple theme
  progressGreen: '#A78BFA', // Purple progress
  progressBackground: '#F3F4F6',
  
  // Gradient colors - Subtle Purple Gradients
  gradientStart: '#E0E7FF', // Very light purple
  gradientMid: '#C4B5FD',   // Light purple
  gradientEnd: '#A78BFA',   // Medium purple
  
  // Card colors - Soft purple variations
  cardPink: '#FAF5FF',
  cardBlue: '#F0F4FF',
  cardGreen: '#F5F3FF',
  cardYellow: '#FEFCE8',
  cardPurple: '#F9FAFB',
  
  white: '#FFFFFF',
  black: '#2D1B69',
  shadow: 'rgba(139, 92, 246, 0.1)',
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