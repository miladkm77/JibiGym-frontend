import React, { useState, useEffect } from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassInput } from '../common/GlassInput';
import { GlassBadge } from '../common/GlassBadge';
import { SPORT_TYPES } from '../../data/mockData';
import { UserRole, SportTypeCode } from '../../types';
import { api } from '../../services/api';
import { Smartphone, KeyRound, UserCheck, Dumbbell, Shield, Sparkles, Building2 } from 'lucide-react';

interface LoginFlowProps {
  onSuccess: (role: UserRole, sportTypes: SportTypeCode[]) => void;
  onCancel?: () => void;
}

export const LoginFlow: React.FC<LoginFlowProps> = ({ onSuccess, onCancel }) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile' | 'sports'>('phone');
  const [mobile, setMobile] = useState('09121234567');
  const [otpCode, setOtpCode] = useState('');
  const [timer, setTimer] = useState(120);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Profile Step Data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('coach');
  const [selectedSports, setSelectedSports] = useState<SportTypeCode[]>(['bodybuilding']);

  useEffect(() => {
    let interval: any;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || mobile.length < 11) {
      setError('لطفاً شماره موبایل ۱۱ رقمی معتبر وارد کنید (مثال: 09121234567)');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await api.requestOtp(mobile);
      setLoading(false);
      setStep('otp');
      setTimer(120);
      if (res.developmentCode) {
        setOtpCode(res.developmentCode);
      }
    } catch {
      setLoading(false);
      setStep('otp');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 4) {
      setError('کد تایید معتبر نیست');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await api.verifyOtp(mobile, otpCode);
      setLoading(false);
      // Move to role & profile selection
      setStep('profile');
    } catch {
      setLoading(false);
      setStep('profile');
    }
  };

  const handleCompleteProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      setError('لطفاً نام و نام خانوادگی را وارد کنید');
      return;
    }
    setError('');
    setStep('sports');
  };

  const toggleSport = (code: SportTypeCode) => {
    if (selectedSports.includes(code)) {
      if (selectedSports.length > 1) {
        setSelectedSports(selectedSports.filter((s) => s !== code));
      }
    } else {
      setSelectedSports([...selectedSports, code]);
    }
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      await api.registerUser({
        firstName,
        lastName,
        mobile,
        userType: selectedRole === 'coach' ? 2 : selectedRole === 'gym_owner' ? 3 : 1,
        sportTypes: selectedSports,
      });
      setLoading(false);
      onSuccess(selectedRole, selectedSports);
    } catch {
      setLoading(false);
      onSuccess(selectedRole, selectedSports);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <GlassCard className="p-6 md:p-8" variant="highlight">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">ورود و ثبت‌نام در جیبی‌جیم</h2>
              <p className="text-[11px] text-slate-400">پلتفرم مربیان، شاگردان و باشگاه‌های بدنسازی</p>
            </div>
          </div>
          <GlassBadge variant="emerald" size="sm">
            نسخه ۲.۰
          </GlassBadge>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-300 text-right">
            {error}
          </div>
        )}

        {/* STEP 1: PHONE NUMBER */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="text-right">
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                شماره موبایل خود را وارد کنید تا کد تأیید ورود برای شما ارسال شود.
              </p>
              <GlassInput
                label="شماره موبایل"
                placeholder="09123456789"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                icon={<Smartphone className="w-4 h-4" />}
                dir="ltr"
                type="tel"
                autoFocus
              />
            </div>
            <GlassButton
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={loading}
              icon={<Sparkles className="w-4 h-4" />}
            >
              دریافت کد تایید یکبار مصرف
            </GlassButton>
            <div className="text-center">
              <span className="text-[11px] text-slate-400">
                کد تایید برای تست محیط توسعه: <strong className="text-emerald-400 font-mono">12345</strong>
              </span>
            </div>
          </form>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-right">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">ارسال‌شده به {mobile}</span>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-xs text-emerald-400 hover:underline"
                >
                  ویرایش شماره
                </button>
              </div>
              <GlassInput
                label="کد ۵ رقمی ارسال شده"
                placeholder="12345"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                icon={<KeyRound className="w-4 h-4" />}
                dir="ltr"
                maxLength={5}
                autoFocus
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>زمان باقی‌مانده:</span>
              <span className="font-mono text-emerald-400 font-medium">
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </span>
            </div>

            <GlassButton
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              loading={loading}
              icon={<UserCheck className="w-4 h-4" />}
            >
              تأیید و ورود به پنل
            </GlassButton>
          </form>
        )}

        {/* STEP 3: ROLE & PROFILE */}
        {step === 'profile' && (
          <form onSubmit={handleCompleteProfile} className="space-y-4">
            <div className="text-right space-y-3">
              <p className="text-xs text-slate-300 font-medium">نقش کاربری خود را در پلتفرم انتخاب کنید:</p>

              {/* Role Cards */}
              <div className="grid grid-cols-3 gap-2">
                {/* Athlete */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('athlete')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedRole === 'athlete'
                      ? 'bg-emerald-500/20 border-emerald-400 shadow-glass-glow text-white'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <Dumbbell className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                  <div className="text-xs font-bold">ورزشکار</div>
                  <div className="text-[10px] opacity-75 mt-0.5">دریافت برنامه</div>
                </button>

                {/* Coach */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('coach')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedRole === 'coach'
                      ? 'bg-cyan-500/20 border-cyan-400 shadow-glass-cyan text-white'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <UserCheck className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
                  <div className="text-xs font-bold">مربی</div>
                  <div className="text-[10px] opacity-75 mt-0.5">تنظیم و نظارت</div>
                </button>

                {/* Gym Owner */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('gym_owner')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedRole === 'gym_owner'
                      ? 'bg-orange-500/20 border-orange-400 shadow-lg shadow-orange-500/20 text-white'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-orange-400" />
                  <div className="text-xs font-bold">مدیر باشگاه</div>
                  <div className="text-[10px] opacity-75 mt-0.5">سالن و مربیان</div>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <GlassInput
                  label="نام"
                  placeholder="مثال: علی"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <GlassInput
                  label="نام خانوادگی"
                  placeholder="مثال: حسینی"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <GlassButton type="submit" variant="primary" fullWidth size="lg">
              مرحله بعد: انتخاب رشته ورزشی
            </GlassButton>
          </form>
        )}

        {/* STEP 4: SPORT DISCIPLINES SELECTION */}
        {step === 'sports' && (
          <div className="space-y-4 text-right">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">رشته‌های ورزشی تخصصی شما</h3>
              <p className="text-xs text-slate-400">
                حداقل یک یا چند رشته تخصصی را انتخاب کنید (بدنسازی، کالیستنیکس، کراسفیت، پاورلیفتینگ):
              </p>
            </div>

            <div className="space-y-2">
              {SPORT_TYPES.map((sport) => {
                const isSelected = selectedSports.includes(sport.code);
                return (
                  <div
                    key={sport.code}
                    onClick={() => toggleSport(sport.code)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-400/60 shadow-glass'
                        : 'bg-white/[0.04] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        {sport.titleFa}
                        <span className="text-[10px] font-mono text-slate-400 font-normal">({sport.titleEn})</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{sport.description}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-emerald-500 border-emerald-400 text-black'
                          : 'border-white/20 bg-black/40'
                      }`}
                    >
                      {isSelected && <span className="text-xs font-bold">✓</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            <GlassButton
              type="button"
              onClick={handleFinalSubmit}
              variant="primary"
              fullWidth
              size="lg"
              loading={loading}
              icon={<Shield className="w-4 h-4" />}
            >
              ورود و شروع به کار در جیبی‌جیم
            </GlassButton>
          </div>
        )}
      </GlassCard>
    </div>
  );
};
