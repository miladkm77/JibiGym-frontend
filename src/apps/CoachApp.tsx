import React, { useState } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { GlassBadge } from '../components/common/GlassBadge';
import { BottomTabBar, TabItem } from '../components/common/BottomTabBar';
import { CoachDashboard } from '../components/coach/CoachDashboard';
import { ProgramBuilder } from '../components/coach/ProgramBuilder';
import { ExerciseLibraryView } from '../components/common/ExerciseLibraryView';
import { ExerciseDetailModal } from '../components/common/ExerciseDetailModal';
import { Movement } from '../types';
import { Users, Calendar, Dumbbell, Settings, ArrowRight, UserCheck } from 'lucide-react';

interface CoachAppProps {
  onBackToLanding?: () => void;
  onNavigateToAuth?: () => void;
}

export const CoachApp: React.FC<CoachAppProps> = ({ onBackToLanding, onNavigateToAuth }) => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'builder' | 'library' | 'settings'>('dashboard');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [detailMovement, setDetailMovement] = useState<Movement | null>(null);

  const tabs: TabItem[] = [
    { id: 'home', label: 'داشبورد', icon: <Users className="w-5 h-5" /> },
    { id: 'builder', label: 'برنامه‌ساز', icon: <Calendar className="w-5 h-5" /> },
    { id: 'library', label: 'کتابخانه حرکات', icon: <Dumbbell className="w-5 h-5" /> },
    { id: 'settings', label: 'تنظیمات', icon: <Settings className="w-5 h-5" /> },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'builder') setCurrentView('builder');
    else if (tabId === 'library') setCurrentView('library');
    else setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 text-right">
      <div className="ambient-glow-blue top-0 right-10" />
      <div className="ambient-glow-sky top-40 left-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-3 pb-24">
        {/* Coach Header */}
        <header className="sticky top-2 z-40 mb-5">
          <GlassCard className="p-3.5 px-4 flex items-center justify-between shadow-subtle border-slate-200 bg-white/90 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#0066FF] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                مربی
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black text-slate-900">پنل تخصصی مربیان</span>
                  <GlassBadge variant="blue" size="sm">
                    coach.jibigym.com
                  </GlassBadge>
                </div>
                <p className="text-[10px] text-slate-500">میز کار مربیگری، طراحی برنامه و مدیریت شاگردان</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onBackToLanding && (
                <GlassButton
                  variant="ghost"
                  size="sm"
                  onClick={onBackToLanding}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  صفحه اصلی
                </GlassButton>
              )}
            </div>
          </GlassCard>
        </header>

        {/* Content */}
        <main>
          {currentView === 'builder' && (
            <ProgramBuilder onBack={() => setCurrentView('dashboard')} />
          )}

          {currentView === 'library' && (
            <ExerciseLibraryView onOpenDetail={(m) => setDetailMovement(m)} />
          )}

          {currentView === 'dashboard' && (
            <CoachDashboard onOpenProgramBuilder={() => setCurrentView('builder')} />
          )}

          {currentView === 'settings' && (
            <GlassCard className="p-6 text-center space-y-3">
              <Settings className="w-10 h-10 mx-auto text-[#0066FF]" />
              <h3 className="text-base font-bold text-slate-900">تنظیمات حساب مربی</h3>
              <p className="text-xs text-slate-500">
                ویرایش شماره شبا و کارت بانکی جهت پرداخت‌های شاگردان، بیوگرافی و تخصص‌های ورزشی
              </p>
            </GlassCard>
          )}
        </main>

        <ExerciseDetailModal
          movement={detailMovement}
          isOpen={!!detailMovement}
          onClose={() => setDetailMovement(null)}
        />

        <BottomTabBar tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />
      </div>
    </div>
  );
};
