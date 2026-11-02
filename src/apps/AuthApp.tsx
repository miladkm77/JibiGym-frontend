import React from 'react';
import { GlassCard } from '../components/common/GlassCard';
import { GlassButton } from '../components/common/GlassButton';
import { LoginFlow } from '../components/auth/LoginFlow';
import { UserRole, SportTypeCode } from '../types';
import { ArrowRight, Dumbbell } from 'lucide-react';

interface AuthAppProps {
  onSuccess: (role: UserRole, sportTypes: SportTypeCode[]) => void;
  onBackToLanding?: () => void;
}

export const AuthApp: React.FC<AuthAppProps> = ({ onSuccess, onBackToLanding }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 text-right flex flex-col justify-center items-center p-4">
      <div className="ambient-glow-blue top-10 right-10" />
      <div className="ambient-glow-sky bottom-10 left-10" />

      <div className="relative z-10 w-full max-w-md space-y-4">
        {onBackToLanding && (
          <div className="flex justify-between items-center mb-2">
            <GlassButton
              variant="ghost"
              size="sm"
              onClick={onBackToLanding}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              بازگشت به صفحه اصلی
            </GlassButton>
            <span className="text-xs font-mono text-[#0066FF] font-bold">auth.jibigym.com</span>
          </div>
        )}

        <LoginFlow onSuccess={onSuccess} />
      </div>
    </div>
  );
};
