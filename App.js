import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GameProvider } from './src/context/GameContext';
import MainScreen from './src/screens/MainScreen';

export default function App() {
  return (
    <GameProvider>
      <MainScreen />
      <StatusBar style="dark" />
    </GameProvider>
  );
}