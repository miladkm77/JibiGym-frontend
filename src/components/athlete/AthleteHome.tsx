import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassBadge } from '../common/GlassBadge';
import { CURRENT_ATHLETE, MOCK_ASSIGNMENT } from '../../data/mockData';
import { Play, Dumbbell, Calendar, Clock, CreditCard, ChevronLeft, ShieldCheck, Flame } from 'lucide-react';

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
  const [athlete] = useState(CURRENT_ATHLETE);
  const [assignment] = useState(MOCK_ASSIGNMENT);
  const [isPaid, setIsPaid] = useState(true);

  // Today's workout is Day 1
  const todayWorkout = assignment.program.days[0];

  return (
    <div className="space-y-6 pb-24 text-right">
      {/* Top Athlete Header Banner */}
      <GlassCard className="p-5" variant="highlight">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-[2px] shadow-glass-glow">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=60"
                alt={athlete.firstName}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-white">
                  سلام، {athlete.firstName} عزیز 👋
                </h1>
                <GlassBadge variant="emerald" size="sm">
                  ورزشکار
                </GlassBadge>
              </div>
              <p className="text-xs text-slate-300 mt-1">هدف: {athlete.goal}</p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400">وزن فعلی:</span>
            <span className="text-sm font-bold font-mono text-emerald-400">{athlete.weightKg} کیلوگرم</span>
          </div>
        </div>
      </GlassCard>

      {/* Coach Info Card */}
      <GlassCard className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl overflow-hidden border border-white/10 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&auto=format&fit=crop&q=60"
              alt="مربی شما"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400">مربی اختصاصی شما:</span>
              <span className="text-xs font-bold text-white">{athlete.activeCoach?.name}</span>
            </div>
            <p className="text-[11px] text-emerald-400 mt-0.5">{athlete.activeCoach?.sportType}</p>
          </div>
        </div>

        <GlassButton variant="glass" size="sm" onClick={onOpenCoachLinkModal}>
          تغییر مربی
        </GlassButton>
      </GlassCard>

      {/* Payment Alert if not paid */}
      {!isPaid && (
        <GlassCard className="p-4 border-orange-500/40 bg-orange-500/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">شهریه این دوره تمرینی پرداخت نشده است</h4>
              <p className="text-[11px] text-orange-200 mt-0.5">
                مبلغ: {assignment.price.toLocaleString('fa-IR')} تومان (درگاه یا کارت‌به‌کارت)
              </p>
            </div>
          </div>
          <GlassButton variant="primary" size="sm" onClick={onOpenPayment}>
            پرداخت
          </GlassButton>
        </GlassCard>
      )}

      {/* TODAY'S WORKOUT HERO CARD */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            برنامه تمرین امروز شما
          </h2>
          <span className="text-xs text-slate-400">جلسه اول این هفته</span>
        </div>

        <GlassCard className="p-5 relative overflow-hidden" variant="highlight">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <GlassBadge variant="cyan" size="sm" className="mb-1.5">
                  روز ۱ از ۴
                </GlassBadge>
                <h3 className="text-lg font-black text-white">{todayWorkout.title}</h3>
                <p className="text-xs text-slate-300 mt-1">
                  تمرین شامل {todayWorkout.movements.length} حرکت اصلی هایپرتروفی و مقاومتی
                </p>
              </div>

              <div className="text-left font-mono">
                <span className="text-xs text-slate-400 block">مدت تخمینی</span>
                <span className="text-sm font-bold text-emerald-400">۵۵ دقیقه</span>
              </div>
            </div>

            {/* Quick Preview of Movements */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              {todayWorkout.movements.map((m, i) => (
                <div key={m.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-black/30">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-mono text-emerald-400">
                      {i + 1}
                    </span>
                    <span className="font-bold text-white">{m.movement.title}</span>
                  </div>
                  <span className="font-mono text-slate-400">
                    {m.sets} ست × {m.reps} تکرار
                  </span>
                </div>
              ))}
            </div>

            {/* Start Workout CTA Button */}
            <GlassButton
              variant="primary"
              size="lg"
              fullWidth
              onClick={onStartWorkout}
              icon={<Play className="w-5 h-5 fill-black" />}
            >
              شروع تمرین امروز با راهنما و تایمر
            </GlassButton>
          </div>
        </GlassCard>
      </div>

      {/* Week Schedule Overview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">برنامه کامل دوره جاری</h2>
          <span className="text-xs text-slate-400 font-mono">پایان دوره: {assignment.endDate}</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {assignment.program.days.map((day) => (
            <GlassCard key={day.id} className="p-3.5 text-right">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-emerald-400 font-bold">روز {day.dayIndex}</span>
                <span className="text-[10px] text-slate-500 font-mono">{day.movements.length} حرکت</span>
              </div>
              <h4 className="text-xs font-bold text-white line-clamp-1">{day.title}</h4>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};
