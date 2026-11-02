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
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'خطا در ارتباط با سرور ارسال کد OTP');
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
      setStep('profile');
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'کد تایید وارد شده نامعتبر یا منقضی است');
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
    setError('');
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
    } catch (err: any) {
      setLoading(false);
      // If user already exists, proceed to login
      if (err.message && err.message.includes('already exists')) {
        onSuccess(selectedRole, selectedSports);
      } else {
        setError(err.message || 'خطا در ثبت مشخصات در سرور دیتابیس');
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <GlassCard className="p-6 md:p-8" variant="highlight">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0066FF]">
              <Dumbbell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">ورود و ثبت‌نام در جیبی‌جیم</h2>
              <p className="text-[11px] text-slate-500">پلتفرم مربیان، شاگردان و باشگاه‌های بدنسازی</p>
            </div>
          </div>
          <GlassBadge variant="blue" size="sm">
            نسخه ۲.۰
          </GlassBadge>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 text-right">
            {error}
          </div>
        )}

        {/* STEP 1: PHONE NUMBER */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="text-right">
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                شماره موبایل خود را وارد کنید تا کد تأیید ورود برای شما ارسال شود.
              </p>
              <GlassInput
                label="شماره موبایل"
                placeholder="09123456789"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                icon={<Smartphone className="w-4 h-4 text-slate-400" />}
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
              <span className="text-[11px] text-slate-500">
                کد تایید برای تست محیط توسعه: <strong className="text-[#0066FF] font-mono">12345</strong>
              </span>
            </div>
          </form>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-right">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500">ارسال‌شده به {mobile}</span>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-xs text-[#0066FF] font-bold hover:underline"
                >
                  ویرایش شماره
                </button>
              </div>
              <GlassInput
                label="کد ۵ رقمی ارسال شده"
                placeholder="12345"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                icon={<KeyRound className="w-4 h-4 text-slate-400" />}
                dir="ltr"
                maxLength={5}
                autoFocus
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>زمان باقی‌مانده:</span>
              <span className="font-mono text-[#0066FF] font-bold">
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
              <p className="text-xs text-slate-700 font-bold">نقش کاربری خود را در پلتفرم انتخاب کنید:</p>

              {/* Role Cards */}
              <div className="grid grid-cols-3 gap-2">
                {/* Athlete */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('athlete')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedRole === 'athlete'
                      ? 'bg-blue-50 border-[#0066FF] text-[#0066FF] shadow-sm font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Dumbbell className="w-5 h-5 mx-auto mb-1 text-[#0066FF]" />
                  <div className="text-xs font-bold">ورزشکار</div>
                  <div className="text-[10px] opacity-75 mt-0.5">دریافت برنامه</div>
                </button>

                {/* Coach */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('coach')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedRole === 'coach'
                      ? 'bg-blue-50 border-[#0066FF] text-[#0066FF] shadow-sm font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <UserCheck className="w-5 h-5 mx-auto mb-1 text-[#0066FF]" />
                  <div className="text-xs font-bold">مربی</div>
                  <div className="text-[10px] opacity-75 mt-0.5">تنظیم و نظارت</div>
                </button>

                {/* Gym Owner */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('gym_owner')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedRole === 'gym_owner'
                      ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-sm font-bold'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-5 h-5 mx-auto mb-1 text-orange-500" />
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
              <h3 className="text-sm font-bold text-slate-900 mb-1">رشته‌های ورزشی تخصصی شما</h3>
              <p className="text-xs text-slate-500">
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
                        ? 'bg-blue-50 border-[#0066FF] shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        {sport.titleFa}
                        <span className="text-[10px] font-mono text-slate-500 font-normal">({sport.titleEn})</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{sport.description}</p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#0066FF] border-[#0066FF] text-white font-bold'
                          : 'border-slate-300 bg-white'
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
