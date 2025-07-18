import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View } from '@/components/Themed';

export default function HomeScreen() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
          <Text style={styles.headerDate}>{currentDate}</Text>
        </View>

        {/* User Selection Pills */}
        <View style={styles.userPillsContainer}>
          <TouchableOpacity style={[styles.userPill, styles.activeUserPill]}>
            <Text style={styles.userPillTextActive}>J</Text>
            <Text style={styles.userPillNameActive}>Jared</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userPill}>
            <Text style={styles.userPillText}>M</Text>
            <Text style={styles.userPillName}>Meredith</Text>
          </TouchableOpacity>
        </View>

        {/* Next Session Card */}
        <View style={styles.nextSessionCard}>
          <View style={styles.nextSessionHeader}>
            <Text style={styles.nextSessionTitle}>Next Session</Text>
            <View style={styles.therapyBadge}>
              <Text style={styles.therapyBadgeText}>ABA Therapy</Text>
            </View>
          </View>
          <View style={styles.sessionDetails}>
            <View style={styles.sessionDetailRow}>
              <Ionicons name="calendar-outline" size={20} color="#666" />
              <Text style={styles.sessionDetailText}>Mon, Jun 9, 2025</Text>
            </View>
            <View style={styles.sessionDetailRow}>
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.sessionDetailText}>10 AM-11 AM</Text>
            </View>
          </View>
        </View>

        {/* Daily Session Recap */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daily Session Recap</Text>
          <TouchableOpacity onPress={() => router.push('/session-recap')}>
            <Text style={styles.viewDetailsLink}>View Details</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {/* Mood Score */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="happy-outline" size={20} color="#4A90E2" />
              <Text style={styles.statTitle}>Mood Score</Text>
            </View>
            <View style={styles.moodScoreContainer}>
              <Text style={styles.moodScore}>08</Text>
              <Text style={styles.moodScoreSubtext}>/ 15</Text>
              <Text style={styles.moodEmoji}>😐</Text>
            </View>
          </View>

          {/* Progress */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="trending-up-outline" size={20} color="#4A90E2" />
              <Text style={styles.statTitle}>Progress</Text>
            </View>
            <Text style={styles.progressText}>We made <Text style={styles.boldText}>Moderate</Text></Text>
            <Text style={styles.progressText}>progress this session</Text>
          </View>

          {/* Meals */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="restaurant-outline" size={20} color="#4A90E2" />
              <Text style={styles.statTitle}>Meals</Text>
            </View>
            <Text style={styles.mealsText}>Ate 3 meals with some support</Text>
          </View>

          {/* Please Bring In */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name="bag-outline" size={20} color="#4A90E2" />
              <Text style={styles.statTitle}>Please Bring In</Text>
            </View>
            <View style={styles.checklistItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.checklistText}>More snacks</Text>
            </View>
            <View style={styles.checklistItem}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.checklistText}>Diapers</Text>
            </View>
          </View>
        </View>

        {/* Last Updated */}
        <Text style={styles.lastUpdated}>Updated today, 8:35 PM</Text>

        {/* Action Buttons */}
        <View style={styles.actionButtonsGrid}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/care-team')}>
            <Ionicons name="people-outline" size={24} color="#4A90E2" />
            <Text style={styles.actionButtonText}>My Care Team</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="card-outline" size={24} color="#4A90E2" />
            <Text style={styles.actionButtonText}>Insurance &amp; Billing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#4A90E2" />
            <Text style={styles.actionButtonText}>Leave Feedback</Text>
          </TouchableOpacity>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  headerDate: {
    fontSize: 14,
    color: '#666',
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
  nextSessionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextSessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  nextSessionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  therapyBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  therapyBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  sessionDetails: {
    backgroundColor: 'transparent',
  },
  sessionDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  sessionDetailText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  viewDetailsLink: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  statTitle: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  moodScoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: 'transparent',
  },
  moodScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  moodScoreSubtext: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
    marginRight: 8,
  },
  moodEmoji: {
    fontSize: 24,
  },
  progressText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  mealsText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  checklistText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  lastUpdated: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginBottom: 20,
  },
  actionButtonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
    backgroundColor: 'transparent',
  },
  actionButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});
