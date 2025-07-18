const API_BASE_URL = 'https://user:c82c43db5f3f5705ab05d27c30743170@family-api-app-tunnel-61e1etwm.devinapps.com/api/v1';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface Child {
  id: number;
  name: string;
  dateOfBirth: string;
  userId: number;
  createdAt: string;
}

export interface CareTeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface TherapySession {
  id: number;
  childId: number;
  date: string;
  duration: number;
  status: string;
  notes?: string;
  createdAt: string;
}

class ApiService {
  private async fetchApi<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getUsers(): Promise<User[]> {
    return this.fetchApi<User[]>('/users');
  }

  async getChildren(): Promise<Child[]> {
    return this.fetchApi<Child[]>('/children');
  }

  async getCareTeam(): Promise<CareTeamMember[]> {
    return this.fetchApi<CareTeamMember[]>('/care-team');
  }

  async getTodaySessions(): Promise<TherapySession[]> {
    return this.fetchApi<TherapySession[]>('/sessions/today');
  }

  async getChildSessions(childId: number): Promise<TherapySession[]> {
    return this.fetchApi<TherapySession[]>(`/children/${childId}/sessions`);
  }

  async updateSessionProgress(sessionId: number, progressData: {
    progressNotes?: string;
    completionPercentage: number;
  }): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/progress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Update session progress failed:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
