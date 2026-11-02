import { SportType, Movement, Program, CoachProfile, AthleteProfile, Assignment, PaymentReceipt, CoachAthleteLink, Gym } from '../types';

export const SPORT_TYPES: SportType[] = [
  {
    id: 1,
    code: 'bodybuilding',
    titleFa: 'بدنسازی و هایپرتروفی',
    titleEn: 'Bodybuilding',
    description: 'تمرکز بر هایپرتروفی عضلانی، حجم‌گیری و تفکیک با وزنه‌های آزاد و دستگاه‌ها'
  },
  {
    id: 2,
    code: 'calisthenics',
    titleFa: 'کالیستنیکس و وزن بدن',
    titleEn: 'Calisthenics',
    description: 'مهارت‌های تعادلی و قدرتی با وزن بدن (ماسل‌آپ، پلانچ، لور، هنداستند)'
  },
  {
    id: 3,
    code: 'crossfit',
    titleFa: 'کراسفیت و فانکشنال',
    titleEn: 'CrossFit',
    description: 'تمرینات ترکیبی پرفشار WOD شامل وزنه‌برداری، ژیمناستیک و هوازی شدید'
  },
  {
    id: 4,
    code: 'powerlifting',
    titleFa: 'پاورلیفتینگ و قدرت محض',
    titleEn: 'Powerlifting',
    description: 'توسعه حداکثر رکورد ۱RM در سه حرکت اصلی اسکات، پرس سینه و ددلیفت'
  }
];

export const MOCK_MOVEMENTS: Movement[] = [
  {
    id: 1,
    title: 'پرس سینه هالتر روی نیمکت',
    titleEn: 'Barbell Bench Press',
    muscleGroup: 'سینه (پکتورالیس)',
    equipment: 'هالتر و نیمکت پرس',
    description: 'کمر قوس طبیعی، کف پاها محکم روی زمین، هالتر تا روی خط میانی سینه پایین آمده و با انقباض پرقدرت بالا می‌رود.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-training-with-a-barbell-in-a-gym-44167-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&auto=format&fit=crop&q=60',
    scope: 'global'
  },
  {
    id: 2,
    title: 'اسکات پا هالتر از پشت',
    titleEn: 'Barbell Back Squat',
    muscleGroup: 'چهارسر ران و باسن',
    equipment: 'رک اسکات و هالتر',
    description: 'پاها به اندازه عرض شانه، سینه بالا، نشست تا موازی شدن ران با زمین، پرتاب لگن با فشار از پاشنه پا.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-doing-squats-with-a-barbell-in-the-gym-44158-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop&q=60',
    scope: 'global'
  },
  {
    id: 3,
    title: 'ماسل‌آپ بارفیکس (کالیستنیکس)',
    titleEn: 'Bar Pull-up Muscle Up',
    muscleGroup: 'زیربغل، کول، پشت‌بازو',
    equipment: 'میله بارفیکس',
    description: 'شروع با آویزان شدن کامل، انفجار دینامیک رو به بالا، انتقال مچ‌ها به روی میله و دیپ پایانی.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-training-calisthenics-outdoors-44162-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=60',
    scope: 'global'
  },
  {
    id: 4,
    title: 'اسنچ (یک‌ضرب کراسفیت)',
    titleEn: 'CrossFit Barbell Snatch',
    muscleGroup: 'کل بدن (Full Body)',
    equipment: 'هالتر و پلیت بامپر',
    description: 'انتقال پیوسته هالتر از زمین تا بالای سر در یک حرکت انفجاری با نشست سریع زیر وزنه.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-man-exercising-with-weights-at-the-gym-44165-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60',
    scope: 'global'
  },
  {
    id: 5,
    title: 'ددلیفت سنگین سومو',
    titleEn: 'Sumo Deadlift',
    muscleGroup: 'همسترینگ، سرینی و فیله',
    equipment: 'هالتر و مگنزیا',
    description: 'پاهای باز متمایل به بیرون، ستون فقرات خنثی، لیفت مقتدر با فشار پاشنه‌ها و قفل باسن در بالا.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-powerlifter-performing-a-heavy-deadlift-44170-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60',
    scope: 'global'
  },
  {
    id: 6,
    title: 'پلانچ استرادل روی پارالت',
    titleEn: 'Straddle Planche',
    muscleGroup: 'دلتوئید قدامی، عضلات مرکزی کور',
    equipment: 'پارالت چوبی',
    description: 'قفل آرنج‌ها، پروتراکشن شدید کتف، تعلیق پاها بدون تماس با زمین در راستای افق.',
    videoUrl: '',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=60',
    scope: 'coach_private',
    reviewState: 'submitted_for_review'
  }
];

export const MOCK_PROGRAMS: Program[] = [
  {
    id: 101,
    coachId: 1,
    coachName: 'استاد علی رضایی',
    title: 'دوره افزایش حجم عضلانی و هایپرتروفی (۴ روزه)',
    daysPerWeek: 4,
    isTemplate: true,
    notes: 'تمرکز روی اضافه بار تدریجی (Progressive Overload) و استراحت کافی بین ست‌های سنگین.',
    days: [
      {
        id: 1,
        dayIndex: 1,
        title: 'روز ۱: سینه و جلو‌بازو (قدرتی-هایپرتروفی)',
        movements: [
          {
            id: 11,
            movementId: 1,
            movement: MOCK_MOVEMENTS[0],
            sortOrder: 1,
            sets: 4,
            reps: '10-8-6-4',
            restSeconds: 90,
            tempo: '3-0-1',
            coachNote: 'ست آخر دراپ‌ست تا ناتوانی کامل'
          },
          {
            id: 12,
            movementId: 3,
            movement: MOCK_MOVEMENTS[2],
            sortOrder: 2,
            sets: 3,
            reps: '8-8-8',
            restSeconds: 60,
            coachNote: 'مکث ۱ ثانیه‌ای در اوج انقباض'
          }
        ]
      },
      {
        id: 2,
        dayIndex: 2,
        title: 'روز ۲: پا و عضلات دوقلو (چهارسر و ساق)',
        movements: [
          {
            id: 21,
            movementId: 2,
            movement: MOCK_MOVEMENTS[1],
            sortOrder: 1,
            sets: 5,
            reps: '12-10-8-6-6',
            restSeconds: 120,
            tempo: '2-1-1',
            coachNote: 'دامنه کامل، زانوها در راستای پنجه'
          }
        ]
      },
      {
        id: 3,
        dayIndex: 3,
        title: 'روز ۳: پشت، سرشانه و فیله کمر',
        movements: [
          {
            id: 31,
            movementId: 5,
            movement: MOCK_MOVEMENTS[4],
            sortOrder: 1,
            sets: 4,
            reps: '6-6-4-4',
            restSeconds: 150,
            tempo: '2-0-1',
            coachNote: 'تسمه لیفت مجاز است، کمربند الزامی'
          }
        ]
      },
      {
        id: 4,
        dayIndex: 4,
        title: 'روز ۴: کراسفیت و تهویه متابولیک (WOD)',
        movements: [
          {
            id: 41,
            movementId: 4,
            movement: MOCK_MOVEMENTS[3],
            sortOrder: 1,
            sets: 4,
            reps: '15 تکرار',
            restSeconds: 45,
            coachNote: 'زمان‌دار برای ثبت رکورد هفتگی'
          }
        ]
      }
    ]
  }
];

export const CURRENT_COACH: CoachProfile = {
  id: 1,
  firstName: 'علی',
  lastName: 'رضایی',
  mobile: '09121234567',
  role: 'coach',
  username: 'coach_rezaei',
  bio: 'مربی رسمی بدنسازی، فیتنس و کالیستنیکس پیشرفته با ۱۰ سال سابقه تمرین حرفه‌ای و مربیگری ملی',
  sportTypes: ['bodybuilding', 'calisthenics', 'powerlifting'],
  status: 'active',
  city: 'تهران',
  inviteCode: 'REZAEI-88',
  defaultPrice: 1200000, // 1,200,000 Tomans
  acceptsCardToCard: true,
  cardNumber: '6037-9975-1234-5678',
  cardHolderName: 'علی رضایی',
  activeAthletesCount: 18,
  rating: 4.9,
  gyms: ['باشگاه پایتخت (نیاوران)', 'آکادمی پاور هاوس']
};

export const CURRENT_ATHLETE: AthleteProfile = {
  id: 10,
  firstName: 'محمدجواد',
  lastName: 'یزدانی',
  mobile: '09351234567',
  role: 'athlete',
  username: 'mj_fit',
  bio: 'ورزشکار بدنسازی و کالیستنیکس، هدف: حجم خالص عضلانی و یادگیری ماسل‌آپ',
  sportTypes: ['bodybuilding', 'calisthenics'],
  status: 'active',
  city: 'تهران',
  heightCm: 182,
  weightKg: 83.5,
  birthDate: '1378/04/15',
  goal: 'افزایش توده بدون چربی و افزایش رکورد اسکات و پرس سینه',
  injuriesText: 'کمی درد در تاندون مچ دست چپ هنگام اکستنشن کامل',
  activeCoach: {
    id: 1,
    name: 'علی رضایی',
    avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&auto=format&fit=crop&q=60',
    sportType: 'بدنسازی و کالیستنیکس'
  }
};

export const MOCK_ASSIGNMENT: Assignment = {
  id: 501,
  programId: 101,
  program: MOCK_PROGRAMS[0],
  linkId: 12,
  athleteId: 10,
  athleteName: 'محمدجواد یزدانی',
  athleteAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=60',
  coachId: 1,
  coachName: 'علی رضایی',
  startDate: '1403/08/10',
  endDate: '1403/09/10',
  status: 'active',
  accessMode: 'trust_immediate',
  price: 1200000
};

export const MOCK_PENDING_LINKS: CoachAthleteLink[] = [
  {
    id: 201,
    coachId: 1,
    athleteId: 22,
    athleteName: 'امیرحسین کاظمی',
    athleteAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=60',
    method: 'invite_code',
    initiatedBy: 'athlete',
    status: 'pending',
    requestedAt: '۱۰ دقیقه پیش'
  },
  {
    id: 202,
    coachId: 1,
    athleteId: 23,
    athleteName: 'مهرداد سلیمی',
    athleteAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60',
    method: 'invite_code',
    initiatedBy: 'athlete',
    status: 'pending',
    requestedAt: 'دیروز'
  }
];

export const MOCK_RECEIPTS: PaymentReceipt[] = [
  {
    id: 301,
    assignmentId: 501,
    athleteId: 10,
    athleteName: 'محمدجواد یزدانی',
    coachId: 1,
    amount: 1200000,
    method: 'card_to_card',
    status: 'pending',
    receiptUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=60',
    createdAt: '۱ ساعت پیش',
    reviewNote: 'واریز به شماره کارت ۶۰۳۷... علی رضایی'
  }
];

export const MOCK_GYMS: Gym[] = [
  {
    id: 1,
    name: 'مجموعه ورزشی پایتخت (نیاوران)',
    city: 'تهران',
    address: 'خیابان باهنر (نیاوران)، بعد از سه‌راه یاسر، پلاک ۲۴',
    avatarUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60',
    isVerified: true,
    coachesCount: 8,
    equipmentList: ['دستگاه‌های هایپرتروفی ماتریکس', 'باکس اختصاصی کراسفیت', 'سازه‌های کالیستنیکس', 'میز فیزیوتراپی و ماساژ', 'استخر و سونا']
  },
  {
    id: 2,
    name: 'آکادمی پاور هاوس فیتنس',
    city: 'تهران',
    address: 'سعادت‌آباد، میدان کاج، بلوار سرو غربی، مجتمع ورزشی آریا',
    avatarUrl: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&auto=format&fit=crop&q=60',
    isVerified: true,
    coachesCount: 5,
    equipmentList: ['هالترهای استاندارد المپیک Eleiko', 'سکوی ددلیفت جذب ضربه', 'دمبل تا ۶۰ کیلوگرم']
  }
];
