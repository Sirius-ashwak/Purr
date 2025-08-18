import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GameProvider } from './src/context/GameContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <GameProvider>
      <HomeScreen />
      <StatusBar style="light" />
    </GameProvider>
  );
}