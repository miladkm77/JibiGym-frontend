import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassBadge } from '../common/GlassBadge';
import { api } from '../../services/api';
import { Movement } from '../../types';
import { Shield, Users, Check, X, AlertTriangle, Video, BarChart3, Building2, Dumbbell, Loader2 } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [reviewMovements, setReviewMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    loadReviewQueue();
  }, []);

  const loadReviewQueue = async () => {
    setLoading(true);
    try {
      const all = await api.getMovements();
      // Show movements under review or all for moderation
      setReviewMovements(all);
    } catch (err) {
      console.error('Failed to load review movements:', err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleApproveExercise = async (id: number, title: string) => {
    try {
      await api.updateMovementStatus(id, 2);
      setReviewMovements((prev) => prev.filter((m) => m.id !== id));
      showToast(`حرکت «${title}» با موفقیت در دیتابیس تأیید و فعال شد.`);
    } catch {
      showToast(`خطا در تأیید حرکت در سرور.`);
    }
  };

  const handleRejectExercise = async (id: number, title: string) => {
    try {
      await api.updateMovementStatus(id, 3);
      setReviewMovements((prev) => prev.filter((m) => m.id !== id));
      showToast(`حرکت «${title}» در سرور رد شد.`);
    } catch {
      showToast(`خطا در رد حرکت در سرور.`);
    }
  };

  return (
    <div className="space-y-6 pb-24 text-right">
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 py-2.5 px-5 rounded-2xl bg-white border border-blue-500 text-blue-700 text-xs font-bold shadow-2xl flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#0066FF]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Banner */}
      <GlassCard className="p-5" variant="highlight">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black text-slate-900">داشبورد ادمین و مدیریت پلتفرم</h1>
              <GlassBadge variant="blue" size="sm">
                سوپر ادمین
              </GlassBadge>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              نظارت بر کیفیت حرکات ورزشی، تراکنش‌ها و کاربران پلتفرم جیبی‌جیم (متصل به سرور واقعی)
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0066FF] flex items-center justify-center border border-blue-200">
            <Shield className="w-6 h-6" />
          </div>
        </div>
      </GlassCard>

      {/* System Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <GlassCard className="p-4 text-right">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Users className="w-4 h-4 text-[#0066FF]" />
            <span className="text-xs font-bold">ورزشکاران فعال</span>
          </div>
          <span className="text-xl font-black font-mono text-slate-900">۱,۴۸۰</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">↑ ۱۸٪ رشد این ماه</span>
        </GlassCard>

        <GlassCard className="p-4 text-right">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Dumbbell className="w-4 h-4 text-[#0066FF]" />
            <span className="text-xs font-bold">مربیان تاییدشده</span>
          </div>
          <span className="text-xl font-black font-mono text-slate-900">۸۴</span>
          <span className="text-[10px] text-slate-400 block mt-1">در ۴ رشته ورزشی</span>
        </GlassCard>

        <GlassCard className="p-4 text-right">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Building2 className="w-4 h-4 text-[#0066FF]" />
            <span className="text-xs font-bold">باشگاه‌های عضو</span>
          </div>
          <span className="text-xl font-black font-mono text-slate-900">۱۲</span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">تأییدیه فعال</span>
        </GlassCard>

        <GlassCard className="p-4 text-right">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold">صف بررسی حرکات</span>
          </div>
          <span className="text-xl font-black font-mono text-orange-600">{reviewMovements.length}</span>
          <span className="text-[10px] text-orange-500 font-bold block mt-1">نیازمند نظارت کیفی</span>
        </GlassCard>
      </div>

      {/* Exercise Review Queue */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            صف بازبینی و تأیید حرکات پیشنهادی مربیان
          </h2>
          <GlassBadge variant="orange" size="sm">
            {reviewMovements.length} حرکت
          </GlassBadge>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 gap-2 text-slate-500 text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-[#0066FF]" />
            در حال بارگذاری لیست حرکات از سرور...
          </div>
        ) : reviewMovements.length === 0 ? (
          <GlassCard className="p-8 text-center border-dashed border-slate-300">
            <Check className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
            <p className="text-sm font-bold text-slate-800">صف بررسی حرکات خالی است!</p>
            <p className="text-xs text-slate-500 mt-1">تمام حرکات ارسالی بازبینی و تعیین وضعیت شده‌اند.</p>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {reviewMovements.map((movement) => (
              <GlassCard key={movement.id} className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center border border-blue-200 shrink-0">
                      <Dumbbell className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{movement.title}</h4>
                        <GlassBadge variant="blue" size="sm">
                          {movement.sportType === 'calisthenics'
                            ? 'کالیستنیکس'
                            : movement.sportType === 'powerlifting'
                            ? 'پاورلیفتینگ'
                            : 'بدنسازی'}
                        </GlassBadge>
                      </div>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{movement.titleEn}</p>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{movement.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <GlassButton
                      size="sm"
                      variant="primary"
                      onClick={() => handleApproveExercise(movement.id, movement.title)}
                      icon={<Check className="w-4 h-4" />}
                    >
                      تأیید و انتشار عمومی
                    </GlassButton>
                    <button
                      onClick={() => handleRejectExercise(movement.id, movement.title)}
                      className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors border border-red-200"
                      title="رد حرکت"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
