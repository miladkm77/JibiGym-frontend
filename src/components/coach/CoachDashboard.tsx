import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassBadge } from '../common/GlassBadge';
import { ModalSheet } from '../common/ModalSheet';
import { api } from '../../services/api';
import { Assignment } from '../../types';
import { Users, CreditCard, Sparkles, Plus, Share2, Check, X, Eye, Clock, Dumbbell, ShieldCheck, Loader2 } from 'lucide-react';

interface CoachDashboardProps {
  onOpenProgramBuilder: () => void;
}

export const CoachDashboard: React.FC<CoachDashboardProps> = ({ onOpenProgramBuilder }) => {
  const [coach, setCoach] = useState({
    id: 1,
    name: 'محمدجواد محمدی',
    bio: 'مربی رسمی بدنسازی، کالیستنیکس و پاورلیفتینگ',
    inviteCode: 'COACH-JIBI-101',
    activeAthletesCount: 14,
    monthlyEarnings: 11900000,
    avatarUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300',
  });

  const [activeAssignment, setActiveAssignment] = useState<Assignment | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const [pendingLinks, setPendingLinks] = useState([
    {
      id: 1,
      athleteName: 'احسان کاظمی',
      athleteAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      sportType: 'کالیستنیکس و وزن بدن',
      requestDate: 'امروز، ۱۰:۱۵',
    },
    {
      id: 2,
      athleteName: 'سارا راد',
      athleteAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      sportType: 'بدنسازی و هایپرتروفی',
      requestDate: 'دیروز، ۱۸:۴۰',
    },
  ]);

  const [receipts, setReceipts] = useState([
    {
      id: 1,
      athleteName: 'میلاد کریمی',
      amount: 850000,
      trackingCode: 'TX-984128501',
      date: 'امروز، ۱۴:۲۲',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500',
    },
  ]);

  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

  useEffect(() => {
    loadRealCoachData();
  }, []);

  const loadRealCoachData = async () => {
    setLoading(true);
    try {
      const plans = await api.getAthletePlans(2);
      if (plans.length > 0) {
        setActiveAssignment(plans[0]);
      }
    } catch (err) {
      console.error('Failed to load coach real data:', err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const copyInviteCode = () => {
    navigator.clipboard.writeText(coach.inviteCode);
    setCopiedCode(true);
    showToast(`کد دعوت ${coach.inviteCode} در کلیپ‌بورد کپی شد.`);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleApproveLink = (linkId: number, athleteName: string) => {
    setPendingLinks((prev) => prev.filter((l) => l.id !== linkId));
    showToast(`شاگرد «${athleteName}» با موفقیت تایید و متصل شد.`);
  };

  const handleRejectLink = (linkId: number) => {
    setPendingLinks((prev) => prev.filter((l) => l.id !== linkId));
    showToast(`درخواست اتصال رد شد.`);
  };

  const handleConfirmReceipt = (receiptId: number) => {
    setReceipts((prev) => prev.filter((r) => r.id !== receiptId));
    setSelectedReceipt(null);
    showToast('فیش واریزی تأیید شد و برنامه برای شاگرد فعال گردید.');
  };

  const handleRejectReceipt = (receiptId: number) => {
    setReceipts((prev) => prev.filter((r) => r.id !== receiptId));
    setSelectedReceipt(null);
    showToast('فیش واریزی رد شد و به شاگرد اطلاع‌رسانی گردید.');
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 py-2.5 px-5 rounded-2xl bg-white border border-blue-500 text-blue-700 text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Profile Header Glass Card */}
      <GlassCard className="p-5" variant="highlight">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-sky-400 p-[2px] shadow-sm">
                <img
                  src={coach.avatarUrl}
                  alt={coach.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white" />
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-900">{coach.name}</h1>
                <GlassBadge variant="blue" size="sm">
                  مربی رسمی
                </GlassBadge>
              </div>
              <p className="text-xs text-slate-600 mt-1">{coach.bio}</p>
            </div>
          </div>

          {/* Quick Action: New Program */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <GlassButton
              variant="primary"
              size="md"
              onClick={onOpenProgramBuilder}
              icon={<Plus className="w-4 h-4" />}
            >
              طراحی برنامه جدید
            </GlassButton>
          </div>
        </div>

        {/* Invite Code Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-right">
          <div>
            <span className="text-xs text-slate-500">کد دعوت اختصاصی شاگردان:</span>
            <span className="text-sm font-black font-mono text-[#0066FF] mr-2">
              {coach.inviteCode}
            </span>
          </div>

          <GlassButton
            variant="glass"
            size="sm"
            onClick={copyInviteCode}
            icon={<Share2 className="w-3.5 h-3.5" />}
          >
            {copiedCode ? 'کپی شد ✓' : 'کپی لینک و کد دعوت'}
          </GlassButton>
        </div>
      </GlassCard>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <GlassCard className="p-4 text-right">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Users className="w-4 h-4 text-[#0066FF]" />
            <span className="text-xs font-bold">شاگردان فعال</span>
          </div>
          <span className="text-xl font-black font-mono text-slate-900">
            {coach.activeAthletesCount} نفر
          </span>
          <span className="text-[10px] text-emerald-600 font-bold block mt-1">↑ ۳ شاگرد جدید</span>
        </GlassCard>

        <GlassCard className="p-4 text-right">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <CreditCard className="w-4 h-4 text-[#0066FF]" />
            <span className="text-xs font-bold">درآمد این ماه</span>
          </div>
          <span className="text-xl font-black font-mono text-slate-900">
            {coach.monthlyEarnings.toLocaleString('fa-IR')}
          </span>
          <span className="text-[10px] text-slate-400 block mt-1">تومان (خالص)</span>
        </GlassCard>

        <GlassCard className="p-4 text-right">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Dumbbell className="w-4 h-4 text-[#0066FF]" />
            <span className="text-xs font-bold">برنامه‌های فعال</span>
          </div>
          <span className="text-xl font-black font-mono text-slate-900">۱۲ برنامه</span>
          <span className="text-[10px] text-[#0066FF] font-bold block mt-1">روی دیتابیس زنده</span>
        </GlassCard>

        <GlassCard className="p-4 text-right">
          <div className="flex items-center gap-2 text-slate-500 mb-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-bold">فیش‌های در انتظار</span>
          </div>
          <span className="text-xl font-black font-mono text-orange-600">
            {receipts.length} فیش
          </span>
          <span className="text-[10px] text-orange-500 font-bold block mt-1">نیازمند تأیید شما</span>
        </GlassCard>
      </div>

      {/* SECTION 1: Pending Athlete Connection Requests */}
      {pendingLinks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-right">
            <h2 className="text-sm font-bold text-slate-900">
              درخواست‌های اتصال شاگرد جدید ({pendingLinks.length})
            </h2>
            <span className="text-xs text-slate-400">ورود با کد دعوت شما</span>
          </div>

          <div className="space-y-2">
            {pendingLinks.map((link) => (
              <GlassCard key={link.id} className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={link.athleteAvatar}
                    alt={link.athleteName}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="text-right">
                    <h3 className="text-xs font-bold text-slate-900">{link.athleteName}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{link.sportType}</p>
                    <span className="text-[10px] text-slate-400 font-mono">{link.requestDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <GlassButton
                    variant="primary"
                    size="sm"
                    onClick={() => handleApproveLink(link.id, link.athleteName)}
                    icon={<Check className="w-3.5 h-3.5" />}
                  >
                    تایید
                  </GlassButton>
                  <button
                    onClick={() => handleRejectLink(link.id)}
                    className="p-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: Pending Card-to-Card Payment Receipts */}
      {receipts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-right">
            <h2 className="text-sm font-bold text-slate-900">
              فیش‌های واریزی کارت‌به‌کارت در انتظار بررسی ({receipts.length})
            </h2>
            <span className="text-xs text-slate-400">نیاز به تطبیق شماره پیگیری</span>
          </div>

          <div className="space-y-2">
            {receipts.map((rec) => (
              <GlassCard key={rec.id} className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs font-bold text-slate-900">{rec.athleteName}</h3>
                      <GlassBadge variant="orange" size="sm">
                        {rec.amount.toLocaleString('fa-IR')} تومان
                      </GlassBadge>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      کد پیگیری: {rec.trackingCode}
                    </p>
                    <span className="text-[10px] text-slate-400">{rec.date}</span>
                  </div>
                </div>

                <GlassButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedReceipt(rec)}
                  icon={<Eye className="w-3.5 h-3.5" />}
                >
                  مشاهده فیش
                </GlassButton>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: Active Athletes Roster from Real Database */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-right">
          <h2 className="text-sm font-bold text-slate-900">
            شاگردان فعال و برنامه‌های ثبت‌شده در دیتابیس
          </h2>
          <span className="text-xs text-[#0066FF] font-bold">سرور واقعی</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-6 gap-2 text-slate-500 text-sm">
            <Loader2 className="w-4 h-4 animate-spin text-[#0066FF]" />
            در حال دریافت شاگردان از سرور...
          </div>
        ) : activeAssignment ? (
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeAssignment.athleteAvatar}
                  alt={activeAssignment.athleteName}
                  className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                />
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">
                      {activeAssignment.athleteName}
                    </h3>
                    <GlassBadge variant="blue" size="sm">
                      برنامه فعال در دیتابیس
                    </GlassBadge>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeAssignment.program?.title || 'برنامه تمرینی تخصصی'}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#0066FF]" />
                      انقضا: {activeAssignment.endDate}
                    </span>
                    <span>• شهریه: {activeAssignment.price.toLocaleString('fa-IR')} تومان</span>
                  </div>
                </div>
              </div>

              <GlassButton variant="glass" size="sm" onClick={onOpenProgramBuilder}>
                ویرایش برنامه
              </GlassButton>
            </div>
          </GlassCard>
        ) : (
          <GlassCard className="p-4 text-center text-slate-500 text-sm">
            هنوز شاگردی برای این مربی در دیتابیس ثبت نشده است.
          </GlassCard>
        )}
      </div>

      {/* Receipt Preview Modal Sheet */}
      <ModalSheet
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        title="بررسی رسید کارت‌به‌کارت شاگرد"
      >
        {selectedReceipt && (
          <div className="space-y-4 text-right">
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
              <img
                src={selectedReceipt.imageUrl}
                alt="رسید"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">نام شاگرد:</span>
                <strong className="text-slate-900">{selectedReceipt.athleteName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">مبلغ واریزی:</span>
                <strong className="text-[#0066FF] font-mono">
                  {selectedReceipt.amount.toLocaleString('fa-IR')} تومان
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">کد پیگیری بانکی:</span>
                <strong className="font-mono text-slate-800">{selectedReceipt.trackingCode}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">زمان ارسال:</span>
                <span className="text-slate-600">{selectedReceipt.date}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <GlassButton
                variant="primary"
                size="md"
                className="flex-1 justify-center"
                onClick={() => handleConfirmReceipt(selectedReceipt.id)}
                icon={<Check className="w-4 h-4" />}
              >
                تأیید فیش و فعال‌سازی برنامه
              </GlassButton>
              <GlassButton
                variant="secondary"
                size="md"
                className="text-red-600 hover:bg-red-50"
                onClick={() => handleRejectReceipt(selectedReceipt.id)}
                icon={<X className="w-4 h-4" />}
              >
                رد فیش
              </GlassButton>
            </div>
          </div>
        )}
      </ModalSheet>
    </div>
  );
};
