// Purple gradient theme inspired by Study Bunny
export const colors = {
  // Primary purple gradient
  gradientStart: '#8B5CF6', // Purple-500
  gradientMiddle: '#A855F7', // Purple-400
  gradientEnd: '#C084FC', // Purple-300
  
  // Brand colors
  primary: '#8B5CF6',
  primaryDark: '#7C3AED',
  primaryLight: '#A855F7',
  accent: '#F59E0B', // Warm yellow accent
  
  // Surfaces
  background: '#F8FAFC', // Very light gray
  surface: '#FFFFFF',
  surfaceSecondary: '#F1F5F9',
  cardBackground: 'rgba(255, 255, 255, 0.95)',
  
  // Text
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textOnPrimary: '#FFFFFF',
  textMuted: '#94A3B8',
  
  // Semantic colors
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  
  // Special
  white: '#FFFFFF',
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