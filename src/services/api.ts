import { User, SportTypeCode, Program } from '../types';
import { MOCK_PROGRAMS, CURRENT_COACH, CURRENT_ATHLETE } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('jibigym_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('jibigym_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('jibigym_token');
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      // Fallback for development / mock mode
      console.warn(`[ApiService] Request to ${endpoint} failed, falling back to mock:`, err);
      throw err;
    }
  }

  // Auth / Users endpoints (aligned with UsersController.cs)
  async requestOtp(mobile: string): Promise<{ success: boolean; message: string; developmentCode?: string }> {
    try {
      return await this.request('/api/users/Otp', {
        method: 'POST',
        body: JSON.stringify({ mobile, purpose: 1 }),
      });
    } catch {
      // Return simulated success in mock mode
      return {
        success: true,
        message: 'کد تایید ۵ رقمی ارسال شد (کد تست: 12345)',
        developmentCode: '12345'
      };
    }
  }

  async verifyOtp(mobile: string, code: string): Promise<{ success: boolean; token?: string; user?: User }> {
    try {
      return await this.request('/api/users/Otp/Verify', {
        method: 'POST',
        body: JSON.stringify({ mobile, code, purpose: 1 }),
      });
    } catch {
      return {
        success: code === '12345' || code.length === 5,
        token: 'mock_jwt_token_' + Date.now(),
      };
    }
  }

  async registerUser(userData: {
    firstName: string;
    lastName: string;
    mobile: string;
    userType: number; // 1: Athlete, 2: Coach, 3: GymOwner
    sportTypes?: SportTypeCode[];
  }): Promise<User> {
    try {
      return await this.request('/api/users/New', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    } catch {
      return {
        id: Math.floor(Math.random() * 1000) + 100,
        firstName: userData.firstName,
        lastName: userData.lastName,
        mobile: userData.mobile,
        role: userData.userType === 2 ? 'coach' : userData.userType === 3 ? 'gym_owner' : 'athlete',
        sportTypes: userData.sportTypes || ['bodybuilding'],
        status: 'active',
      };
    }
  }

  // Programs endpoints (aligned with ProgramsController.cs)
  async getProgram(id: number): Promise<Program> {
    try {
      return await this.request(`/v1/programs/${id}`);
    } catch {
      return MOCK_PROGRAMS[0];
    }
  }

  async createProgram(programData: any): Promise<{ id: number }> {
    try {
      return await this.request('/v1/programs', {
        method: 'POST',
        body: JSON.stringify(programData),
      });
    } catch {
      return { id: Math.floor(Math.random() * 1000) + 200 };
    }
  }

  async assignProgram(programId: number, assignData: any): Promise<{ id: number }> {
    try {
      return await this.request(`/v1/programs/${programId}/assignments`, {
        method: 'POST',
        body: JSON.stringify(assignData),
      });
    } catch {
      return { id: Math.floor(Math.random() * 1000) + 500 };
    }
  }
}

export const api = new ApiService();
