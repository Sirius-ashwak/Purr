import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initial state for the app
const initialState = {
  user: {
    fishTreats: 100, // Starting currency
    seeds: 20,
    level: 1,
    totalFocusTime: 0,
  },
  cats: {
    collection: [
      {
        id: 'starter_cat',
        name: 'Whiskers',
        breed: 'Tabby',
        personality: 'curious',
        ability: 'focus_bonus',
        abilityDescription: '+10% Fish Treats from focus sessions',
        isActive: true,
        acquired: true,
        accessories: [],
      }
    ],
    activeCat: 'starter_cat',
  },
  garden: {
    plants: [],
    decorations: [],
    buildings: [],
    size: 'small', // small, medium, large
    seasons: 'spring',
    weather: 'sunny',
  },
  productivity: {
    todaysTasks: [],
    focusSessions: [],
    streakCount: 0,
    subjectStats: {},
  },
  shop: {
    availableCats: [
      {
        id: 'persian_fluffy',
        name: 'Fluffy',
        breed: 'Persian',
        personality: 'lazy',
        ability: 'seed_bonus',
        abilityDescription: '+20% chance for rare seeds',
        cost: 250,
        currency: 'fishTreats',
      },
      {
        id: 'siamese_sage',
        name: 'Sage',
        breed: 'Siamese',
        personality: 'energetic',
        ability: 'time_bonus',
        abilityDescription: '+15% focus timer efficiency',
        cost: 300,
        currency: 'fishTreats',
      }
    ],
    availableDecorations: [],
    availableBuildings: [],
  },
  events: {
    activeEvents: [],
    seasonalItems: [],
  }
};

// Action types
const actionTypes = {
  EARN_CURRENCY: 'EARN_CURRENCY',
  SPEND_CURRENCY: 'SPEND_CURRENCY',
  ADD_CAT: 'ADD_CAT',
  SWITCH_ACTIVE_CAT: 'SWITCH_ACTIVE_CAT',
  ADD_PLANT: 'ADD_PLANT',
  COMPLETE_FOCUS_SESSION: 'COMPLETE_FOCUS_SESSION',
  ADD_TASK: 'ADD_TASK',
  COMPLETE_TASK: 'COMPLETE_TASK',
  UPDATE_GARDEN: 'UPDATE_GARDEN',
  LOAD_STATE: 'LOAD_STATE',
};

// Reducer function
const gameReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.EARN_CURRENCY:
      return {
        ...state,
        user: {
          ...state.user,
          [action.currency]: state.user[action.currency] + action.amount,
        }
      };

    case actionTypes.SPEND_CURRENCY:
      return {
        ...state,
        user: {
          ...state.user,
          [action.currency]: Math.max(0, state.user[action.currency] - action.amount),
        }
      };

    case actionTypes.ADD_CAT:
      return {
        ...state,
        cats: {
          ...state.cats,
          collection: [...state.cats.collection, action.cat],
        }
      };

    case actionTypes.SWITCH_ACTIVE_CAT:
      return {
        ...state,
        cats: {
          ...state.cats,
          activeCat: action.catId,
          collection: state.cats.collection.map(cat => ({
            ...cat,
            isActive: cat.id === action.catId,
          })),
        }
      };

    case actionTypes.COMPLETE_FOCUS_SESSION:
      const activeCat = state.cats.collection.find(cat => cat.id === state.cats.activeCat);
      let fishReward = action.baseReward;
      
      // Apply cat ability bonuses
      if (activeCat?.ability === 'focus_bonus') {
        fishReward = Math.floor(fishReward * 1.1);
      }

      return {
        ...state,
        user: {
          ...state.user,
          fishTreats: state.user.fishTreats + fishReward,
          seeds: state.user.seeds + action.seedReward,
          totalFocusTime: state.user.totalFocusTime + action.duration,
        },
        productivity: {
          ...state.productivity,
          focusSessions: [...state.productivity.focusSessions, action.session],
          streakCount: state.productivity.streakCount + 1,
          subjectStats: {
            ...state.productivity.subjectStats,
            [action.subject]: (state.productivity.subjectStats[action.subject] || 0) + action.duration,
          }
        }
      };

    case actionTypes.ADD_TASK:
      return {
        ...state,
        productivity: {
          ...state.productivity,
          todaysTasks: [...state.productivity.todaysTasks, action.task],
        }
      };

    case actionTypes.COMPLETE_TASK:
      return {
        ...state,
        productivity: {
          ...state.productivity,
          todaysTasks: state.productivity.todaysTasks.map(task =>
            task.id === action.taskId ? { ...task, completed: true } : task
          ),
        }
      };

    case actionTypes.LOAD_STATE:
      return {
        ...state,
        ...action.state,
      };

    default:
      return state;
  }
};

// Create context
const GameContext = createContext();

// Provider component
export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load state from storage on app start
  useEffect(() => {
    loadGameState();
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    saveGameState(state);
  }, [state]);

  const loadGameState = async () => {
    try {
      const savedState = await AsyncStorage.getItem('purrAppState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: actionTypes.LOAD_STATE, state: parsedState });
      }
    } catch (error) {
      console.error('Error loading game state:', error);
    }
  };

  const saveGameState = async (currentState) => {
    try {
      await AsyncStorage.setItem('purrAppState', JSON.stringify(currentState));
    } catch (error) {
      console.error('Error saving game state:', error);
    }
  };

  // Helper functions
  const earnCurrency = (currency, amount) => {
    dispatch({ type: actionTypes.EARN_CURRENCY, currency, amount });
  };

  const spendCurrency = (currency, amount) => {
    dispatch({ type: actionTypes.SPEND_CURRENCY, currency, amount });
  };

  const addCat = (cat) => {
    dispatch({ type: actionTypes.ADD_CAT, cat });
  };

  const switchActiveCat = (catId) => {
    dispatch({ type: actionTypes.SWITCH_ACTIVE_CAT, catId });
  };

  const completeFocusSession = (duration, subject, baseReward = 10, seedReward = 2) => {
    const session = {
      id: Date.now(),
      duration,
      subject,
      timestamp: new Date().toISOString(),
    };
    
    dispatch({
      type: actionTypes.COMPLETE_FOCUS_SESSION,
      session,
      duration,
      subject,
      baseReward,
      seedReward,
    });
  };

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: actionTypes.ADD_TASK, task: newTask });
  };

  const completeTask = (taskId) => {
    dispatch({ type: actionTypes.COMPLETE_TASK, taskId });
  };

  const getActiveCat = () => {
    return state.cats.collection.find(cat => cat.id === state.cats.activeCat);
  };

  const canAfford = (currency, amount) => {
    return state.user[currency] >= amount;
  };

  const value = {
    state,
    dispatch,
    earnCurrency,
    spendCurrency,
    addCat,
    switchActiveCat,
    completeFocusSession,
    addTask,
    completeTask,
    getActiveCat,
    canAfford,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext;
