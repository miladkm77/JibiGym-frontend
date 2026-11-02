import React, { useState } from 'react';
import { UserRole, SportTypeCode } from './types';
import { GlassCard } from './components/common/GlassCard';
import { GlassButton } from './components/common/GlassButton';
import { GlassBadge } from './components/common/GlassBadge';
import { BottomTabBar, TabItem } from './components/common/BottomTabBar';
import { LoginFlow } from './components/auth/LoginFlow';
import { CoachDashboard } from './components/coach/CoachDashboard';
import { ProgramBuilder } from './components/coach/ProgramBuilder';
import { AthleteHome } from './components/athlete/AthleteHome';
import { WorkoutPlayer } from './components/athlete/WorkoutPlayer';
import { PaymentModal } from './components/athlete/PaymentModal';
import { CoachLinkModal } from './components/athlete/CoachLinkModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { GymOwnerDashboard } from './components/gym/GymOwnerDashboard';
import {
  Dumbbell,
  Users,
  Shield,
  Building2,
  Calendar,
  CreditCard,
  Settings,
  Bell,
  Sparkles,
  LogOut,
  UserCheck
} from 'lucide-react';

export function App() {
  // Current Active Role & Panel (Default to Coach as requested for core testing)
  const [activeRole, setActiveRole] = useState<UserRole>('coach');
  const [currentView, setCurrentView] = useState<'dashboard' | 'builder' | 'workout' | 'home'>('dashboard');
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modals State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCoachLinkModalOpen, setIsCoachLinkModalOpen] = useState(false);

  // Bottom Tabs configuration based on current active role
  const getTabsForRole = (role: UserRole): TabItem[] => {
    switch (role) {
      case 'coach':
        return [
          { id: 'home', label: 'داشبورد', icon: <Users className="w-5 h-5" /> },
          { id: 'builder', label: 'برنامه‌ساز', icon: <Calendar className="w-5 h-5" /> },
          { id: 'library', label: 'کتابخانه حرکات', icon: <Dumbbell className="w-5 h-5" /> },
          { id: 'settings', label: 'تنظیمات', icon: <Settings className="w-5 h-5" /> },
        ];
      case 'athlete':
        return [
          { id: 'home', label: 'برنامه امروز', icon: <Dumbbell className="w-5 h-5" /> },
          { id: 'workout', label: 'تمرین فعال', icon: <Calendar className="w-5 h-5" /> },
          { id: 'payments', label: 'پرداخت‌ها', icon: <CreditCard className="w-5 h-5" /> },
          { id: 'settings', label: 'پروفایل من', icon: <Settings className="w-5 h-5" /> },
        ];
      case 'admin':
        return [
          { id: 'home', label: 'داشبورد ادمین', icon: <Shield className="w-5 h-5" /> },
          { id: 'library', label: 'تأیید حرکات', icon: <Dumbbell className="w-5 h-5" /> },
          { id: 'users', label: 'کاربران', icon: <Users className="w-5 h-5" /> },
          { id: 'settings', label: 'تنظیمات کلان', icon: <Settings className="w-5 h-5" /> },
        ];
      case 'gym_owner':
        return [
          { id: 'home', label: 'سالن باشگاه', icon: <Building2 className="w-5 h-5" /> },
          { id: 'equipment', label: 'تجهیزات', icon: <Dumbbell className="w-5 h-5" /> },
          { id: 'coaches', label: 'مربیان', icon: <Users className="w-5 h-5" /> },
          { id: 'settings', label: 'اطلاعات سالن', icon: <Settings className="w-5 h-5" /> },
        ];
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'builder') {
      setCurrentView('builder');
    } else if (tabId === 'workout') {
      setCurrentView('workout');
    } else if (tabId === 'payments') {
      setIsPaymentModalOpen(true);
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    setCurrentView(role === 'athlete' ? 'home' : 'dashboard');
    setActiveTab('home');
  };

  return (
    <div className="min-h-screen bg-[#090B0E] text-slate-100 relative overflow-x-hidden">
      {/* Background Ambient Glow Elements */}
      <div className="ambient-glow-green top-0 right-10" />
      <div className="ambient-glow-cyan top-40 left-10" />
      <div className="ambient-glow-orange bottom-20 right-1/3" />

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-3 pb-24">
        {/* Top App Header with Liquid Glass Navigation Bar */}
        <header className="sticky top-2 z-40 mb-5">
          <GlassCard className="p-3 px-4 flex items-center justify-between shadow-2xl backdrop-blur-glass-heavy">
            {/* Logo & Brand */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-black shadow-glass-glow font-black text-lg">
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black tracking-tight text-white">جیبی‌جیم</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold px-1.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    JibiGym
                  </span>
                </div>
                <p className="text-[9px] text-slate-400">طراحی شیشه‌ای مایع • استانداردهای Apple HIG</p>
              </div>
            </div>

            {/* Quick Panel Switcher (All 4 Panels accessible for Pair Programming review) */}
            <div className="hidden sm:flex items-center gap-1 bg-black/50 p-1 rounded-2xl border border-white/10 text-xs">
              <button
                onClick={() => handleRoleChange('coach')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-medium ${
                  activeRole === 'coach'
                    ? 'bg-emerald-500 text-black font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                پنل مربی
              </button>
              <button
                onClick={() => handleRoleChange('athlete')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-medium ${
                  activeRole === 'athlete'
                    ? 'bg-cyan-500 text-black font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                پنل ورزشکار
              </button>
              <button
                onClick={() => handleRoleChange('gym_owner')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-medium ${
                  activeRole === 'gym_owner'
                    ? 'bg-orange-500 text-black font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                پنل باشگاه
              </button>
              <button
                onClick={() => handleRoleChange('admin')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-medium ${
                  activeRole === 'admin'
                    ? 'bg-purple-500 text-black font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                پنل ادمین
              </button>
            </div>

            {/* User Auth Profile Button */}
            <div className="flex items-center gap-2">
              <GlassButton
                variant="glass"
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
                icon={<UserCheck className="w-3.5 h-3.5 text-emerald-400" />}
              >
                ورود / تغییر نقش
              </GlassButton>
            </div>
          </GlassCard>

          {/* Mobile Role Switcher Pill Bar */}
          <div className="sm:hidden grid grid-cols-4 gap-1 mt-2 bg-black/40 p-1 rounded-2xl border border-white/10 text-[11px] text-center">
            <button
              onClick={() => handleRoleChange('coach')}
              className={`py-1.5 rounded-xl transition-colors font-medium ${
                activeRole === 'coach' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400'
              }`}
            >
              مربی
            </button>
            <button
              onClick={() => handleRoleChange('athlete')}
              className={`py-1.5 rounded-xl transition-colors font-medium ${
                activeRole === 'athlete' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400'
              }`}
            >
              ورزشکار
            </button>
            <button
              onClick={() => handleRoleChange('gym_owner')}
              className={`py-1.5 rounded-xl transition-colors font-medium ${
                activeRole === 'gym_owner' ? 'bg-orange-500 text-black font-bold' : 'text-slate-400'
              }`}
            >
              باشگاه
            </button>
            <button
              onClick={() => handleRoleChange('admin')}
              className={`py-1.5 rounded-xl transition-colors font-medium ${
                activeRole === 'admin' ? 'bg-purple-500 text-black font-bold' : 'text-slate-400'
              }`}
            >
              ادمین
            </button>
          </div>
        </header>

        {/* Dynamic Panel Content Rendering */}
        <main>
          {/* COACH PANEL */}
          {activeRole === 'coach' && (
            <>
              {currentView === 'builder' ? (
                <ProgramBuilder onBack={() => setCurrentView('dashboard')} />
              ) : (
                <CoachDashboard onOpenProgramBuilder={() => setCurrentView('builder')} />
              )}
            </>
          )}

          {/* ATHLETE PANEL */}
          {activeRole === 'athlete' && (
            <>
              {currentView === 'workout' ? (
                <WorkoutPlayer
                  onFinish={() => setCurrentView('home')}
                  onExit={() => setCurrentView('home')}
                />
              ) : (
                <AthleteHome
                  onStartWorkout={() => setCurrentView('workout')}
                  onOpenPayment={() => setIsPaymentModalOpen(true)}
                  onOpenCoachLinkModal={() => setIsCoachLinkModalOpen(true)}
                />
              )}
            </>
          )}

          {/* GYM OWNER PANEL */}
          {activeRole === 'gym_owner' && <GymOwnerDashboard />}

          {/* ADMIN PANEL */}
          {activeRole === 'admin' && <AdminDashboard />}
        </main>

        {/* Modals */}
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-md">
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute top-4 left-4 z-20 text-slate-400 hover:text-white"
              >
                ✕
              </button>
              <LoginFlow
                onSuccess={(role) => {
                  handleRoleChange(role);
                  setIsAuthModalOpen(false);
                }}
                onCancel={() => setIsAuthModalOpen(false)}
              />
            </div>
          </div>
        )}

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentSuccess={() => setIsPaymentModalOpen(false)}
        />

        <CoachLinkModal
          isOpen={isCoachLinkModalOpen}
          onClose={() => setIsCoachLinkModalOpen(false)}
        />

        {/* Apple HIG Floating Bottom Tab Bar for Mobile Navigation */}
        <BottomTabBar
          tabs={getTabsForRole(activeRole)}
          activeTab={activeTab}
          onChange={handleTabChange}
        />
      </div>
    </div>
  );
}
export default App;
