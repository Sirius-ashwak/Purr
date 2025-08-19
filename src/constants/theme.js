// Modern, fresh theme with vibrant colors
export const colors = {
  // Primary colors - Fresh and modern
  primary: '#6366F1', // Indigo
  primaryLight: '#A5B4FC',
  primaryDark: '#4F46E5',
  
  // Background colors - Clean and bright
  background: '#FAFAFA', // Very light gray
  surface: '#FFFFFF',
  surfaceSecondary: '#F8FAFC',
  
  // Accent colors - Vibrant and energetic
  accent: '#EC4899', // Pink
  accentLight: '#F472B6',
  success: '#10B981', // Emerald
  warning: '#F59E0B', // Amber
  danger: '#EF4444', // Red
  
  // Text colors - High contrast
  textPrimary: '#1F2937', // Dark gray
  textSecondary: '#6B7280', // Medium gray
  textMuted: '#9CA3AF', // Light gray
  textOnPrimary: '#FFFFFF',
  
  // Special colors
  progressGreen: '#10B981',
  progressBackground: '#E5E7EB',
  
  // Gradient colors - Fresh and modern
  gradientStart: '#667EEA', // Blue
  gradientEnd: '#764BA2', // Purple
  
  // Card colors
  cardPink: '#FDF2F8',
  cardBlue: '#EFF6FF',
  cardGreen: '#ECFDF5',
  cardYellow: '#FFFBEB',
  cardPurple: '#F3E8FF',
  
  white: '#FFFFFF',
  black: '#111827',
  shadow: 'rgba(0, 0, 0, 0.1)',
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