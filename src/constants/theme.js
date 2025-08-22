// Ultra Light Purple Gradient Theme - Barely Noticeable Elegance
export const colors = {
  // Primary colors - Ultra Pale Purple Theme
  primary: '#5B21B6', // Deep purple
  primaryLight: '#7C3AED',
  primaryDark: '#4C1D95',
  
  // Background colors - Almost white with hint of purple
  background: '#F3F4F6', // Light gray background
  surface: '#FFFFFF', // Pure white
  surfaceSecondary: '#E5E7EB',
  
  // Accent colors - Very subtle purples
  accent: '#DC2626', // Bright red
  accentLight: '#EF4444',
  success: '#059669', // Dark green
  warning: '#D97706', // Dark orange
  danger: '#DC2626', // Bright red
  
  // Text colors - High contrast for excellent readability
  textPrimary: '#111827', // Very dark gray
  textSecondary: '#374151', // Dark gray
  textMuted: '#6B7280', // Medium gray
  textOnPrimary: '#FFFFFF', // White text on colored backgrounds
  
  // Special colors - Pale theme
  progressGreen: '#16A34A', // Darker green for better visibility
  progressBackground: '#D1D5DB', // Light gray
  
  // Gradient colors - Ultra Light Purple Gradients (barely visible)
  gradientStart: '#7C3AED', // Deep purple
  gradientMid: '#8B5CF6',   // Medium purple
  gradientEnd: '#A78BFA',   // Light purple
  
  // Card colors - Ultra soft variations
  cardPink: '#FEE2E2',    // Light red background
  cardBlue: '#DBEAFE',    // Light blue background
  cardGreen: '#D1FAE5',   // Light green background
  cardYellow: '#FEF3C7',  // Light yellow background
  cardPurple: '#E9D5FF',  // Light purple background
  
  white: '#FFFFFF',
  black: '#111827', // Very dark gray instead of pure black
  shadow: 'rgba(0, 0, 0, 0.15)', // Darker shadow for better visibility
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