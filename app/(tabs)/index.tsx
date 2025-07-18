import { StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { apiService, TherapySession, Child } from '@/services/api';

export default function HomeScreen() {
  const [todaySessions, setTodaySessions] = useState<TherapySession[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [sessionsData, childrenData] = await Promise.all([
        apiService.getTodaySessions(),
        apiService.getChildren()
      ]);
      setTodaySessions(sessionsData);
      setChildren(childrenData);
    } catch (error) {
      console.error('Failed to load data:', error);
      Alert.alert('Error', 'Failed to load session data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const getChildName = (childId: number) => {
    const child = children.find(c => c.id === childId);
    return child?.name || 'Unknown Child';
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading sessions...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Today's Sessions</Text>
        
        {todaySessions.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No sessions scheduled for today</Text>
          </View>
        ) : (
          todaySessions.map((session) => (
            <View key={session.id} style={styles.sessionCard}>
              <Text style={styles.sessionTitle}>
                {getChildName(session.childId)}
              </Text>
              <Text style={styles.sessionDetail}>
                Duration: {session.duration} minutes
              </Text>
              <Text style={styles.sessionDetail}>
                Status: {session.status}
              </Text>
              {session.notes && (
                <Text style={styles.sessionNotes}>
                  Notes: {session.notes}
                </Text>
              )}
            </View>
          ))
        )}

        <View style={styles.separator} />
        
        <Text style={styles.sectionTitle}>Children Overview</Text>
        {children.map((child) => (
          <View key={child.id} style={styles.childCard}>
            <Text style={styles.childName}>{child.name}</Text>
            <Text style={styles.childDetail}>
              Born: {new Date(child.dateOfBirth).toLocaleDateString()}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  loadingText: {
    marginTop: 10,
    textAlign: 'center',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  sessionCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sessionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sessionDetail: {
    fontSize: 14,
    marginBottom: 3,
  },
  sessionNotes: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
  childCard: {
    backgroundColor: '#e8f4f8',
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#b3d9e8',
  },
  childName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  childDetail: {
    fontSize: 14,
    marginTop: 2,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    backgroundColor: '#ccc',
  },
});
