import React, { useState } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { GlassBadge } from '../components/common/GlassBadge';
import { BottomTabBar, TabItem } from '../components/common/BottomTabBar';
import { GymOwnerDashboard } from '../components/gym/GymOwnerDashboard';
import { Building2, Dumbbell, Users, Settings, ArrowRight } from 'lucide-react';

interface GymAppProps {
  onBackToLanding?: () => void;
}

export const GymApp: React.FC<GymAppProps> = ({ onBackToLanding }) => {
  const [activeTab, setActiveTab] = useState<string>('home');

  const tabs: TabItem[] = [
    { id: 'home', label: 'سالن باشگاه', icon: <Building2 className="w-5 h-5" /> },
    { id: 'equipment', label: 'تجهیزات', icon: <Dumbbell className="w-5 h-5" /> },
    { id: 'coaches', label: 'مربیان مقیم', icon: <Users className="w-5 h-5" /> },
    { id: 'settings', label: 'اطلاعات سالن', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 text-right">
      <div className="ambient-glow-blue top-0 right-10" />
      <div className="ambient-glow-sky bottom-20 right-1/3" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-3 pb-24">
        {/* Gym Header */}
        <header className="sticky top-2 z-40 mb-5">
          <GlassCard className="p-3.5 px-4 flex items-center justify-between shadow-subtle border-slate-200 bg-white/90 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-sm font-bold text-sm">
                باشگاه
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black text-slate-900">پنل مدیران باشگاه‌ها</span>
                  <GlassBadge variant="orange" size="sm">
                    gym.jibigym.com
                  </GlassBadge>
                </div>
                <p className="text-[10px] text-slate-500">پایش دستگاه‌ها، سانس‌ها و مربیان شاغل در سالن</p>
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

        <main>
          <GymOwnerDashboard />
        </main>

        <BottomTabBar tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id)} />
      </div>
    </div>
  );
};
