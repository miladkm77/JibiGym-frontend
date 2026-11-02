import React, { useState } from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { GlassBadge } from '../components/common/GlassBadge';
import { BottomTabBar, TabItem } from '../components/common/BottomTabBar';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { Shield, Dumbbell, Users, Settings, ArrowRight } from 'lucide-react';

interface AdminAppProps {
  onBackToLanding?: () => void;
}

export const AdminApp: React.FC<AdminAppProps> = ({ onBackToLanding }) => {
  const [activeTab, setActiveTab] = useState<string>('home');

  const tabs: TabItem[] = [
    { id: 'home', label: 'داشبورد ادمین', icon: <Shield className="w-5 h-5" /> },
    { id: 'library', label: 'تأیید حرکات', icon: <Dumbbell className="w-5 h-5" /> },
    { id: 'users', label: 'کاربران', icon: <Users className="w-5 h-5" /> },
    { id: 'settings', label: 'تنظیمات کلان', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 text-right">
      <div className="ambient-glow-blue top-0 right-10" />
      <div className="ambient-glow-sky top-40 left-10" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 pt-3 pb-24">
        {/* Admin Header */}
        <header className="sticky top-2 z-40 mb-5">
          <GlassCard className="p-3.5 px-4 flex items-center justify-between shadow-subtle border-slate-200 bg-white/90 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-sm font-bold text-sm">
                ادمین
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-black text-slate-900">پنل نظارت و مدیریت کلان</span>
                  <GlassBadge variant="purple" size="sm">
                    admin.jibigym.com
                  </GlassBadge>
                </div>
                <p className="text-[10px] text-slate-500">ممیزی کتابخانه حرکات، بررسی گزارش‌های مالی و کاربران</p>
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
          <AdminDashboard />
        </main>

        <BottomTabBar tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id)} />
      </div>
    </div>
  );
};
