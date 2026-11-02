import React, { useState } from 'react';
import { ModalSheet } from '../common/ModalSheet';
import { GlassInput } from '../common/GlassInput';
import { GlassButton } from '../common/GlassButton';
import { GlassCard } from '../common/GlassCard';
import { KeyRound, UserCheck, CheckCircle2 } from 'lucide-react';

interface CoachLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CoachLinkModal: React.FC<CoachLinkModalProps> = ({ isOpen, onClose }) => {
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCode) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setInviteCode('');
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <ModalSheet isOpen={isOpen} onClose={onClose} title="اتصال به مربی با کد دعوت">
      <div className="space-y-4 text-right">
        {success ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 rounded-3xl bg-blue-50 text-[#0066FF] border border-blue-200 flex items-center justify-center mx-auto shadow-md animate-bounce">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">درخواست اتصال به مربی ارسال شد</h4>
            <p className="text-xs text-slate-600">
              به محض تأیید توسط استاد علی رضایی، برنامه برای شما فعال خواهد شد.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              کد دعوتی که از مربی خود دریافت کرده‌اید را در کادر زیر وارد کنید (مثال: REZAEI-88):
            </p>
            <GlassInput
              label="کد دعوت مربی"
              placeholder="REZAEI-88"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
              icon={<KeyRound className="w-4 h-4 text-slate-400" />}
              dir="ltr"
              required
            />
            <GlassButton
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              icon={<UserCheck className="w-4 h-4" />}
            >
              ارسال درخواست اتصال
            </GlassButton>
          </form>
        )}
      </div>
    </ModalSheet>
  );
};
