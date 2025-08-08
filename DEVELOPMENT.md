# PurrPlan World - Development Guide

## Quick Start

To run the PurrPlan World app locally:

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

Then scan the QR code with the Expo Go app on your phone, or run on simulator.

## Development Commands

```bash
# Start development server
npm start

# Run on iOS simulator  
npm run ios

# Run on Android emulator
npm run android

# Run in web browser
npm run web

# Install new package
npm install <package-name>
```

## Code Structure

### Components Architecture
- **Atomic Design**: Small, reusable components
- **SVG Graphics**: Custom illustrations using react-native-svg
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Screen reader friendly with proper labels

### Styling Guidelines
- Use the theme constants from `src/constants/theme.js`
- Consistent spacing and border radius values
- Soft shadows and rounded corners throughout
- Pastel color palette for friendly, approachable feel

### Animation Guidelines
- Subtle, delightful micro-interactions
- Use React Native Animated API for performance
- Scale animations for touch feedback
- Smooth transitions between states

## Adding New Features

### Creating New Screens
1. Create component in `src/screens/`
2. Import and use existing components
3. Follow the established design patterns
4. Add navigation if needed

### Creating New Components
1. Add to `src/components/`
2. Use consistent prop patterns
3. Include proper TypeScript types (if adding TS)
4. Add accessibility props

### Design Tokens
All colors, spacing, and typography should use the theme constants:

```javascript
import { colors, spacing, borderRadius, fontSize } from '../constants/theme';
```

## Testing

### Manual Testing Checklist
- [ ] App loads without errors
- [ ] Cat mascot displays correctly
- [ ] All cards are interactive
- [ ] Smooth animations work
- [ ] Text is readable on all backgrounds
- [ ] App works on different screen sizes

## Performance Tips

- Use `react-native-svg` for scalable vector graphics
- Implement proper image optimization
- Use FlatList for long lists (when adding more features)
- Profile animations to ensure 60fps performance

## Next Features to Implement

1. **Task Creation**: Add new task functionality
2. **Calendar View**: Detailed schedule interface  
3. **Notifications**: Reminder system
4. **Themes**: Multiple color schemes
5. **Animations**: More delightful micro-interactions
6. **Data Persistence**: Local storage for tasks
7. **User Profiles**: Customization options
