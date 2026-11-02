import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  activeIcon?: React.ReactNode;
  badge?: number;
}

interface BottomTabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  tabs,
  activeTab,
  onChange,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-safe pt-1 pointer-events-none md:max-w-md md:mx-auto">
      <nav
        aria-label="ناوبری اصلی"
        className="pointer-events-auto mx-auto mb-2 bg-white/90 backdrop-blur-2xl rounded-3xl p-1.5 flex items-center justify-around shadow-floating-tab border border-slate-200/90"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 cursor-pointer flex-1 ${
                isActive
                  ? 'text-[#0066FF] font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-600 active:scale-95'
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 bg-blue-50/80 rounded-2xl border border-blue-100 -z-10 shadow-inner" />
              )}
              <div className="relative text-xl mb-0.5">
                {isActive && tab.activeIcon ? tab.activeIcon : tab.icon}
                {tab.badge ? (
                  <span className="absolute -top-1 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-0.5 shadow-sm shadow-blue-400" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
