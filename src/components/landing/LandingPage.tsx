import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { GlassButton } from '../common/GlassButton';
import { GlassBadge } from '../common/GlassBadge';
import { SPORT_TYPES } from '../../data/mockData';
import {
  Dumbbell,
  Users,
  Building2,
  Shield,
  ArrowLeft,
  Sparkles,
  Play,
  CheckCircle2,
  Calendar,
  CreditCard,
  Flame,
  Zap,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (route: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen text-slate-800 text-right selection:bg-blue-500/20 selection:text-blue-700">
      {/* Top Navbar */}
      <nav className="sticky top-2 z-40 max-w-4xl mx-auto px-4 mb-8">
        <GlassCard className="p-3.5 px-5 flex items-center justify-between shadow-sm bg-white/90 backdrop-blur-2xl border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
              <Dumbbell className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black text-slate-900 tracking-tight">جیبی‌جیم</span>
                <span className="text-[10px] font-mono text-[#0066FF] font-bold px-1.5 py-0.5 rounded-md bg-blue-50 border border-blue-200">
                  JibiGym
                </span>
              </div>
              <p className="text-[9px] text-slate-500">پلتفرم مربیان، ورزشکاران و باشگاه‌ها</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <GlassButton
              variant="glass"
              size="sm"
              onClick={() => onNavigate('/auth')}
            >
              ورود با شماره موبایل
            </GlassButton>
            <GlassButton
              variant="primary"
              size="sm"
              onClick={() => onNavigate('/athlete')}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              شروع رایگان
            </GlassButton>
          </div>
        </GlassCard>
      </nav>

      <main className="max-w-4xl mx-auto px-4 space-y-16 pb-24">
        {/* HERO SECTION */}
        <section className="text-center space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0066FF] text-xs font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>پلتفرم تخصصی ورزش‌های سنگین و مقاومتی کشور</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight max-w-2xl mx-auto">
            باشگاه و مربی حرفه‌ای، <br className="hidden sm:block" />
            <span className="text-[#0066FF] bg-gradient-to-l from-[#0066FF] to-sky-500 bg-clip-text text-transparent">
              همیشه در جیب شما
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
            تنظیم هوشمند برنامه تمرینی، نظارت مستقیم مربی بر روند تمرینات، نقشه تعاملی آسیب‌های بدنی و ثبت نام در برترین باشگاه‌های بدنسازی، کالیستنیکس و کراسفیت.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <GlassButton
              variant="primary"
              size="lg"
              onClick={() => onNavigate('/coach')}
              icon={<ArrowLeft className="w-5 h-5" />}
            >
              ورود به پنل مربیان
            </GlassButton>
            <GlassButton
              variant="glass"
              size="lg"
              onClick={() => onNavigate('/athlete')}
            >
              ورود به پنل ورزشکاران
            </GlassButton>
          </div>
        </section>

        {/* 4 STANDALONE PANELS DIRECT ENTRY CARDS (دامین‌ها و ساب‌دامین‌های جدا) */}
        <section className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-black text-slate-900">چهار پنل تخصصی و مستقل پلتفرم</h2>
            <p className="text-xs text-slate-500">
              هر نقش دارای ساب‌دامین، محیط کاربری، ابزارها و پنل اختصاصی خود است:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Panel 1: Coach */}
            <GlassCard
              interactive
              onClick={() => onNavigate('/coach')}
              className="p-5 flex flex-col justify-between border-blue-200 hover:border-blue-500 group"
              variant="highlight"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-[#0066FF] flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">
                    coach.jibigym.com
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-[#0066FF] transition-colors">
                  پنل مربیان حرفه‌ای (Coach)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  برنامه‌ساز روزبه‌روز، بانک حرکات و سوپرست‌ها، اشتراک کد دعوت یکتا، مدیریت لیست شاگردان و تأیید مستقیم فیش‌های کارت‌به‌کارت.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-[#0066FF] pt-4 mt-2 border-t border-slate-100">
                <span>ورود به میز کار مربی</span>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </div>
            </GlassCard>

            {/* Panel 2: Athlete */}
            <GlassCard
              interactive
              onClick={() => onNavigate('/athlete')}
              className="p-5 flex flex-col justify-between hover:border-sky-400 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                    <Dumbbell className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-sky-700 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-200">
                    athlete.jibigym.com
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                  پنل ورزشکار و شاگرد (Athlete)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  مشاهده روز تمرین، ویدیوهای آموزشی، ثبت ست‌ها و تکرارها، تایمر شناور استراحت، نقشه آسیب‌های بدن و پرداخت شهریه آنلاین.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-sky-600 pt-4 mt-2 border-t border-slate-100">
                <span>ورود به پنل ورزشکار</span>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </div>
            </GlassCard>

            {/* Panel 3: Gym Owner */}
            <GlassCard
              interactive
              onClick={() => onNavigate('/gym')}
              className="p-5 flex flex-col justify-between hover:border-orange-400 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-orange-700 bg-orange-50 px-2 py-0.5 rounded-lg border border-orange-200">
                    gym.jibigym.com
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                  پنل مدیران باشگاه‌ها (Gyms)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  پایش تجهیزات و دستگاه‌های بدنسازی، مربیان فعال در سالن، سانس‌ها و جذب ورزشکاران با نشان رسمی تأییدیه پلتفرم.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-orange-600 pt-4 mt-2 border-t border-slate-100">
                <span>ورود به پنل باشگاه</span>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </div>
            </GlassCard>

            {/* Panel 4: Admin */}
            <GlassCard
              interactive
              onClick={() => onNavigate('/admin')}
              className="p-5 flex flex-col justify-between hover:border-purple-400 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
                    admin.jibigym.com
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                  پنل مدیریت کلان و ادمین (Admin)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  صف تأیید حرکات پیشنهادی مربیان به کتابخانه عمومی، مدیریت و نظارت بر کاربران، آمار تراکنش‌ها و پشتیبانی تیکتینگ.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-purple-600 pt-4 mt-2 border-t border-slate-100">
                <span>ورود به مدیریت سیستم</span>
                <ChevronRight className="w-4 h-4 rotate-180" />
              </div>
            </GlassCard>
          </div>
        </section>

        {/* HEAVY SPORTS DISCIPLINES */}
        <section className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-black text-slate-900">رشته‌های ورزشی تخصصی جیبی‌جیم</h2>
            <p className="text-xs text-slate-500">پشتیبانی کامل از حرکات، الگوها و تجهیزات ورزش‌های سنگین</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SPORT_TYPES.map((st) => (
              <GlassCard key={st.code} className="p-4 text-right hover:border-blue-300">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0066FF] border border-blue-200 flex items-center justify-center mb-2 font-bold text-xs">
                  {st.code === 'bodybuilding' ? '🏋️‍♂️' : st.code === 'calisthenics' ? '🤸‍♂️' : st.code === 'crossfit' ? '⚡' : '💪'}
                </div>
                <h3 className="text-xs font-black text-slate-900">{st.titleFa}</h3>
                <span className="text-[10px] font-mono text-[#0066FF] font-bold block mt-0.5">
                  {st.titleEn}
                </span>
                <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{st.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* WORKFLOW STEPS */}
        <section className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-lg font-black text-slate-900">مسیر کاربری ساده و مطمئن</h2>
            <p className="text-xs text-slate-500">از ورود با شماره موبایل تا اولین جلسه تمرینی در باشگاه</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-right">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-xs">
                ۱
              </span>
              <h4 className="text-xs font-bold text-slate-900">ثبت‌نام سریع با پیامک OTP</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                بدون پسورد و پیچیدگی، ورود فقط با شماره موبایل و کد ۵ رقمی تأیید پیامکی.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-xs">
                ۲
              </span>
              <h4 className="text-xs font-bold text-slate-900">اتصال شاگرد و مربی با کد دعوت</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                هر مربی یک کد یکتا دارد. شاگرد کد را وارد کرده و درخواست اتصال دوطرفه برقرار می‌شود.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="w-7 h-7 rounded-xl bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-xs">
                ۳
              </span>
              <h4 className="text-xs font-bold text-slate-900">اجرای تمرین با تایمر و ویدیو</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                تیک زدن ست‌ها، نظارت بر تمپو، تایمر استراحت شناور و ثبت پیشرفت در حساب مربی.
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="text-center p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-sky-600 text-white shadow-lg shadow-blue-500/20 space-y-4">
          <h2 className="text-2xl font-black">همین حالا به جیبی‌جیم بپیوندید</h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-md mx-auto">
            مربیان، شاگردان و باشگاه‌های پیشرو در حال ارتقای استانداردهای ورزشی خود با جیبی‌جیم هستند.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('/auth')}
              className="px-6 py-3 rounded-2xl bg-white text-[#0066FF] font-black text-sm shadow-md hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            >
              ثبت‌نام و ورود یکپارچه
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-500 bg-white">
        <p>© 2026 پلتفرم ورزشی جیبی‌جیم (JibiGym / Gymito V2) • تمامی حقوق محفوظ است.</p>
      </footer>
    </div>
  );
};
