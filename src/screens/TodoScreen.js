import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize, shadows } from '../constants/theme';
import { useGame } from '../context/GameContext';

const TodoScreen = () => {
  const { state, addTask, completeTask } = useGame();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskSubject, setNewTaskSubject] = useState('General');
  const [newTaskPriority, setNewTaskPriority] = useState('medium');

  const subjects = ['General', 'Math', 'Science', 'Language', 'History', 'Art'];
  const priorities = [
    { key: 'low', label: 'Low', color: colors.success },
    { key: 'medium', label: 'Medium', color: colors.warning },
    { key: 'high', label: 'High', color: colors.danger },
  ];

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle.trim(),
        subject: newTaskSubject,
        priority: newTaskPriority,
      });
      setNewTaskTitle('');
      setNewTaskSubject('General');
      setNewTaskPriority('medium');
      setShowAddModal(false);
    }
  };

  const handleCompleteTask = (taskId) => {
    Alert.alert(
      'Complete Task',
      'Mark this task as completed?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Complete', 
          onPress: () => completeTask(taskId),
          style: 'default'
        },
      ]
    );
  };

  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find(p => p.key === priority);
    return priorityObj ? priorityObj.color : colors.textMuted;
  };

  const getSubjectIcon = (subject) => {
    const icons = {
      'Math': 'calculator-outline',
      'Science': 'flask-outline',
      'Language': 'book-outline',
      'History': 'library-outline',
      'Art': 'brush-outline',
      'General': 'document-text-outline',
    };
    return icons[subject] || 'document-text-outline';
  };

  const TaskItem = ({ task }) => (
    <View style={[styles.taskItem, task.completed && styles.taskItemCompleted]}>
      <TouchableOpacity
        style={styles.taskContent}
        onPress={() => !task.completed && handleCompleteTask(task.id)}
      >
        <View style={styles.taskLeft}>
          <View style={[styles.checkbox, task.completed && styles.checkboxCompleted]}>
            {task.completed && (
              <Ionicons name="checkmark" size={16} color={colors.white} />
            )}
          </View>
          <View style={styles.taskInfo}>
            <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>
              {task.title}
            </Text>
            <View style={styles.taskMeta}>
              <View style={styles.taskSubject}>
                <Ionicons 
                  name={getSubjectIcon(task.subject)} 
                  size={14} 
                  color={colors.textMuted} 
                />
                <Text style={styles.taskSubjectText}>{task.subject}</Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) }]}>
                <Text style={styles.priorityText}>
                  {priorities.find(p => p.key === task.priority)?.label}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const completedTasks = state.productivity.todaysTasks.filter(task => task.completed);
  const pendingTasks = state.productivity.todaysTasks.filter(task => !task.completed);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Tasks</Text>
          <Text style={styles.subtitle}>
            {pendingTasks.length} pending • {completedTasks.length} completed
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Progress Card */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Today's Progress</Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: state.productivity.todaysTasks.length > 0 
                  ? `${(completedTasks.length / state.productivity.todaysTasks.length) * 100}%` 
                  : '0%'
              }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {completedTasks.length} of {state.productivity.todaysTasks.length} tasks completed
        </Text>
      </View>

      {/* Tasks List */}
      <ScrollView style={styles.tasksList} showsVerticalScrollIndicator={false}>
        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
          <View style={styles.tasksSection}>
            <Text style={styles.sectionTitle}>Pending Tasks</Text>
            {pendingTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </View>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <View style={styles.tasksSection}>
            <Text style={styles.sectionTitle}>Completed Tasks</Text>
            {completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </View>
        )}

        {/* Empty State */}
        {state.productivity.todaysTasks.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="list-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No tasks yet</Text>
            <Text style={styles.emptyText}>
              Add your first task to get started with your study plan!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Add Task Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Add New Task</Text>
            <TouchableOpacity onPress={handleAddTask}>
              <Text style={styles.modalSave}>Save</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>
            {/* Task Title */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Task Title</Text>
              <TextInput
                style={styles.textInput}
                value={newTaskTitle}
                onChangeText={setNewTaskTitle}
                placeholder="Enter task title..."
                placeholderTextColor={colors.textMuted}
              />
            </View>

            {/* Subject Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Subject</Text>
              <View style={styles.optionsGrid}>
                {subjects.map((subject) => (
                  <TouchableOpacity
                    key={subject}
                    style={[
                      styles.optionButton,
                      newTaskSubject === subject && styles.optionButtonSelected,
                    ]}
                    onPress={() => setNewTaskSubject(subject)}
                  >
                    <Ionicons 
                      name={getSubjectIcon(subject)} 
                      size={16} 
                      color={newTaskSubject === subject ? colors.white : colors.textPrimary} 
                    />
                    <Text style={[
                      styles.optionText,
                      newTaskSubject === subject && styles.optionTextSelected,
                    ]}>
                      {subject}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Priority Selection */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Priority</Text>
              <View style={styles.priorityOptions}>
                {priorities.map((priority) => (
                  <TouchableOpacity
                    key={priority.key}
                    style={[
                      styles.priorityButton,
                      { borderColor: priority.color },
                      newTaskPriority === priority.key && { backgroundColor: priority.color },
                    ]}
                    onPress={() => setNewTaskPriority(priority.key)}
                  >
                    <Text style={[
                      styles.priorityButtonText,
                      { color: newTaskPriority === priority.key ? colors.white : priority.color },
                    ]}>
                      {priority.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.hero,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
  },
  progressCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    ...shadows.small,
  },
  progressTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.progressBackground,
    borderRadius: 4,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.progressGreen,
    borderRadius: 4,
  },
  progressText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  tasksList: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  tasksSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  taskItem: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    ...shadows.small,
  },
  taskItemCompleted: {
    opacity: 0.7,
  },
  taskContent: {
    padding: spacing.lg,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.textMuted,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskSubject: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskSubjectText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginLeft: spacing.xs,
  },
  priorityBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  priorityText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.huge,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.progressBackground,
  },
  modalCancel: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  modalTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  modalSave: {
    fontSize: fontSize.md,
    color: colors.accent,
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: spacing.xl,
  },
  inputGroup: {
    marginBottom: spacing.xl,
  },
  inputLabel: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  textInput: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.progressBackground,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.progressBackground,
  },
  optionButtonSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  optionText: {
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginLeft: spacing.xs,
  },
  optionTextSelected: {
    color: colors.textSecondary,
  },
  priorityOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 2,
    alignItems: 'center',
  },
  priorityButtonText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
});

export default TodoScreen;