import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View } from '@/components/Themed';

export default function SessionRecapScreen() {
  const [selectedUser, setSelectedUser] = useState('Jared');
  const [expandedSections, setExpandedSections] = useState({
    moodScore: true,
    dailyRecap: true,
    monthlyGoal: true,
    successCriteria: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Daily Session Recap</Text>
          <TouchableOpacity>
            <Text style={styles.collapseAllText}>Collapse all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sessionInfoContainer}>
          <Text style={styles.sessionInfoLabel}>Viewing Session Details for</Text>
          <View style={styles.datePickerContainer}>
            <Ionicons name="calendar-outline" size={16} color="#4A90E2" />
            <Text style={styles.datePickerText}>June 05, 2025</Text>
          </View>
        </View>

        <View style={styles.userPillsContainer}>
          <TouchableOpacity 
            style={[styles.userPill, selectedUser === 'Jared' && styles.activeUserPill]}
            onPress={() => setSelectedUser('Jared')}
          >
            <Text style={selectedUser === 'Jared' ? styles.userPillTextActive : styles.userPillText}>J</Text>
            <Text style={selectedUser === 'Jared' ? styles.userPillNameActive : styles.userPillName}>Jared</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.userPill, selectedUser === 'Meredith' && styles.activeUserPill]}
            onPress={() => setSelectedUser('Meredith')}
          >
            <Text style={selectedUser === 'Meredith' ? styles.userPillTextActive : styles.userPillText}>M</Text>
            <Text style={selectedUser === 'Meredith' ? styles.userPillNameActive : styles.userPillName}>Meredith</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('moodScore')}
          >
            <Text style={styles.sectionTitle}>Today's Mood Score</Text>
            <View style={styles.sectionHeaderRight}>
              <TouchableOpacity>
                <Text style={styles.viewHistoryText}>View History</Text>
              </TouchableOpacity>
              <Ionicons 
                name={expandedSections.moodScore ? "chevron-up" : "chevron-down"} 
                size={20} 
                color="#666" 
              />
            </View>
          </TouchableOpacity>
          
          {expandedSections.moodScore && (
            <View style={styles.sectionContent}>
              <View style={styles.moodScoreContainer}>
                <Text style={styles.moodScore}>08</Text>
                <Text style={styles.moodScoreSubtext}>/ 15</Text>
                <Text style={styles.moodEmoji}>😐</Text>
              </View>
              <View style={styles.moodExplanationContainer}>
                <Text style={styles.moodExplanationText}>
                  "A score of 8 indicates your child was not ready to engage in challenges, and we altered our care to spend more time to get to a more stable state for effective therapy"
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('dailyRecap')}
          >
            <Text style={styles.sectionTitle}>Daily Recap</Text>
            <Ionicons 
              name={expandedSections.dailyRecap ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {expandedSections.dailyRecap && (
            <View style={styles.sectionContent}>
              <View style={styles.recapItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.recapText}>We made <Text style={styles.boldText}>moderate</Text> progress during session</Text>
              </View>
              <View style={styles.recapItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.recapText}>There were <Text style={styles.boldText}>minimal levels</Text> of interfering behavior</Text>
              </View>
              <View style={styles.recapItem}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.recapText}>There were <Text style={styles.boldText}>moderate increases</Text> in independent responding across the session</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('monthlyGoal')}
          >
            <Text style={styles.sectionTitle}>Monthly Goal</Text>
            <Ionicons 
              name={expandedSections.monthlyGoal ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {expandedSections.monthlyGoal && (
            <View style={styles.sectionContent}>
              <View style={styles.goalItem}>
                <View style={styles.goalBullet} />
                <Text style={styles.goalText}>Learn better communication</Text>
              </View>
              <View style={styles.goalItem}>
                <View style={styles.goalBullet} />
                <Text style={styles.goalText}>Establish a daily routine</Text>
              </View>
            </View>
          )}
        </View>

        <View style={styles.sectionCard}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => toggleSection('successCriteria')}
          >
            <Text style={styles.sectionTitle}>Success Criteria Met</Text>
            <Ionicons 
              name={expandedSections.successCriteria ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#666" 
            />
          </TouchableOpacity>
          
          {expandedSections.successCriteria && (
            <View style={styles.sectionContent}>
              <View style={styles.criteriaItem}>
                <Text style={styles.criteriaBullet}>•</Text>
                <Text style={styles.criteriaText}>Object within 3ft of the client</Text>
              </View>
              <View style={styles.criteriaItem}>
                <Text style={styles.criteriaBullet}>•</Text>
                <Text style={styles.criteriaText}>Followed a point</Text>
              </View>
              <View style={styles.criteriaItem}>
                <Text style={styles.criteriaBullet}>•</Text>
                <Text style={styles.criteriaText}>Max prompt - PV + PR (prompt vocal + prompt</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  collapseAllText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  sessionInfoContainer: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  sessionInfoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  datePickerText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '500',
  },
  userPillsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  userPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#e9ecef',
  },
  activeUserPill: {
    backgroundColor: '#4A90E2',
  },
  userPillText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginRight: 6,
  },
  userPillTextActive: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 6,
  },
  userPillName: {
    fontSize: 14,
    color: '#666',
  },
  userPillNameActive: {
    fontSize: 14,
    color: '#fff',
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  sectionHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  viewHistoryText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
    marginRight: 12,
  },
  sectionContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  moodScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  moodScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#000',
  },
  moodScoreSubtext: {
    fontSize: 20,
    color: '#666',
    marginLeft: 4,
    marginRight: 12,
  },
  moodEmoji: {
    fontSize: 32,
  },
  moodExplanationContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
  },
  moodExplanationText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  recapItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  recapText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  goalBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4A90E2',
    marginRight: 12,
  },
  goalText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  criteriaBullet: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
    lineHeight: 20,
  },
  criteriaText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    flex: 1,
  },
});
