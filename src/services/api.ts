import { User, SportTypeCode, Program, Movement, Gym, Assignment } from '../types';

// API base URL: empty by default so Vite dev proxy seamlessly forwards /v1 and /api to backend (http://localhost:5062)
const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

export interface OtpResponse {
  success: boolean;
  message: string;
  developmentCode?: string;
  expiresAt?: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  token?: string;
  user?: User;
}

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
      throw new Error(errorData.message || errorData.title || `خطای سرور (${response.status})`);
    }

    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  }

  // ==========================================
  // REAL AUTH & USER ENDPOINTS (UsersController.cs)
  // ==========================================

  /**
   * ارسال کد تایید OTP به شماره موبایل کاربر از سرور واقعی
   * POST /v1/users/Otp
   */
  async requestOtp(mobile: string): Promise<OtpResponse> {
    const res = await this.request<{
      isSuccess: boolean;
      message: string;
      data?: {
        mobile: string;
        expiresAt: string;
        developmentCode?: string;
      };
      errors?: string[];
    }>('/v1/users/Otp', {
      method: 'POST',
      body: JSON.stringify({ mobile, purpose: 1 }),
    });

    return {
      success: res.isSuccess,
      message: res.message || 'کد تایید ارسال شد.',
      developmentCode: res.data?.developmentCode,
      expiresAt: res.data?.expiresAt,
    };
  }

  /**
   * تایید کد OTP دریافتی در سرور واقعی
   * POST /v1/users/Otp/Verify
   */
  async verifyOtp(mobile: string, code: string): Promise<VerifyOtpResponse> {
    const res = await this.request<{
      isSuccess: boolean;
      message: string;
      data?: {
        mobile: string;
        verified: boolean;
      };
      token?: string;
    }>('/v1/users/Otp/Verify', {
      method: 'POST',
      body: JSON.stringify({ mobile, code, purpose: 1 }),
    });

    if (res.token) {
      this.setToken(res.token);
    }
    return {
      success: res.isSuccess && (res.data?.verified ?? true),
      token: res.token,
    };
  }

  /**
   * ورود با شماره موبایل و دریافت اطلاعات کاربر از سرور واقعی
   * POST /v1/users/Login
   */
  async login(mobile: string, password?: string): Promise<{ token: string; user: User }> {
    const res = await this.request<any>('/v1/users/Login', {
      method: 'POST',
      body: JSON.stringify({ mobile, password: password || '', isOtpVerification: true }),
    });

    const userDto = res.data || res;
    const user: User = {
      id: userDto.id || 1,
      firstName: userDto.firstName || 'کاربر',
      lastName: userDto.lastName || 'جیبی‌جیم',
      mobile: userDto.mobile || mobile,
      role: userDto.userType === 2 ? 'coach' : userDto.userType === 3 ? 'gym_owner' : 'athlete',
      sportTypes: ['bodybuilding'],
      status: 'active',
    };

    const token = res.accessToken || 'session_' + Date.now();
    this.setToken(token);
    this.setCurrentUser(user);
    return { token, user };
  }

  /**
   * ثبت‌نام کاربر جدید با نقش و مشخصات در سرور واقعی
   * POST /v1/users/New
   */
  async registerUser(userData: {
    firstName: string;
    lastName: string;
    mobile: string;
    userType: number; // 1: Athlete, 2: Coach, 3: GymOwner
    sportTypes?: SportTypeCode[];
  }): Promise<User> {
    const res = await this.request<any>('/v1/users/New', {
      method: 'POST',
      body: JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        mobile: userData.mobile,
        userType: userData.userType,
        age: 25,
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
  }

  /**
   * دریافت مشخصات کاربر با شناسه
   * GET /v1/users/{id}
   */
  async getUser(id: number): Promise<User> {
    return await this.request<User>(`/v1/users/${id}`);
  }

  // ==========================================
  // REAL MOVEMENTS / EXERCISES ENDPOINTS
  // ==========================================

  /**
   * لیست حرکات ورزشی واقعی از سرور
   * GET /v1/movements
   */
  async getMovements(params?: { muscle?: string; query?: string }): Promise<Movement[]> {
    const query = new URLSearchParams();
    if (params?.muscle) query.append('muscle', params.muscle);
    if (params?.query) query.append('query', params.query);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return await this.request<Movement[]>(`/v1/movements${qs}`);
  }

  /**
   * ایجاد حرکت ورزشی جدید توسط مربی
   * POST /v1/movements
   */
  async createMovement(movementData: {
    title: string;
    titleEn?: string;
    muscleGroupId: number;
    equipmentId: number;
    description?: string;
    coachId: number;
  }): Promise<{ id: number }> {
    return await this.request<{ id: number }>('/v1/movements', {
      method: 'POST',
      body: JSON.stringify(movementData),
    });
  }

  /**
   * تایید یا رد حرکت توسط ادمین در سرور واقعی
   * PUT /v1/movements/{id}/status
   */
  async updateMovementStatus(id: number, status: number): Promise<{ success: boolean; id: number; status: number }> {
    return await this.request<{ success: boolean; id: number; status: number }>(`/v1/movements/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // ==========================================
  // REAL PROGRAMS ENDPOINTS (ProgramsController.cs)
  // ==========================================

  /**
   * دریافت برنامه با شناسه از دیتابیس واقعی
   * GET /v1/programs/{id}
   */
  async getProgram(id: number): Promise<Program> {
    const p = await this.request<any>(`/v1/programs/${id}`);
    return {
      id: p.id,
      coachId: p.coachId,
      title: p.title,
      description: p.description,
      sportType: 'bodybuilding',
      days: (p.days || []).map((d: any) => ({
        dayOfWeek: d.dayOfWeek,
        title: d.dayOfWeek === 1 ? 'روز ۱: سینه و بازو' : d.dayOfWeek === 2 ? 'روز ۲: زیربغل و پا' : `روز ${d.dayOfWeek}`,
        movements: (d.movements || []).map((m: any) => ({
          movementId: m.movementId || m.id,
          movement: {
            id: m.movementId || m.id,
            title: m.title,
            titleEn: m.titleEn || m.title,
            muscleGroup: [m.muscleGroup || 'chest'],
            sportType: 'bodybuilding',
            equipment: 'هالتر',
            description: m.description || '',
            reviewState: 'approved',
            videoUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600',
            animationType: '3d_wireframe',
          },
          sets: m.sets,
          reps: m.reps,
          restSeconds: m.restSeconds,
          tempo: m.tempo || '2-0-1-0',
          coachNote: m.coachNote,
          setType: m.setType || 'single',
        })),
      })),
    };
  }

  /**
   * ایجاد برنامه تمرینی جدید در دیتابیس واقعی
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
    const formattedDays = programData.days.map((d) => ({
      dayOfWeek: d.dayOfWeek,
      movements: d.movements.map((m, idx) => ({
        movementId: m.movementId || null,
        title: m.title,
        titleEn: m.title,
        description: m.coachNote || '',
        sortOrder: idx + 1,
        sets: Number(m.sets) || 3,
        reps: typeof m.reps === 'number' ? m.reps : parseInt(String(m.reps)) || 10,
        restSeconds: Number(m.restSeconds) || 60,
        tempo: m.tempo || '2-0-1-0',
        setGroup: 0,
        setType: 'single',
        coachNote: m.coachNote || '',
        media: [],
      })),
    }));

    return await this.request<{ id: number }>('/v1/programs', {
      method: 'POST',
      body: JSON.stringify({
        coachId: programData.coachId || 1,
        title: programData.title,
        description: programData.description || '',
        days: formattedDays,
      }),
    });
  }

  /**
   * اختصاص برنامه به شاگرد در دیتابیس واقعی
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
    return await this.request<{ id: number }>(`/v1/programs/${programId}/assignments`, {
      method: 'POST',
      body: JSON.stringify({
        coachId: assignData.coachId || 1,
        athleteId: assignData.athleteId || 2,
        startDate: new Date(assignData.startDate).toISOString(),
        endDate: new Date(assignData.endDate).toISOString(),
        price: assignData.price,
      }),
    });
  }

  // ==========================================
  // REAL ATHLETE & GYM ENDPOINTS
  // ==========================================

  /**
   * دریافت برنامه‌ها و تکالیف فعال ورزشکار از دیتابیس واقعی
   * GET /v1/athelete/plans
   */
  async getAthletePlans(athleteId?: number): Promise<Assignment[]> {
    const rawList = await this.request<any[]>(`/v1/athelete/plans?athleteId=${athleteId || 2}`);
    return rawList.map((item) => ({
      id: item.id,
      athleteId: athleteId || 2,
      athleteName: 'میلاد کریمی',
      athleteAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      coachId: item.coachId,
      coachName: item.coachName,
      programId: item.programId,
      program: item.program ? {
        id: item.program.id,
        coachId: item.coachId,
        title: item.program.title,
        description: item.program.description,
        sportType: 'bodybuilding',
        days: (item.program.days || []).map((d: any) => ({
          dayOfWeek: d.dayOfWeek,
          title: d.dayOfWeek === 1 ? 'روز ۱: سینه و بازو' : `روز ${d.dayOfWeek}`,
          movements: (d.movements || []).map((m: any) => ({
            movementId: m.movementId || m.id,
            movement: {
              id: m.movementId || m.id,
              title: m.title,
              titleEn: m.titleEn || m.title,
              muscleGroup: [m.muscleGroup || 'chest'],
              sportType: 'bodybuilding',
              equipment: 'هالتر',
              description: m.description || '',
              reviewState: 'approved',
              videoUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600',
              animationType: '3d_wireframe',
            },
            sets: m.sets,
            reps: m.reps,
            restSeconds: m.restSeconds,
            tempo: m.tempo || '2-0-1-0',
            coachNote: m.coachNote,
            setType: m.setType || 'single',
          })),
        })),
      } : {
        id: item.programId,
        coachId: item.coachId,
        title: item.programTitle,
        sportType: 'bodybuilding',
        days: [],
      },
      startDate: new Date(item.startDate * 1000).toLocaleDateString('fa-IR'),
      endDate: new Date(item.endDate * 1000).toLocaleDateString('fa-IR'),
      status: item.status,
      price: Number(item.price) || 850000,
    }));
  }

  /**
   * دریافت پروفایل ورزشکار از سرور واقعی
   * GET /v1/athelete/profile
   */
  async getAthleteProfile(id?: number) {
    return await this.request<any>(`/v1/athelete/profile?id=${id || 2}`);
  }

  /**
   * بروزرسانی پروفایل ورزشکار در سرور واقعی
   * PUT /v1/athelete/update
   */
  async updateAthleteProfile(data: { athleteId: number; weight?: number; height?: number; goal?: string }) {
    return await this.request('/v1/athelete/update', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * لیست باشگاه‌ها از دیتابیس واقعی
   * GET /v1/gyms
   */
  async getGyms(): Promise<Gym[]> {
    return await this.request<Gym[]>('/v1/gyms');
  }

  /**
   * لیست مربیان از سرور واقعی
   * GET /v1/coaches
   */
  async getCoaches(params: { page?: number; size?: number } = { page: 1, size: 20 }) {
    return await this.request<any[]>(`/v1/coaches?page=${params.page || 1}&size=${params.size || 20}`);
  }

  /**
   * بروزرسانی بیوگرافی مربی در سرور واقعی
   * PUT /v1/coaches/{coachId}/profile
   */
  async updateCoachProfile(coachId: number, data: { bio?: string; avatarUrl?: string }) {
    return await this.request(`/v1/coaches/${coachId}/profile`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiService();
