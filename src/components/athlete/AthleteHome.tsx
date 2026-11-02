import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassBadge } from '../common/GlassBadge';
import { api } from '../../services/api';
import { Assignment } from '../../types';
import { Play, Dumbbell, Calendar, Clock, CreditCard, ChevronLeft, ShieldCheck, Flame, Loader2, AlertCircle } from 'lucide-react';

interface AthleteHomeProps {
  onStartWorkout: () => void;
  onOpenPayment: () => void;
  onOpenCoachLinkModal: () => void;
}

export const AthleteHome: React.FC<AthleteHomeProps> = ({
  onStartWorkout,
  onOpenPayment,
  onOpenCoachLinkModal,
}) => {
  const [profile, setProfile] = useState<any>({
    firstName: 'میلاد',
    lastName: 'کریمی',
    weight: 78,
    height: 182,
    goal: 'هایپرتروفی و ارتقای توان عضلانی',
  });
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(true);

  useEffect(() => {
    loadAthleteData();
  }, []);

  const loadAthleteData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [plansData, profileData] = await Promise.allSettled([
        api.getAthletePlans(2),
        api.getAthleteProfile(2),
      ]);

      if (profileData.status === 'fulfilled' && profileData.value) {
        setProfile(profileData.value);
      }

      if (plansData.status === 'fulfilled' && plansData.value.length > 0) {
        const activeAssign = plansData.value[0];
        setAssignment(activeAssign);
        setIsPaid(activeAssign.status === 'active');
      }
    } catch (err: any) {
      setError(err.message || 'خطا در برقراری ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  const todayWorkout = assignment?.program?.days?.[0];

  return (
    <div className="space-y-6 pb-24 text-right">
      {/* Top Athlete Header Banner */}
      <GlassCard className="p-5" variant="highlight">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-sky-400 p-[2px] shadow-md shadow-blue-500/20">
              <img
                src={profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt={profile.firstName}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-slate-900">
                  سلام، {profile.firstName} عزیز 👋
                </h1>
                <GlassBadge variant="blue" size="sm">
                  ورزشکار
                </GlassBadge>
              </div>
              <p className="text-xs text-slate-600 mt-1">هدف: {profile.goal}</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-500">وزن ثبت‌شده:</span>
            <span className="text-sm font-bold font-mono text-[#0066FF]">
              {profile.weight || 78} کیلوگرم
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Coach Info Card */}
      <GlassCard className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-200 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&auto=format&fit=crop&q=60"
              alt="مربی شما"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-500">مربی اختصاصی شما:</span>
              <span className="text-xs font-bold text-slate-900">
                {assignment?.coachName || 'محمدجواد محمدی'}
              </span>
            </div>
            <p className="text-[11px] text-[#0066FF] font-semibold mt-0.5">
              مربی رسمی بدنسازی، کالیستنیکس و کراس‌فیت
            </p>
          </div>
        </div>

        <GlassButton variant="glass" size="sm" onClick={onOpenCoachLinkModal}>
          تغییر مربی
        </GlassButton>
      </GlassCard>

      {/* Loading indicator */}
      {loading && (
        <div className="flex items-center justify-center py-12 gap-2 text-slate-500 text-sm">
          <Loader2 className="w-5 h-5 animate-spin text-[#0066FF]" />
          در حال دریافت برنامه تمرینی از سرور دیتابیس...
        </div>
      )}

      {error && (
        <GlassCard className="p-4 border-red-200 bg-red-50/50 flex items-center justify-between text-red-600 text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
          <GlassButton size="sm" onClick={loadAthleteData}>تلاش مجدد</GlassButton>
        </GlassCard>
      )}

      {/* Payment Alert if not paid */}
      {!loading && !isPaid && assignment && (
        <GlassCard className="p-4 border-orange-200 bg-orange-50/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">شهریه این دوره تمرینی پرداخت نشده است</h4>
              <p className="text-[11px] text-orange-700 mt-0.5">
                مبلغ: {assignment.price.toLocaleString('fa-IR')} تومان (درگاه یا کارت‌به‌کارت)
              </p>
            </div>
          </div>
          <GlassButton variant="primary" size="sm" onClick={onOpenPayment}>
            پرداخت
          </GlassButton>
        </GlassCard>
      )}

      {/* TODAY'S WORKOUT CARD */}
      {!loading && assignment && (
        <GlassCard className="p-5 overflow-hidden relative" variant="highlight">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-[#0066FF] flex items-center justify-center">
                <Flame className="w-4 h-4 fill-current" />
              </div>
              <span className="text-xs font-black text-[#0066FF] uppercase tracking-wider">
                جلسه تمرینی فعال امروز
              </span>
            </div>
            <GlassBadge variant="cyan" size="sm">
              {todayWorkout?.title || 'روز ۱: عضلات سینه و بازو'}
            </GlassBadge>
          </div>

          <h2 className="text-lg font-black text-slate-900 mb-1">
            {assignment.program?.title || 'برنامه تمرینی تخصصی'}
          </h2>
          <p className="text-xs text-slate-500 mb-4 line-clamp-2">
            {assignment.program?.description || 'برنامه اختصاصی شما ثبت‌شده در سرور'}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-5 text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">تعداد حرکات</span>
              <span className="font-bold text-slate-800 font-mono">
                {todayWorkout?.movements?.length || 3} حرکت
              </span>
            </div>
            <div className="border-x border-slate-200">
              <span className="text-[10px] text-slate-400 block">زمان تقریبی</span>
              <span className="font-bold text-[#0066FF] font-mono">۵۵ دقیقه</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">تاریخ پایان</span>
              <span className="font-bold text-slate-800 font-mono">{assignment.endDate}</span>
            </div>
          </div>

          {/* Big CTA Button */}
          <GlassButton
            variant="primary"
            size="lg"
            className="w-full justify-center shadow-lg shadow-blue-500/25"
            onClick={onStartWorkout}
            icon={<Play className="w-5 h-5 fill-current ml-1" />}
          >
            شروع تمرین امروز (ورود به پلیر هوشمند)
          </GlassButton>
        </GlassCard>
      )}

      {/* Exercises list in today's workout */}
      {!loading && todayWorkout && todayWorkout.movements?.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 text-[#0066FF]" />
              حرکات تمرینی امروز
            </h3>
            <span className="text-xs text-slate-400">
              {todayWorkout.movements.length} حرکت
            </span>
          </div>

          <div className="space-y-2">
            {todayWorkout.movements.map((pm, idx) => (
              <GlassCard key={pm.movementId || idx} className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-mono text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{pm.movement?.title}</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {pm.sets} ست × {pm.reps} تکرار | استراحت: {pm.restSeconds} ثانیه
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center">
                  <ChevronLeft className="w-4 h-4" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
