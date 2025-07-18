import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { apiService, CareTeamMember } from '@/services/api';

interface CareTeamMemberWithUI {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  initials: string;
  avatarColor: string;
}

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
      setCareTeam([
        {
          id: 1,
          name: 'Jonathan Myers',
          role: 'Supervising Clinician',
          email: 'jonathan.myers@example.com',
          phone: '313-204-1212',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          name: 'Alice Brown',
          role: 'Operations Director',
          email: 'alice.brown@example.com',
          phone: '313-204-1212',
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          name: 'Thomas Smith',
          role: 'Patient Coordinator',
          email: 'thomas.smith@example.com',
          phone: '313-204-1212',
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (index: number) => {
    const colors = ['#87CEEB', '#F5C6CB', '#8B5CF6'];
    return colors[index % colors.length];
  };

  const handlePhoneCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleSendEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Care Team</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.loadingText}>Loading care team...</Text>
          </View>
        ) : (
          careTeam.map((member, index) => (
            <View key={member.id} style={styles.memberCard}>
              <View style={styles.memberInfo}>
                <View style={[styles.avatar, { backgroundColor: getAvatarColor(index) }]}>
                  <Text style={styles.avatarText}>{getInitials(member.name)}</Text>
                </View>
                
                <View style={styles.memberDetails}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <View style={styles.roleBadge}>
                    <Text style={styles.roleBadgeText}>{member.role}</Text>
                  </View>
                  
                  {member.phone && (
                    <TouchableOpacity 
                      style={styles.phoneContainer}
                      onPress={() => handlePhoneCall(member.phone!)}
                    >
                      <Ionicons name="call-outline" size={16} color="#666" />
                      <Text style={styles.phoneText}>{member.phone}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.emailButton}
                onPress={() => handleSendEmail(member.email)}
              >
                <Text style={styles.emailButtonText}>Send Email</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  memberCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  memberInfo: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  memberDetails: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  roleBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  roleBadgeText: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: '500',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  phoneText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  },
  emailButton: {
    borderWidth: 1,
    borderColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  emailButtonText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
});
