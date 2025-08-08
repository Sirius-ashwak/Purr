import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGame } from '../context/GameContext';
import Header from '../components/Header';
import CatMascot from '../components/CatMascot';
import FeatureCard from '../components/FeatureCard';
import GameDashboard from '../components/GameDashboard';
import PawPrintBackground from '../components/PawPrintBackground';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { state, addTask, completeFocusSession } = useGame();

  const features = [
    {
      id: 1,
      title: 'Focus Timer',
      icon: 'timer-outline',
      color: '#FFE5D9',
      count: `${state.productivity.streakCount} streak`,
      onPress: () => {
        // Simulate completing a focus session
        completeFocusSession(1500, 'Work'); // 25 minutes
      }
    },
    {
      id: 2,
      title: 'My Garden',
      icon: 'flower-outline',
      color: '#E8F5E8',
      count: `${state.garden.plants.length} plants`,
      onPress: () => {
        console.log('Navigate to Garden');
      }
    },
    {
      id: 3,
      title: 'Cat Collection',
      icon: 'heart-outline',
      color: '#E5F3FF',
      count: `${state.cats.collection.length} cats`,
      onPress: () => {
        console.log('Navigate to Cat Collection');
      }
    },
    {
      id: 4,
      title: 'Shop',
      icon: 'storefront-outline',
      color: '#F3E5FF',
      count: 'New items!',
      onPress: () => {
        console.log('Navigate to Shop');
      }
    },
  ];

  return (
    <View style={styles.container}>
      <PawPrintBackground />
      <Header />
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back, Planner!</Text>
          <Text style={styles.subText}>Your garden is waiting for you! 🌸</Text>
        </View>

        <GameDashboard />

        <View style={styles.mascotSection}>
          <Text style={styles.sectionTitle}>Your Companion</Text>
          <CatMascot />
        </View>

        <View style={styles.cardsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.cardsContainer}>
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                icon={feature.icon}
                color={feature.color}
                count={feature.count}
                onPress={feature.onPress}
              />
            ))}
          </View>
        </View>

        <View style={styles.aiSection}>
          <Text style={styles.sectionTitle}>AI Assistant</Text>
          <View style={styles.aiCard}>
            <View style={styles.aiContent}>
              <Ionicons name="sparkles" size={24} color="#9B59B6" />
              <View style={styles.aiText}>
                <Text style={styles.aiTitle}>Smart Planning Active</Text>
                <Text style={styles.aiDescription}>
                  I'm analyzing your productivity patterns to suggest the perfect schedule for today!
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.motivationSection}>
          <View style={styles.motivationCard}>
            <Text style={styles.motivationText}>
              "Every focus session waters your garden. Every completed task feeds your cats. 
              Your productivity creates a beautiful world!" 🌟
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F0',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: '#7F8C8D',
    fontWeight: '400',
  },
  mascotSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
  },
  cardsSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  cardsContainer: {
    gap: 15,
  },
  aiSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  aiCard: {
    backgroundColor: '#F8F7FF',
    borderRadius: 20,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#9B59B6',
  },
  aiContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  aiText: {
    flex: 1,
    marginLeft: 15,
  },
  aiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 5,
  },
  aiDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
  motivationSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  motivationCard: {
    backgroundColor: 'rgba(233, 196, 106, 0.2)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(233, 196, 106, 0.3)',
  },
  motivationText: {
    fontSize: 14,
    color: '#2C3E50',
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },
});

export default HomeScreen;
