import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassBadge } from '../common/GlassBadge';
import { ModalSheet } from '../common/ModalSheet';
import { CURRENT_COACH, MOCK_PENDING_LINKS, MOCK_RECEIPTS, MOCK_ASSIGNMENT } from '../../data/mockData';
import { Users, CreditCard, Sparkles, Plus, Share2, Check, X, Eye, Clock, Dumbbell, ShieldCheck } from 'lucide-react';

interface CoachDashboardProps {
  onOpenProgramBuilder: () => void;
}

export const CoachDashboard: React.FC<CoachDashboardProps> = ({ onOpenProgramBuilder }) => {
  const [coach] = useState(CURRENT_COACH);
  const [pendingLinks, setPendingLinks] = useState(MOCK_PENDING_LINKS);
  const [receipts, setReceipts] = useState(MOCK_RECEIPTS);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<typeof MOCK_RECEIPTS[0] | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

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

      {/* Top Coach Profile & Invite Code Banner */}
      <GlassCard className="p-5 md:p-6" variant="highlight">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-sky-400 p-[2px] shadow-md shadow-blue-500/20">
                <img
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&auto=format&fit=crop&q=60"
                  alt={coach.firstName}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <span className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-blue-600 border-2 border-white" />
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-900">
                  استاد {coach.firstName} {coach.lastName}
                </h1>
                <GlassBadge variant="blue" size="sm">
                  مربی ارشد
                </GlassBadge>
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{coach.bio}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {coach.sportTypes.map((st) => (
                  <span
                    key={st}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 font-bold border border-blue-100"
                  >
                    {st === 'bodybuilding' ? 'بدنسازی' : st === 'calisthenics' ? 'کالیستنیکس' : 'پاورلیفتینگ'}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Invite Code Box */}
          <div className="flex items-center gap-2 bg-white/90 p-2.5 rounded-2xl border border-slate-200/90 shadow-sm">
            <div className="text-right px-2">
              <span className="text-[10px] text-slate-500 block">کد دعوت اختصاصی شاگردان:</span>
              <span className="text-sm font-mono font-bold text-[#0066FF] tracking-wider">
                {coach.inviteCode}
              </span>
            </div>
            <GlassButton
              variant="glass"
              size="sm"
              onClick={copyInviteCode}
              icon={copiedCode ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Share2 className="w-3.5 h-3.5 text-blue-600" />}
            >
              {copiedCode ? 'کپی شد' : 'کپی کد'}
            </GlassButton>
          </div>
        </div>
      </GlassCard>

      {/* 4 HIG Analytics Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <GlassCard className="p-4 text-right">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">شاگردان فعال</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">{coach.activeAthletesCount}</div>
          <span className="text-[10px] text-blue-600 font-bold">۳ شاگرد جدید این هفته</span>
        </GlassCard>

        <GlassCard className="p-4 text-right">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">درآمد این ماه</span>
            <CreditCard className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono">۲۱,۶۰۰,۰۰۰</div>
          <span className="text-[10px] text-slate-500">تومان (تراکنش‌های موفق)</span>
        </GlassCard>

        <GlassCard className="p-4 text-right">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">درخواست اتصال</span>
            <Clock className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-black text-orange-600 font-mono">{pendingLinks.length}</div>
          <span className="text-[10px] text-orange-600 font-bold">منتظر تأیید شما</span>
        </GlassCard>

        <GlassCard className="p-4 text-right">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">فیش کارت‌به‌کارت</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-purple-600 font-mono">{receipts.length}</div>
          <span className="text-[10px] text-purple-600 font-bold">نیاز به بررسی واریز</span>
        </GlassCard>
      </div>

      {/* Main Action Bar */}
      <div className="flex items-center justify-between gap-3">
        <GlassButton
          variant="primary"
          size="lg"
          fullWidth
          onClick={onOpenProgramBuilder}
          icon={<Plus className="w-5 h-5" />}
        >
          طراحی و تنظیم برنامه تمرینی جدید
        </GlassButton>
      </div>

      {/* SECTION 1: Pending Connection Requests (UC-06) */}
      {pendingLinks.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-right">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              درخواست‌های اتصال شاگردان جدید ({pendingLinks.length})
            </h2>
            <span className="text-xs text-slate-500">پذیرش شاگرد جدید</span>
          </div>

          <div className="space-y-2">
            {pendingLinks.map((link) => (
              <GlassCard key={link.id} className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={link.athleteAvatar}
                    alt={link.athleteName}
                    className="w-11 h-11 rounded-xl object-cover border border-slate-200"
                  />
                  <div className="text-right">
                    <h3 className="text-sm font-bold text-slate-900">{link.athleteName}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-slate-500">ورود با کد دعوت</span>
                      <span className="text-[10px] text-slate-400 font-mono">• {link.requestedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRejectLink(link.id)}
                    className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 flex items-center justify-center transition-colors border border-slate-200"
                    title="رد درخواست"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <GlassButton
                    variant="primary"
                    size="sm"
                    onClick={() => handleApproveLink(link.id, link.athleteName)}
                    icon={<Check className="w-4 h-4" />}
                  >
                    تأیید اتصال
                  </GlassButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: Pending Card-to-Card Receipts Queue (UC-19 / فلو ۵) */}
      {receipts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-right">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-600" />
              فیش‌های واریزی در انتظار بررسی ({receipts.length})
            </h2>
            <span className="text-xs text-purple-600 font-bold">رسید کارت‌به‌کارت</span>
          </div>

          <div className="space-y-2">
            {receipts.map((rcp) => (
              <GlassCard key={rcp.id} className="p-4 flex items-center justify-between border-purple-200 bg-purple-50/20">
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{rcp.athleteName}</h3>
                    <GlassBadge variant="purple" size="sm">
                      {rcp.amount.toLocaleString('fa-IR')} تومان
                    </GlassBadge>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{rcp.reviewNote}</p>
                </div>

                <div className="flex items-center gap-2">
                  <GlassButton
                    variant="glass"
                    size="sm"
                    onClick={() => setSelectedReceipt(rcp)}
                    icon={<Eye className="w-3.5 h-3.5 text-purple-600" />}
                  >
                    مشاهده فیش
                  </GlassButton>
                  <GlassButton
                    variant="primary"
                    size="sm"
                    onClick={() => handleConfirmReceipt(rcp.id)}
                    icon={<Check className="w-3.5 h-3.5" />}
                  >
                    تأیید سریع
                  </GlassButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: Active Athletes Roster */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-right">
          <h2 className="text-sm font-bold text-slate-900">شاگردان فعال شما ({coach.activeAthletesCount})</h2>
          <span className="text-xs text-[#0066FF] font-bold">مشاهده تمام برنامه‌ها</span>
        </div>

        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={MOCK_ASSIGNMENT.athleteAvatar}
                alt={MOCK_ASSIGNMENT.athleteName}
                className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
              />
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{MOCK_ASSIGNMENT.athleteName}</h3>
                  <GlassBadge variant="blue" size="sm">
                    برنامه فعال
                  </GlassBadge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{MOCK_ASSIGNMENT.program.title}</p>
                <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#0066FF]" />
                    انقضا: {MOCK_ASSIGNMENT.endDate}
                  </span>
                  <span>• ۴ روز در هفته</span>
                </div>
              </div>
            </div>

            <GlassButton variant="glass" size="sm" onClick={onOpenProgramBuilder}>
              ویرایش برنامه
            </GlassButton>
          </div>
        </GlassCard>
      </div>

      {/* Receipt Preview Modal Sheet */}
      <ModalSheet
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        title="بررسی رسید کارت‌به‌کارت شاگرد"
      >
        {selectedReceipt && (
          <div className="space-y-4 text-right">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100">
              <div>
                <span className="text-xs text-slate-500 block">نام شاگرد:</span>
                <span className="text-sm font-bold text-slate-900">{selectedReceipt.athleteName}</span>
              </div>
              <div className="text-left">
                <span className="text-xs text-slate-500 block">مبلغ واریزی:</span>
                <span className="text-sm font-mono font-bold text-[#0066FF]">
                  {selectedReceipt.amount.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>

            {/* Receipt Image */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 max-h-72 flex items-center justify-center">
              <img
                src={selectedReceipt.receiptUrl}
                alt="رسید بانکی"
                className="w-full h-auto object-contain max-h-72"
              />
            </div>

            <p className="text-xs text-slate-600">
              واریز به شماره کارت: <strong className="text-slate-900 font-mono">{coach.cardNumber}</strong>
            </p>

            <div className="flex items-center gap-3 pt-2">
              <GlassButton
                variant="danger"
                fullWidth
                onClick={() => handleRejectReceipt(selectedReceipt.id)}
                icon={<X className="w-4 h-4" />}
              >
                رد فیش واریزی
              </GlassButton>
              <GlassButton
                variant="primary"
                fullWidth
                onClick={() => handleConfirmReceipt(selectedReceipt.id)}
                icon={<Check className="w-4 h-4" />}
              >
                تأیید فیش و فعال‌سازی
              </GlassButton>
            </div>
          </div>
        )}
      </ModalSheet>
    </div>
  );
};
