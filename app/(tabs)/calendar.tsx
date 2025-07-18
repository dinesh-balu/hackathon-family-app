import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View } from '@/components/Themed';

export default function CalendarScreen() {
  const [selectedUser, setSelectedUser] = useState('Jared');
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const calendarDays = [
    { day: 1, status: null },
    { day: 2, status: 'past' },
    { day: 3, status: 'past' },
    { day: 4, status: 'past' },
    { day: 5, status: 'today' },
    { day: 6, status: 'upcoming' },
    { day: 7, status: null },
    { day: 8, status: null },
    { day: 9, status: 'upcoming' },
    { day: 10, status: 'past' },
    { day: 11, status: 'past' },
    { day: 12, status: 'past' },
    { day: 13, status: 'past' },
    { day: 14, status: null },
    { day: 15, status: null },
    { day: 16, status: 'past' },
    { day: 17, status: 'past' },
    { day: 18, status: null },
    { day: 19, status: 'past' },
    { day: 20, status: 'upcoming' },
    { day: 21, status: null },
    { day: 22, status: null },
    { day: 23, status: 'past' },
    { day: 24, status: 'past' },
    { day: 25, status: 'past' },
    { day: 26, status: 'upcoming' },
    { day: 27, status: 'past' },
    { day: 28, status: null },
    { day: 29, status: null },
    { day: 30, status: 'past' },
  ];

  const getCalendarDayStyle = (status: string | null) => {
    switch (status) {
      case 'past':
        return [styles.calendarDay, styles.pastDay];
      case 'today':
        return [styles.calendarDay, styles.todayDay];
      case 'upcoming':
        return [styles.calendarDay, styles.upcomingDay];
      default:
        return styles.calendarDay;
    }
  };

  const getCalendarDayTextStyle = (status: string | null) => {
    switch (status) {
      case 'past':
      case 'today':
      case 'upcoming':
        return [styles.calendarDayText, styles.activeDayText];
      default:
        return styles.calendarDayText;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Calendar</Text>
          <Text style={styles.headerDate}>{currentDate}</Text>
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

        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity>
              <Ionicons name="chevron-back" size={24} color="#666" />
            </TouchableOpacity>
            <Text style={styles.monthTitle}>June</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.daysOfWeekContainer}>
            {daysOfWeek.map((day, index) => (
              <Text key={index} style={styles.dayOfWeekText}>{day}</Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {calendarDays.map((dayData, index) => (
              <TouchableOpacity key={index} style={getCalendarDayStyle(dayData.status)}>
                <Text style={getCalendarDayTextStyle(dayData.status)}>{dayData.day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.scheduledSessionsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Scheduled Sessions</Text>
            <Ionicons name="information-circle-outline" size={20} color="#666" />
          </View>
          
          <Text style={styles.rescheduleNote}>
            Rescheduling can only be done 24 hrs prior to the session date.{'\n'}
            Please call Operations Leader for any changes within 24 hrs.
          </Text>

          <Text style={styles.sessionDate}>June 5, 2025</Text>

          <View style={styles.sessionCard}>
            <View style={styles.sessionHeader}>
              <Text style={styles.sessionTitle}>Parent Engagement</Text>
              <View style={styles.completedBadge}>
                <Text style={styles.completedBadgeText}>Completed</Text>
              </View>
            </View>
            
            <View style={styles.sessionDetails}>
              <View style={styles.sessionDetailRow}>
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.sessionDetailText}>06/05/2025</Text>
              </View>
            </View>

            <View style={styles.sessionTimeContainer}>
              <View style={styles.sessionTimeRow}>
                <Ionicons name="time-outline" size={16} color="#4A90E2" />
                <Text style={styles.sessionTimeText}>3:00 PM - 4:00 PM</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.viewRecapButton}
              onPress={() => router.push('/session-recap')}
            >
              <Text style={styles.viewRecapButtonText}>View Session Recap</Text>
            </TouchableOpacity>
          </View>
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
  calendarContainer: {
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
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  dayOfWeekText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  calendarDay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  pastDay: {
    backgroundColor: '#8B5CF6',
  },
  todayDay: {
    backgroundColor: '#4A90E2',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  upcomingDay: {
    backgroundColor: '#87CEEB',
  },
  calendarDayText: {
    fontSize: 16,
    color: '#333',
  },
  activeDayText: {
    color: '#fff',
    fontWeight: '500',
  },
  scheduledSessionsContainer: {
    marginBottom: 40,
    backgroundColor: 'transparent',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  rescheduleNote: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 20,
  },
  sessionDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A90E2',
    marginBottom: 16,
  },
  sessionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  completedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  sessionDetails: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  sessionDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  sessionDetailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  sessionTimeContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  sessionTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  sessionTimeText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  viewRecapButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewRecapButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
