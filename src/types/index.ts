export type UserRole = 'athlete' | 'coach' | 'admin' | 'gym_owner';

export type SportTypeCode = 'bodybuilding' | 'calisthenics' | 'crossfit' | 'powerlifting' | 'fitness';

export interface SportType {
  id: number;
  code: SportTypeCode;
  titleFa: string;
  titleEn: string;
  description?: string;
  icon?: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  mobile: string;
  role: UserRole;
  avatarUrl?: string;
  username?: string;
  bio?: string;
  sportTypes: SportTypeCode[];
  status: 'active' | 'pending' | 'blocked';
  city?: string;
}

export interface CoachProfile extends User {
  inviteCode: string;
  defaultPrice?: number;
  acceptsCardToCard: boolean;
  cardNumber?: string;
  cardHolderName?: string;
  sheba?: string;
  activeAthletesCount: number;
  rating?: number;
  gyms?: string[];
}

export interface AthleteProfile extends User {
  heightCm?: number;
  weightKg?: number;
  birthDate?: string;
  goal?: string;
  injuriesText?: string;
  activeCoach?: {
    id: number;
    name: string;
    avatarUrl?: string;
    sportType: string;
  };
}

export interface Gym {
  id: number;
  name: string;
  address: string;
  city?: string;
  cityId?: number;
  avatarUrl?: string;
  isVerified: boolean;
  coachesCount?: number;
  activeAthletesCount?: number;
  activeCoachesCount?: number;
  equipmentList?: string[];
  equipments?: Array<{
    id: number;
    name: string;
    category?: string;
    status: string;
    condition?: string;
  }>;
}

export interface Movement {
  id: number;
  title: string;
  titleEn?: string;
  muscleGroup: string | string[];
  muscleGroupId?: number;
  equipment?: string;
  equipmentId?: number;
  description?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  animationType?: string;
  sportType?: SportTypeCode | string;
  scope?: 'global' | 'coach_private' | number;
  reviewState?: 'none' | 'submitted_for_review' | 'approved' | 'rejected' | string;
  ownerCoachId?: number;
  status?: number;
}

export interface ProgramMovement {
  id: number;
  movementId: number;
  movement: Movement;
  sortOrder: number;
  sets: number;
  reps: string | number; // e.g., "12-10-8" or 10
  restSeconds: number;
  tempo?: string;
  supersetGroup?: number;
  coachNote?: string;
  setType?: string;
  isCompleted?: boolean;
}

export interface ProgramDay {
  id?: number;
  dayIndex: number;
  dayOfWeek?: number;
  title?: string;
  movements: ProgramMovement[];
}

export interface Program {
  id: number;
  coachId: number;
  coachName?: string;
  title: string;
  description?: string;
  daysPerWeek?: number;
  isTemplate?: boolean;
  sportType?: SportTypeCode | string;
  notes?: string;
  days: ProgramDay[];
}

export interface Assignment {
  id: number;
  programId: number;
  program: Program;
  linkId?: number;
  athleteId: number;
  athleteName: string;
  athleteAvatar?: string;
  coachId: number;
  coachName: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'pending_payment' | 'expired' | 'archived' | 'revoked' | string;
  accessMode?: 'pay_first' | 'trust_immediate' | number;
  price: number; // in Tomans
}

export interface PaymentReceipt {
  id: number;
  assignmentId: number;
  athleteId: number;
  athleteName: string;
  coachId: number;
  amount: number;
  method: 'gateway' | 'card_to_card';
  status: 'pending' | 'confirmed' | 'rejected' | 'paid' | 'failed';
  receiptUrl?: string;
  createdAt: string;
  reviewNote?: string;
}

export interface CoachAthleteLink {
  id: number;
  coachId: number;
  athleteId: number;
  athleteName: string;
  athleteAvatar?: string;
  method: 'invite_code' | 'coach_initiated' | 'otp' | 'qr';
  initiatedBy: 'coach' | 'athlete';
  status: 'pending' | 'active' | 'rejected' | 'auto_cancelled' | 'ended';
  requestedAt: string;
  respondedAt?: string;
}
