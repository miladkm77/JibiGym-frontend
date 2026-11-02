import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassBadge } from '../common/GlassBadge';
import { MOCK_MOVEMENTS } from '../../data/mockData';
import { Shield, Users, Check, X, AlertTriangle, Video, BarChart3, Building2, Dumbbell } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  // Pending exercise reviews
  const [reviewMovements, setReviewMovements] = useState(
    MOCK_MOVEMENTS.filter((m) => m.reviewState === 'submitted_for_review')
  );

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleApproveExercise = (id: number, title: string) => {
    setReviewMovements((prev) => prev.filter((m) => m.id !== id));
    showToast(`حرکت «${title}» با موفقیت تأیید و به کتابخانه عمومی اضافه شد.`);
  };

  const handleRejectExercise = (id: number, title: string) => {
    setReviewMovements((prev) => prev.filter((m) => m.id !== id));
    showToast(`حرکت «${title}» رد شد و به مربی اطلاع‌رسانی گردید.`);
  };

  return (
    <div className="space-y-6 pb-24 text-right">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 py-2.5 px-5 rounded-2xl liquid-glass border border-emerald-400 text-emerald-300 text-xs font-medium shadow-2xl flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Banner */}
      <GlassCard className="p-5" variant="highlight">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black text-white">داشبورد ادمین و مدیریت پلتفرم</h1>
              <GlassBadge variant="purple" size="sm">
                سوپر ادمین
              </GlassBadge>
            </div>
            <p className="text-xs text-slate-300 mt-1">نظارت بر کیفیت حرکات ورزشی، تراکنش‌ها و کاربران پلتفرم جیبی‌جیم</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
            <Shield className="w-6 h-6" />
          </div>
        </div>
      </GlassCard>

      {/* System Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <GlassCard className="p-4 text-right">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">مربیان ثبت‌شده</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-xl font-black text-white font-mono">۱۲۴</div>
          <span className="text-[10px] text-cyan-300">۱۴ درخواست در انتظار احراز</span>
        </GlassCard>

        <GlassCard className="p-4 text-right">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">ورزشکاران فعال</span>
            <Dumbbell className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-white font-mono">۱,۸۵۰</div>
          <span className="text-[10px] text-emerald-400">رشد ۱۸٪ نسبت به ماه گذشته</span>
        </GlassCard>

        <GlassCard className="p-4 text-right">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">باشگاه‌های همکار</span>
            <Building2 className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-xl font-black text-white font-mono">۴۲</div>
          <span className="text-[10px] text-slate-400">در سراسر تهران و مراکز استان</span>
        </GlassCard>

        <GlassCard className="p-4 text-right">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium">نرخ موفقیت درگاه</span>
            <BarChart3 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-xl font-black text-white font-mono">۹۸.۴٪</div>
          <span className="text-[10px] text-purple-300">زرین‌پال / بدون تراکنش معلق</span>
        </GlassCard>
      </div>

      {/* Exercise Review Queue (UC-10) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            صف بررسی و تأیید حرکات پیشنهادی مربیان ({reviewMovements.length})
          </h2>
          <span className="text-xs text-cyan-400">ارتقا به کتابخانه عمومی</span>
        </div>

        {reviewMovements.length === 0 ? (
          <GlassCard className="p-6 text-center">
            <Check className="w-8 h-8 mx-auto text-emerald-400 mb-2" />
            <p className="text-sm text-slate-300 font-bold">تمام حرکات ارسالی بررسی شده‌اند</p>
            <p className="text-xs text-slate-500 mt-1">حرکت جدیدی در صف انتظار نیست</p>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {reviewMovements.map((movement) => (
              <GlassCard key={movement.id} className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                      {movement.thumbnailUrl ? (
                        <img src={movement.thumbnailUrl} alt={movement.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                          <Video className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white">{movement.title}</h4>
                        <GlassBadge variant="cyan" size="sm">
                          {movement.muscleGroup}
                        </GlassBadge>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{movement.description}</p>
                      <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                        پیشنهاد شده توسط مربی: استاد علی رضایی
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <GlassButton
                      variant="danger"
                      size="sm"
                      onClick={() => handleRejectExercise(movement.id, movement.title)}
                      icon={<X className="w-3.5 h-3.5" />}
                    >
                      رد با یادداشت
                    </GlassButton>
                    <GlassButton
                      variant="primary"
                      size="sm"
                      onClick={() => handleApproveExercise(movement.id, movement.title)}
                      icon={<Check className="w-3.5 h-3.5" />}
                    >
                      تأیید و انتشار عمومی
                    </GlassButton>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* User Moderation Section (UC-24) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">کاربران اخیر پلتفرم و وضعیت دسترسی</h2>
          <span className="text-xs text-slate-400">مدیریت کاربران (UC-24)</span>
        </div>

        <GlassCard className="p-4 divide-y divide-white/10">
          <div className="py-2.5 flex items-center justify-between first:pt-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                ع‌ر
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">علی رضایی (مربی ارشد)</h4>
                <span className="text-[10px] text-slate-400 font-mono">09121234567 • ۱۸ شاگرد فعال</span>
              </div>
            </div>
            <GlassBadge variant="emerald" size="sm" dot>
              فعال
            </GlassBadge>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                م‌یا
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">محمدجواد یزدانی (ورزشکار)</h4>
                <span className="text-[10px] text-slate-400 font-mono">09351234567 • متصل به علی رضایی</span>
              </div>
            </div>
            <GlassBadge variant="emerald" size="sm" dot>
              فعال
            </GlassBadge>
          </div>

          <div className="py-2.5 flex items-center justify-between last:pb-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">
                ک‌م
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">کاربر مشکوک (مربی نامعتبر)</h4>
                <span className="text-[10px] text-slate-400 font-mono">09990001122 • نقض قوانین</span>
              </div>
            </div>
            <GlassBadge variant="orange" size="sm">
              مسدود موقت
            </GlassBadge>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
