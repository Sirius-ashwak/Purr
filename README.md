# PurrPlan World 🐾

A modern, playful mobile app for task planning and scheduling, featuring an adorable cat mascot and delightful user interface.

## Features

- **Cute Cat Mascot**: Semi-realistic cat character holding a calendar at the center of the home screen
- **Modern UI Design**: Soft pastel colors (peach, cream, mint green) with rounded cards
- **Task Management**: "My Tasks", "Schedule", and "Reminders" sections
- **Subtle Animations**: Smooth gradients and gentle interactions
- **Paw Print Patterns**: Subtle background decorations
- **Minimalistic Icons**: Clean, friendly typography and iconography

## Design Elements

### Color Palette
- **Background**: Soft peach cream (#FFF5F0)
- **Cards**: Peach (#FFE5D9), Mint green (#E8F5E8), Soft blue (#E5F3FF)
- **Primary**: Warm orange (#E67E22)
- **Text**: Dark blue-gray (#2C3E50)

### Key Components
- **Header**: App logo with paw and clock design
- **Cat Mascot**: Animated cat holding a small calendar
- **Feature Cards**: Rounded cards with soft shadows
- **Paw Print Background**: Subtle pattern overlay

## Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and toolchain
- **React Native SVG**: Custom illustrations and icons
- **Vector Icons**: Ionicons for UI elements

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)

### Installation

1. Clone the repository:
```bash
git clone <https://github.com/Sirius-ashwak/Purr>
cd Purr
```

2. Install dependencies:
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

## Project Structure

```
src/
├── components/
│   ├── Header.js           # Top navigation with logo
│   ├── CatMascot.js       # Cute cat character with calendar
│   ├── FeatureCard.js     # Reusable card component
│   ├── PawClockLogo.js    # App logo with paw and clock
│   └── PawPrintBackground.js # Subtle background pattern
├── screens/
│   └── HomeScreen.js      # Main home screen layout
├── constants/
│   └── theme.js           # Color palette and styling constants
└── assets/                # Images and static files
```

## Features in Detail

### Home Screen
- Welcome message with personalized greeting
- Central cat mascot holding today's date
- Quick action cards for main app features
- Performance statistics display
- Smooth scrolling and responsive design

### Interactive Elements
- Touch feedback on cards and buttons
- Smooth animations and transitions
- Accessible icons and navigation
- Consistent visual hierarchy

## Contributing

Feel free to contribute to this project by:
- Reporting bugs or issues
- Suggesting new features
- Improving documentation
- Submitting pull requests

## License

This project is licensed under the MIT License.

---

Made with ❤️ and 🐾 by the PurrPlan Team
