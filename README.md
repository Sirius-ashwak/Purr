# Purr! 🐾🎃

This is my modern, playful mobile app for task planning and scheduling, featuring an adorable cat mascot with seasonal animations and a beautiful retro-vintage themed interface. Built with React Native and Expo.

**Developed by Sirius** - My comprehensive study productivity app with cross-platform deployment.

## ✨ Features

- **Seasonal Cat Mascot**: Animated cat with pumpkin for autumn vibes using Lottie animations
- **Retro-Vintage UI**: Custom warm cream and brown color scheme for a cozy, nostalgic feel
- **Custom Navigation**: Top-right collapsible menu with intuitive icon-based navigation
- **Study Focus**: Designed specifically for students with study tracking and productivity features
- **Cross-Platform**: Optimized for iOS, Android, and Web deployment
- **Mobile-Optimized**: Responsive design that works beautifully on all screen sizes

## 🛠 Technical Implementation

### Core Architecture
- **React Native**: Cross-platform mobile development framework
- **Expo SDK 53**: Modern development platform with custom legacy compatibility configuration
- **Custom Navigation**: Built from scratch without complex gesture dependencies
- **State Management**: React Context implementation for global state management
- **Component Architecture**: Modular, reusable component design

### Key Technologies
- **Lottie React Native**: JSON-based animations for the cat mascot
- **Linear Gradient**: Background theming and visual effects
- **Vector Icons**: Ionicons for UI elements
- **AsyncStorage**: Local data persistence
- **Metro Bundler**: Optimized for web builds

### Development Challenges Solved
- **TurboModule Compatibility**: Configured legacy architecture for Expo SDK 53 stability
- **Dependency Conflicts**: Resolved React Native reanimated and gesture handler issues
- **Cross-Platform Deployment**: Ensured consistent behavior across iOS, Android, and Web
- **Bundle Optimization**: Optimized build size and performance for web deployment
- **Mobile Responsiveness**: Implemented responsive layouts for various screen sizes

## 📱 Application Screens

### Home Screen
- **Cat-Centered Design**: Pumpkin Purr mascot as the main focal point
- **Seasonal Welcome**: Dynamic autumn-themed messaging
- **Treat System**: Reward tracking with visual feedback
- **Study Progress**: Real-time statistics display

### Timer Screen
- **Focus Sessions**: Pomodoro-style study timer implementation
- **Session Tracking**: Progress monitoring and time management
- **Visual Feedback**: Interactive timer with progress indicators

### Todo Screen
- **Task Management**: Full CRUD operations for study tasks
- **Organization Tools**: Categorization and prioritization features
- **Mobile-First Design**: Touch-optimized interface

### Stats Screen
- **Analytics Dashboard**: Comprehensive study progress tracking
- **Achievement System**: Streak tracking and reward unlocking
- **Data Visualization**: Progress charts and statistics display

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app for mobile testing

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sirius-ashwak/Purr
cd Purr
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Deploy:
```bash
npm start
```

## 📁 Project Architecture

```
src/
├── components/              # Reusable UI components
│   ├── Header.js           # Navigation header component
│   ├── CatMascot.js        # Animated cat with Lottie integration
│   ├── FeatureCard.js      # Reusable card components
│   ├── GameDashboard.js    # Study tracking dashboard
│   └── PawClockLogo.js     # App branding component
├── screens/                # Main application screens
│   ├── HomeScreen.js       # Cat-centered home interface
│   ├── TimerScreen.js      # Focus timer functionality
│   ├── TodoScreen.js       # Task management system
│   └── StatsScreen.js      # Analytics and progress tracking
├── constants/
│   └── theme.js            # Color schemes and styling constants
├── context/
│   └── GameContext.js      # Global state management
└── assets/
    ├── cat-with-pumpkin.json # Lottie animation files
    └── *.png               # App icons and graphics
```

## 🔧 Technical Configuration

### Expo Configuration
- **SDK Version**: 53.0.20 with custom legacy architecture
- **TurboModule**: Disabled for stability
- **Metro Config**: Optimized for web builds
- **Environment Variables**: Production-ready settings

### Deployment Setup
- **Platform**: Render.com web service
- **Build Command**: `npm install --legacy-peer-deps && npm run build`
- **Start Command**: `npm start`
- **Node Version**: 18.17.0

### Performance Optimizations
- **Bundle Size**: Optimized to ~1.4MB for fast loading
- **Lazy Loading**: Efficient component rendering
- **Cross-Platform**: Consistent UX across all devices

## 🎯 Development Approach

### Problem-Solving Methodology
1. **Architecture Planning**: Designed modular, scalable component structure
2. **Dependency Management**: Carefully selected compatible packages
3. **Cross-Platform Testing**: Ensured functionality across iOS, Android, and Web
4. **Performance Optimization**: Minimized bundle size and load times
5. **Deployment Strategy**: Configured reliable production deployment

### Technical Decisions
- **Custom Navigation**: Built lightweight navigation without gesture dependencies
- **Legacy Configuration**: Prioritized stability over cutting-edge features
- **Responsive Design**: Mobile-first approach with desktop compatibility
- **State Management**: Chose React Context for simplicity and performance

## 🌐 Deployment

### Deploy to Render

1. **Configure build settings:**
   - **Build Command:** `npm install --legacy-peer-deps && npm run build`
   - **Start Command:** `npm start`
   - **Node Version:** `18.17.0`

2. **Environment Variables:**
   ```
   NODE_VERSION=18.17.0
   NPM_VERSION=9.6.7
   NODE_ENV=production
   EXPO_USE_LEGACY_PACKAGER=1
   ```

3. **Deploy:**
   - Connect GitHub repository to Render
   - Deploy automatically on push to main branch

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests for:
- Bug fixes and performance improvements
- New feature implementations
- Cross-platform compatibility enhancements
- Documentation improvements

---

## 💡 AI Assistance Note

* AI assistance was provided for visual design suggestions, color palette refinement, and CSS styling consistency.*

## 📄 License

This project is licensed under the MIT License.

**Developed by Sirius** • **Autumn 2025** 🎃
