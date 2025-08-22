// Retro Subtle Color Theme - Muted, Vintage-Inspired Palette
export const colors = {
  // Primary colors - Muted retro tones
  primary: '#8B7355', // Warm brown
  primaryLight: '#A0845C',
  primaryDark: '#6B5B47',
  
  // Background colors - Soft cream and beige
  background: '#F7F3E9', // Warm cream
  surface: '#FEFCF3', // Off-white cream
  surfaceSecondary: '#F0EBD8',
  
  // Accent colors - Muted retro palette
  accent: '#D4A574', // Dusty orange
  accentLight: '#E1B887',
  success: '#8FBC8F', // Sage green
  warning: '#DAA520', // Goldenrod
  danger: '#CD853F', // Peru/dusty red
  
  // Text colors - Soft contrast
  textPrimary: '#4A4A4A', // Soft dark gray
  textSecondary: '#6B6B6B', // Medium gray
  textMuted: '#8E8E8E', // Light gray
  textOnPrimary: '#FEFCF3', // Cream text on colored backgrounds
  
  // Special colors - Retro theme
  progressGreen: '#9ACD32', // Yellow-green
  progressBackground: '#E6DDD4', // Light beige
  
  // Gradient colors - Subtle retro gradients
  gradientStart: '#F4E4BC', // Light cream
  gradientMid: '#E8D5B7',   // Warm beige
  gradientEnd: '#D4C5A9',   // Darker beige
  
  // Card colors - Muted pastels
  cardPink: '#F5E6D3',    // Dusty rose
  cardBlue: '#E6F2F5',    // Powder blue
  cardGreen: '#E8F5E8',   // Mint green
  cardYellow: '#FFF8DC',  // Cornsilk
  cardPurple: '#F0E6FF',  // Lavender
  cardOrange: '#FFE4B5',  // Moccasin
  
  white: '#FEFCF3',
  black: '#4A4A4A',
  shadow: 'rgba(139, 115, 85, 0.15)', // Warm brown shadow
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
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
};