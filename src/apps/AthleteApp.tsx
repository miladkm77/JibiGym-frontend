import React, { useState } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { GlassBadge } from '../components/common/GlassBadge';
import { BottomTabBar, TabItem } from '../components/common/BottomTabBar';
import { AthleteHome } from '../components/athlete/AthleteHome';
import { WorkoutPlayer } from '../components/athlete/WorkoutPlayer';
import { BodyMap } from '../components/athlete/BodyMap';
import { PaymentModal } from '../components/athlete/PaymentModal';
import { CoachLinkModal } from '../components/athlete/CoachLinkModal';
import { Dumbbell, Calendar, CreditCard, ShieldAlert, ArrowRight } from 'lucide-react';

interface AthleteAppProps {
  onBackToLanding?: () => void;
}

export const AthleteApp: React.FC<AthleteAppProps> = ({ onBackToLanding }) => {
  const [currentView, setCurrentView] = useState<'home' | 'workout' | 'bodymap'>('home');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCoachLinkModalOpen, setIsCoachLinkModalOpen] = useState(false);

  const tabs: TabItem[] = [
    { id: 'home', label: 'برنامه امروز', icon: <Dumbbell className="w-5 h-5" /> },
    { id: 'workout', label: 'تمرین فعال', icon: <Calendar className="w-5 h-5" /> },
    { id: 'bodymap', label: 'نقشه آسیب', icon: <ShieldAlert className="w-5 h-5" /> },
    { id: 'payments', label: 'شهریه', icon: <CreditCard className="w-5 h-5" /> },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'workout') setCurrentView('workout');
    else if (tabId === 'bodymap') setCurrentView('bodymap');
    else if (tabId === 'payments') setIsPaymentModalOpen(true);
    else setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 text-right">
      <div className="ambient-glow-blue top-0 right-10" />
      <div className="ambient-glow-sky top-40 left-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-3 pb-24">
        {/* Athlete Header */}
        <header className="sticky top-2 z-40 mb-5">
          <GlassCard className="p-3.5 px-4 flex items-center justify-between shadow-subtle border-slate-200 bg-white/90 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-sm font-bold text-sm">
                ورزشکار
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black text-slate-900">میز کار ورزشکار</span>
                  <GlassBadge variant="cyan" size="sm">
                    athlete.jibigym.com
                  </GlassBadge>
                </div>
                <p className="text-[10px] text-slate-500">اجرای تمرین، ثبت ست‌ها، ویدیوها و ارتباط با مربی</p>
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
          {currentView === 'workout' && (
            <WorkoutPlayer
              onFinish={() => setCurrentView('home')}
              onExit={() => setCurrentView('home')}
            />
          )}

          {currentView === 'bodymap' && <BodyMap />}

          {currentView === 'home' && (
            <AthleteHome
              onStartWorkout={() => setCurrentView('workout')}
              onOpenPayment={() => setIsPaymentModalOpen(true)}
              onOpenCoachLinkModal={() => setIsCoachLinkModalOpen(true)}
            />
          )}
        </main>

        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentSuccess={() => setIsPaymentModalOpen(false)}
        />

        <CoachLinkModal
          isOpen={isCoachLinkModalOpen}
          onClose={() => setIsCoachLinkModalOpen(false)}
        />

        <BottomTabBar tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />
      </div>
    </div>
  );
};
