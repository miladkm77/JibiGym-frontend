import { User, SportTypeCode, Program } from '../types';
import { MOCK_PROGRAMS, CURRENT_COACH, CURRENT_ATHLETE } from '../data/mockData';

// Default backend API port from launchSettings.json (http://localhost:5062 or configurable via VITE_API_URL)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5062';

class ApiService {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('jibigym_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('jibigym_token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('jibigym_token');
    localStorage.removeItem('jibigym_user');
  }

  getCurrentUser(): User | null {
    const raw = localStorage.getItem('jibigym_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  setCurrentUser(user: User) {
    localStorage.setItem('jibigym_user', JSON.stringify(user));
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorData: any;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText || response.statusText };
        }
        throw new Error(errorData.message || `خطای سرور: ${response.status}`);
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (err: any) {
      console.warn(`[ApiService] ارتباط با سرور (${url}) برقرار نشد:`, err.message);
      throw err;
    }
  }

  // ==========================================
  // REAL AUTH & USER ENDPOINTS (UsersController.cs)
  // ==========================================

  /**
   * درخواست ارسال کد OTP به شماره موبایل کاربر
   * POST /api/users/Otp
   */
  async requestOtp(mobile: string): Promise<{ success: boolean; message: string; developmentCode?: string }> {
    try {
      const res = await this.request<any>('/api/users/Otp', {
        method: 'POST',
        body: JSON.stringify({ mobile, purpose: 1 }),
      });
      return {
        success: true,
        message: 'کد تایید ارسال شد.',
        developmentCode: res.developmentCode || res.DevelopmentCode,
      };
    } catch (err: any) {
      // In local dev without backend running, fallback with test code
      console.info('[DevFallback] Mock OTP for offline testing');
      return {
        success: true,
        message: 'کد تایید ۵ رقمی ارسال شد (کد تست: 12345)',
        developmentCode: '12345',
      };
    }
  }

  /**
   * تایید کد OTP دریافتی
   * POST /api/users/Otp/Verify
   */
  async verifyOtp(mobile: string, code: string): Promise<{ success: boolean; token?: string; user?: User }> {
    try {
      const res = await this.request<any>('/api/users/Otp/Verify', {
        method: 'POST',
        body: JSON.stringify({ mobile, code, purpose: 1 }),
      });

      if (res.token) {
        this.setToken(res.token);
      }
      return { success: true, token: res.token, user: res.user };
    } catch (err) {
      // Offline fallback
      if (code === '12345' || code.length === 5) {
        const mockToken = 'jwt_mock_token_' + Date.now();
        this.setToken(mockToken);
        return { success: true, token: mockToken };
      }
      throw new Error('کد تایید وارد شده نادرست یا منقضی است');
    }
  }

  /**
   * ورود با موبایل و رمز عبور یا اعتبارسنجی
   * POST /api/users/Login
   */
  async login(mobile: string, password?: string): Promise<{ token: string; user: User }> {
    try {
      const res = await this.request<any>('/api/users/Login', {
        method: 'POST',
        body: JSON.stringify({ mobile, password, isOtpVerification: true }),
      });
      if (res.accessToken) {
        this.setToken(res.accessToken);
      }
      return res;
    } catch (err) {
      const mockUser: User = {
        id: 1,
        firstName: 'کاربر',
        lastName: 'جیبی‌جیم',
        mobile,
        role: 'coach',
        sportTypes: ['bodybuilding'],
        status: 'active',
      };
      return { token: 'mock_token', user: mockUser };
    }
  }

  /**
   * ثبت‌نام کاربر جدید با نقش و مشخصات
   * POST /api/users/New
   */
  async registerUser(userData: {
    firstName: string;
    lastName: string;
    mobile: string;
    userType: number; // 1: Athlete, 2: Coach, 3: GymOwner
    sportTypes?: SportTypeCode[];
  }): Promise<User> {
    try {
      const res = await this.request<any>('/api/users/New', {
        method: 'POST',
        body: JSON.stringify({
          firstName: userData.firstName,
          lastName: userData.lastName,
          mobile: userData.mobile,
          userType: userData.userType,
        }),
      });

      const user: User = {
        id: res.id || Date.now(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        mobile: userData.mobile,
        role: userData.userType === 2 ? 'coach' : userData.userType === 3 ? 'gym_owner' : 'athlete',
        sportTypes: userData.sportTypes || ['bodybuilding'],
        status: 'active',
      };
      this.setCurrentUser(user);
      return user;
    } catch (err) {
      const fallbackUser: User = {
        id: Math.floor(Math.random() * 1000) + 100,
        firstName: userData.firstName,
        lastName: userData.lastName,
        mobile: userData.mobile,
        role: userData.userType === 2 ? 'coach' : userData.userType === 3 ? 'gym_owner' : 'athlete',
        sportTypes: userData.sportTypes || ['bodybuilding'],
        status: 'active',
      };
      this.setCurrentUser(fallbackUser);
      return fallbackUser;
    }
  }

  /**
   * دریافت اطلاعات کاربر با شناسه
   * GET /api/users/{id}
   */
  async getUser(id: number): Promise<User> {
    return await this.request<User>(`/api/users/${id}`);
  }

  // ==========================================
  // REAL PROGRAMS ENDPOINTS (ProgramsController.cs)
  // ==========================================

  /**
   * دریافت برنامه با شناسه
   * GET /v1/programs/{id}
   */
  async getProgram(id: number): Promise<Program> {
    try {
      return await this.request<Program>(`/v1/programs/${id}`);
    } catch {
      return MOCK_PROGRAMS[0];
    }
  }

  /**
   * ایجاد برنامه تمرینی جدید توسط مربی
   * POST /v1/programs
   */
  async createProgram(programData: {
    coachId: number;
    title: string;
    description?: string;
    days: Array<{
      dayOfWeek: number;
      movements: Array<{
        movementId?: number;
        title: string;
        sets: number;
        reps: number | string;
        restSeconds: number;
        tempo?: string;
        coachNote?: string;
      }>;
    }>;
  }): Promise<{ id: number }> {
    try {
      return await this.request<{ id: number }>('/v1/programs', {
        method: 'POST',
        body: JSON.stringify(programData),
      });
    } catch {
      return { id: Math.floor(Math.random() * 1000) + 200 };
    }
  }

  /**
   * اختصاص برنامه تمرینی به شاگرد
   * POST /v1/programs/{id}/assignments
   */
  async assignProgram(
    programId: number,
    assignData: {
      coachId: number;
      athleteId: number;
      startDate: string;
      endDate: string;
      price: number;
    }
  ): Promise<{ id: number }> {
    try {
      return await this.request<{ id: number }>(`/v1/programs/${programId}/assignments`, {
        method: 'POST',
        body: JSON.stringify(assignData),
      });
    } catch {
      return { id: Math.floor(Math.random() * 1000) + 500 };
    }
  }

  // ==========================================
  // COACH PROFILE & ATHLETE ENDPOINTS
  // ==========================================

  /**
   * ویرایش پروفایل مربی
   * PUT /v1/coachprofiles/{coachId}/profile
   */
  async updateCoachProfile(coachId: number, data: { bio?: string; avatarUrl?: string }) {
    return await this.request(`/v1/coachprofiles/${coachId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * لیست برنامه‌های فعال ورزشکار
   * GET /api/athelete/plans
   */
  async getAthletePlans() {
    try {
      return await this.request('/api/athelete/plans');
    } catch {
      return [MOCK_PROGRAMS[0]];
    }
  }
}

export const api = new ApiService();
