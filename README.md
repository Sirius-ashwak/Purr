# Purr! 🐾🎃

A modern, playful mobile app for task planning and scheduling, featuring an adorable cat mascot with seasonal animations and a beautiful purple gradient interface.

## ✨ Features

- **Seasonal Cat Mascot**: Animated cat with pumpkin for autumn vibes using Lottie animations
- **Purple Gradient UI**: Beautiful gradient theme with subtle purple tones throughout
- **Multi-Screen Navigation**: Home, Timer, Todo, and Stats screens with bottom tab navigation
- **Study Focus**: Designed for students with study tracking and productivity features
- **Smooth Animations**: Lottie JSON animations for engaging user experience
- **Cross-Platform**: Works on iOS, Android, and Web

## 🎨 Design Elements

### Color Palette
- **Background**: Purple gradients from light lavender to soft purple
- **Gradient Start**: #E0E7FF (Light indigo)
- **Gradient Mid**: #C4B5FD (Soft purple)
- **Gradient End**: #A78BFA (Medium purple)
- **Text**: White for visibility on purple backgrounds
- **Cards**: Semi-transparent overlays with purple tints

### Key Components
- **Header**: Clean navigation with purple theme
- **Cat Mascot**: Animated cat with pumpkin (cat-with-pumpkin.json)
- **Feature Cards**: Rounded cards with gradient backgrounds
- **Bottom Navigation**: Tab-based navigation with Ionicons

## 🛠 Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo SDK 53**: Latest Expo development platform
- **Lottie React Native**: JSON-based animations
- **React Navigation**: Bottom tabs and navigation
- **Linear Gradient**: Beautiful gradient backgrounds
- **Vector Icons**: Ionicons for UI elements

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Expo Go app on your mobile device

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sirius-ashwak/Purr
cd Purr
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Test the app:
- **Mobile**: Scan QR code with Expo Go app
- **Web**: Press `w` or visit http://localhost:8081
- **iOS Simulator**: Press `i` (requires Xcode)
- **Android Emulator**: Press `a` (requires Android Studio)

## 📱 Screens

### Home Screen
- Seasonal welcome message: "Happy Fall Studies! 🎃"
- Animated cat with pumpkin mascot
- Study statistics and progress tracking
- Purple gradient background for soothing study environment

### Timer Screen
- Focus timer for study sessions
- Purple gradient theme consistency

### Todo Screen  
- Task management and organization
- Study-focused task tracking

### Stats Screen
- Study progress and analytics
- Performance tracking over time
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on device/simulator:
- **iOS**: `npm run ios`
- **Android**: `npm run android`
- **Web**: `npm run web`

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js              # Navigation header with purple theme
│   ├── CatMascot.js          # Animated cat with pumpkin (Lottie)
│   ├── FeatureCard.js        # Reusable card with gradient background
│   ├── GameDashboard.js      # Study tracking dashboard
│   ├── PawClockLogo.js       # App logo component
│   └── PawPrintBackground.js # Background pattern component
├── screens/
│   ├── HomeScreen.js         # Main screen with seasonal theme
│   ├── TimerScreen.js        # Focus timer for study sessions
│   ├── TodoScreen.js         # Task management screen
│   └── StatsScreen.js        # Study statistics and analytics
├── constants/
│   └── theme.js              # Purple gradient color constants
├── context/
│   └── GameContext.js        # Global state management
└── assets/
    ├── cat-with-pumpkin.json # Lottie animation file
    ├── icon.png              # App icon
    ├── splash.png            # Splash screen
    └── adaptive-icon.png     # Android adaptive icon
```

## 🎯 Key Features in Detail

### Seasonal Theming
- **Autumn Theme**: Cat with pumpkin animation for fall season
- **Seasonal Messages**: "Happy Fall Studies! 🎃" and "Pumpkin Purr"
- **Adaptive Content**: Changes based on time of year

### Study Focus
- **Purple Color Psychology**: Calming purple gradients promote focus
- **Study Tracking**: Monitor study sessions and progress
- **Productivity Tools**: Timer, tasks, and statistics

### Technical Highlights
- **TurboModule Compatibility**: Configured to work with Expo SDK 53
- **Legacy Architecture**: Optimized for stability and performance
- **Cross-Platform**: Consistent experience across iOS, Android, and Web

## � Deployment

### Deploy to Render

1. **Prepare your repository:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create a new Web Service on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **New +** → **Web Service**
   - Connect your GitHub repository
   - Choose the branch (main)

3. **Configure build settings:**
   - **Build Command:** `npm ci && npm run build`
   - **Start Command:** `npm start`
   - **Node Version:** `18.17.0` (set in Environment Variables)

4. **Deploy:**
   - Click **Create Web Service**
   - Wait for build and deployment
   - Your Purr! app will be live on the web!

### Alternative: Docker Deployment

```bash
# Build the Docker image
docker build -t purr-app .

# Run the container
docker run -p 3000:3000 purr-app
```

### Build for Production Locally

```bash
# Build the web version
npm run build

# Serve locally to test
npm start
```

## �🔧 Development Notes

### TurboModule Configuration
- Configured to disable New Architecture for Expo SDK 53 compatibility
- Legacy mode enabled for stable performance
- Environment variables set to force legacy architecture

### Known Issues & Solutions
- **TurboModule Errors**: Resolved by disabling New Architecture in `app.json`
- **Mobile Detection**: Use local network mode (`npx expo start --lan`) for better connectivity
- **Package Compatibility**: Updated to compatible versions for Expo SDK 53

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs or issues
- Suggesting new seasonal themes or animations
- Improving study productivity features
- Enhancing UI/UX design
- Submitting pull requests

## 📄 License

This project is licensed under the MIT License.

---

For focused studying • Autumn 2025 🎃
