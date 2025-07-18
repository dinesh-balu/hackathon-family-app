import { StyleSheet, ScrollView, ActivityIndicator, Alert, Linking } from 'react-native';
import { useEffect, useState } from 'react';

import { Text, View } from '@/components/Themed';
import { apiService, CareTeamMember } from '@/services/api';

export default function CareTeamScreen() {
  const [careTeam, setCareTeam] = useState<CareTeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCareTeam();
  }, []);

  const loadCareTeam = async () => {
    try {
      setLoading(true);
      const data = await apiService.getCareTeam();
      setCareTeam(data);
    } catch (error) {
      console.error('Failed to load care team:', error);
      Alert.alert('Error', 'Failed to load care team data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailPress = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handlePhonePress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading care team...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Care Team</Text>
        
        {careTeam.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No care team members found</Text>
          </View>
        ) : (
          careTeam.map((member) => (
            <View key={member.id} style={styles.memberCard}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
              
              <Text 
                style={styles.memberEmail}
                onPress={() => handleEmailPress(member.email)}
              >
                📧 {member.email}
              </Text>
              
              {member.phone && (
                <Text 
                  style={styles.memberPhone}
                  onPress={() => handlePhonePress(member.phone!)}
                >
                  📞 {member.phone}
                </Text>
              )}
              
              <Text style={styles.memberDate}>
                Added: {new Date(member.createdAt).toLocaleDateString()}
              </Text>
            </View>
          ))
        )}
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
  memberCard: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#b3d9e8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  memberRole: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2f95dc',
    marginBottom: 8,
  },
  memberEmail: {
    fontSize: 14,
    color: '#0066cc',
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  memberPhone: {
    fontSize: 14,
    color: '#0066cc',
    marginBottom: 5,
    textDecorationLine: 'underline',
  },
  memberDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
});
